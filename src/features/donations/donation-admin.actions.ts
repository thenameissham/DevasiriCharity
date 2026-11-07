"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";

const donationReviewSchema = z.object({
  donationId: z.string().uuid(),
  action: z.enum(["MARK_SUCCESS", "MARK_FAILED"]),
  adminNotes: z
    .string()
    .trim()
    .max(1000, "Admin notes must be 1,000 characters or fewer")
    .optional(),
});

export async function reviewDonationAction(formData: FormData) {
  const session = await requireRole(["ADMIN"]);
  const parsed = donationReviewSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsed.success) {
    redirect("/admin/donations?error=Invalid%20donation%20review%20request");
  }

  const donation = await prisma.donation.findUnique({
    where: { id: parsed.data.donationId },
    include: { campaign: true },
  });

  if (!donation) {
    redirect("/admin/donations?error=Donation%20record%20not%20found");
  }

  if (donation.status !== "PENDING") {
    redirect(`/admin/donations/${donation.id}?error=Donation%20already%20reviewed`);
  }

  const adminNotes = parsed.data.adminNotes || null;

  if (parsed.data.action === "MARK_FAILED") {
    // Conditional transition ensures two concurrent admin submissions cannot
    // both review the same pending donation.
    const reviewed = await prisma.$transaction(async (tx) => {
      const transition = await tx.donation.updateMany({
        where: { id: donation.id, status: "PENDING" },
        data: {
          status: "FAILED",
          paymentStatus: "FAILED",
          adminNotes,
        },
      });

      if (transition.count !== 1) return false;

      const updated = await tx.donation.findUnique({
        where: { id: donation.id },
      });

      if (!updated) {
        throw new Error("Donation disappeared during review transaction");
      }

      await tx.auditLog.create({
        data: {
          actorId: session.user.id,
          action: "STATUS_CHANGED",
          entity: "Donation",
          entityId: updated.id,
          oldValue: {
            status: donation.status,
            paymentStatus: donation.paymentStatus,
            adminNotes: donation.adminNotes,
          },
          newValue: {
            status: updated.status,
            paymentStatus: updated.paymentStatus,
            adminNotes: updated.adminNotes,
          },
        },
      });

      return true;
    });

    if (!reviewed) {
      redirect(`/admin/donations/${donation.id}?error=Donation%20already%20reviewed`);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/donations");
    revalidatePath(`/admin/donations/${donation.id}`);
    redirect(`/admin/donations/${donation.id}`);
  }

  // A pending -> success transition, campaign total increment and audit record
  // are committed together. A second concurrent request cannot double-count it.
  const completedAt = new Date();
  const reviewed = await prisma.$transaction(async (tx) => {
    const transition = await tx.donation.updateMany({
      where: { id: donation.id, status: "PENDING" },
      data: {
        status: "SUCCESS",
        paymentStatus: "SUCCESS",
        paidAt: completedAt,
        donatedAt: completedAt,
        adminNotes,
      },
    });

    if (transition.count !== 1) return false;

    const updated = await tx.donation.findUnique({
      where: { id: donation.id },
    });

    if (!updated) throw new Error("Donation disappeared during review transaction");

    await tx.campaign.update({
      where: { id: donation.campaignId },
      data: {
        raisedAmountPaise: { increment: donation.amountPaise },
      },
    });

    await tx.auditLog.create({
      data: {
        actorId: session.user.id,
        action: "STATUS_CHANGED",
        entity: "Donation",
        entityId: updated.id,
        oldValue: {
          status: donation.status,
          paymentStatus: donation.paymentStatus,
          adminNotes: donation.adminNotes,
        },
        newValue: {
          status: updated.status,
          paymentStatus: updated.paymentStatus,
          paidAt: updated.paidAt?.toISOString() ?? null,
          donatedAt: updated.donatedAt?.toISOString() ?? null,
          amountPaise: updated.amountPaise,
          receiptNumber: updated.receiptNumber,
          adminNotes: updated.adminNotes,
        },
      },
    });

    return true;
  });

  if (!reviewed) {
    redirect(`/admin/donations/${donation.id}?error=Donation%20already%20reviewed`);
  }

  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath(`/campaigns/${donation.campaign.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/donations");
  revalidatePath(`/admin/donations/${donation.id}`);

  if (donation.receiptNumber) {
    revalidatePath(`/receipts/${donation.receiptNumber}`);
  }

  redirect(`/admin/donations/${donation.id}`);
}
