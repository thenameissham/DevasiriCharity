"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  applicationStatusUpdateSchema,
  parseStudentApplicationFormData
} from "@/features/student-applications/student-application.schemas";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";

function toPaise(value: number | undefined): number | undefined {
  if (value === undefined || Number.isNaN(value)) return undefined;
  return Math.round(value * 100);
}

async function createApplicationReference(): Promise<string> {
  const year = new Date().getFullYear();

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const random = Math.random().toString(36).slice(2, 8).toUpperCase();
    const reference = `DSA-${year}-${random}`;

    const existing = await prisma.studentApplication.findUnique({
      where: {
        applicationReference: reference
      },
      select: {
        id: true
      }
    });

    if (!existing) return reference;
  }

  return `DSA-${year}-${Date.now()}`;
}

function redirectWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function submitStudentApplicationAction(formData: FormData) {
  try {
    const data = parseStudentApplicationFormData(formData);
    const applicationReference = await createApplicationReference();

    const application = await prisma.studentApplication.create({
      data: {
        applicationReference,

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
      }
    });

    redirect(`/apply/success?ref=${application.applicationReference}`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      redirectWithError(
        "/apply/start",
        error.issues[0]?.message ?? "Please check the application details."
      );
    }

    redirectWithError(
      "/apply/start",
      "Application could not be submitted. Please try again."
    );
  }
}

export async function updateStudentApplicationStatusAction(formData: FormData) {
  const session = await requireRole(["ADMIN"]);

  const parsed = applicationStatusUpdateSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    redirect("/admin/applications?error=Invalid%20application%20status");
  }

  const existing = await prisma.studentApplication.findUnique({
    where: {
      id: parsed.data.applicationId
    }
  });

  if (!existing) {
    redirect("/admin/applications?error=Application%20not%20found");
  }

  const updated = await prisma.studentApplication.update({
    where: {
      id: parsed.data.applicationId
    },
    data: {
      status: parsed.data.status,
      adminNotes: parsed.data.adminNotes,
      reviewedAt: new Date()
    }
  });

  await prisma.auditLog.create({
    data: {
      actorId: session.user.id,
      action: "STATUS_CHANGED",
      entity: "StudentApplication",
      entityId: updated.id,
      oldValue: {
        status: existing.status
      },
      newValue: {
        status: updated.status,
        adminNotes: updated.adminNotes
      }
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${updated.id}`);

  redirect(`/admin/applications/${updated.id}`);
}