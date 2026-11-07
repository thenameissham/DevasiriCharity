"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  applicationStatusUpdateSchema,
  parseStudentApplicationFormData,
  type StudentApplicationFormInput
} from "@/features/student-applications/student-application.schemas";
import { requireRole } from "@/lib/auth/require-role";
import { createStudentApplicationReference } from "@/lib/application-reference";
import { prisma } from "@/lib/prisma";

function toPaise(value: number | undefined): number | undefined {
  if (value === undefined || Number.isNaN(value)) return undefined;
  return Math.round(value * 100);
}

function redirectWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

function isUniqueConstraintViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

export async function submitStudentApplicationAction(formData: FormData) {
  let data: StudentApplicationFormInput;

  try {
    data = parseStudentApplicationFormData(formData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      redirectWithError(
        "/apply/start",
        error.issues[0]?.message ?? "Please check the application details."
      );
    }

    redirectWithError(
      "/apply/start",
      "Please check the application details and try again."
    );
  }

  const applicationFields = {
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,

    district: data.district,
    taluk: data.taluk,
    address: data.address,

    courseType: data.courseType,
    courseName: data.courseName,
    collegeName: data.collegeName,
    university: data.university,
    currentYear: data.currentYear,
    currentSemester: data.currentSemester,
    admissionNumber: data.admissionNumber,
    usn: data.usn,

    entranceExam: data.entranceExam,
    entranceRank: data.entranceRank,
    previousPercentage: data.previousPercentage,

    annualFeePaise: toPaise(data.annualFeeRupees) ?? 0,
    paidAmountPaise: toPaise(data.paidAmountRupees) ?? 0,
    requestedAmountPaise: toPaise(data.requestedAmountRupees) ?? 0,

    familyIncomePaise: toPaise(data.familyIncomeRupees),
    incomeCertificateNo: data.incomeCertificateNo,

    receivesSsp: data.receivesSsp,
    receivesVidyasiri: data.receivesVidyasiri,
    receivesOtherSupport: data.receivesOtherSupport,
    otherSupportDetails: data.otherSupportDetails,

    aadhaarLast4: data.aadhaarLast4,

    admissionProofUrl: data.admissionProofUrl,
    feeStructureUrl: data.feeStructureUrl,
    incomeCertificateUrl: data.incomeCertificateUrl,
    marksCardUrl: data.marksCardUrl,

    needStatement: data.needStatement,
    consentAccepted: data.consentAccepted
  };

  let applicationReference: string | undefined;

  try {
    // Retry only unique-key conflicts. Other database errors fail immediately.
    // The random reference has 96 bits of entropy; the retry protects the
    // database uniqueness constraint rather than relying on a preflight check.
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const candidate = createStudentApplicationReference();

      try {
        const created = await prisma.studentApplication.create({
          data: {
            ...applicationFields,
            applicationReference: candidate
          },
          select: { applicationReference: true }
        });

        applicationReference = created.applicationReference;
        break;
      } catch (error) {
        if (isUniqueConstraintViolation(error) && attempt < 2) continue;
        throw error;
      }
    }
  } catch {
    redirectWithError(
      "/apply/start",
      "Application could not be submitted. Please try again."
    );
  }

  if (!applicationReference) {
    redirectWithError(
      "/apply/start",
      "Application could not be submitted. Please try again."
    );
  }

  redirect(`/apply/success?ref=${encodeURIComponent(applicationReference)}`);
}

export async function updateStudentApplicationStatusAction(formData: FormData) {
  const session = await requireRole(["ADMIN"]);
  const parsed = applicationStatusUpdateSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    redirect("/admin/applications?error=Invalid%20application%20status");
  }

  let result:
    | { kind: "updated"; id: string }
    | { kind: "not-found" }
    | { kind: "stale" };

  try {
    result = await prisma.$transaction(async (tx) => {
      const existing = await tx.studentApplication.findUnique({
        where: { id: parsed.data.applicationId },
        select: { id: true, status: true, adminNotes: true }
      });

      if (!existing) return { kind: "not-found" as const };
      if (existing.status !== parsed.data.currentStatus) {
        return { kind: "stale" as const };
      }

      const updateResult = await tx.studentApplication.updateMany({
        where: {
          id: parsed.data.applicationId,
          status: parsed.data.currentStatus
        },
        data: {
          status: parsed.data.status,
          adminNotes: parsed.data.adminNotes ?? null,
          reviewedAt: new Date()
        }
      });

      if (updateResult.count !== 1) return { kind: "stale" as const };

      const updated = await tx.studentApplication.findUnique({
        where: { id: parsed.data.applicationId },
        select: { id: true, status: true, adminNotes: true }
      });

      if (!updated) throw new Error("Updated application could not be read.");

      await tx.auditLog.create({
        data: {
          actorId: session.user.id,
          action: "STATUS_CHANGED",
          entity: "StudentApplication",
          entityId: updated.id,
          oldValue: {
            status: existing.status,
            adminNotes: existing.adminNotes
          },
          newValue: {
            status: updated.status,
            adminNotes: updated.adminNotes
          }
        }
      });

      return { kind: "updated" as const, id: updated.id };
    });
  } catch {
    redirect("/admin/applications?error=Review%20could%20not%20be%20saved.%20Please%20try%20again.");
  }

  if (result.kind === "not-found") {
    redirect("/admin/applications?error=Application%20not%20found");
  }

  if (result.kind === "stale") {
    redirect(
      `/admin/applications/${encodeURIComponent(parsed.data.applicationId)}?error=${encodeURIComponent("This application changed after you opened it. Refresh and review the latest status.")}`
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${result.id}`);

  redirect(`/admin/applications/${result.id}`);
}
