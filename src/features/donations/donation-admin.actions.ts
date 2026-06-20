"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";

const donationReviewSchema = z.object({
  donationId: z.string().uuid(),
  action: z.enum(["MARK_SUCCESS", "MARK_FAILED"]),
  adminNotes: z.string().optional()
});

function sanitizeNote(value: string | undefined): string | undefined {
  const clean = (value ?? "").replace(/[\u0000-\u001F\u007F]/g, "").trim();
  return clean.length > 0 ? clean : undefined;
}

export async function reviewDonationAction(formData: FormData) {
  const session = await requireRole(["ADMIN"]);

  const parsed = donationReviewSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    redirect("/admin/donations?error=Invalid%20donation%20review%20request");
  }

  const donation = await prisma.donation.findUnique({
    where: {
      id: parsed.data.donationId
    },
    include: {
      campaign: true
    }
  });

  if (!donation) {
    redirect("/admin/donations?error=Donation%20record%20not%20found");
  }

  if (donation.status === "SUCCESS") {
    redirect(`/admin/donations/${donation.id}?error=Donation%20already%20verified`);
  }

  const adminNotes = sanitizeNote(parsed.data.adminNotes);

  if (parsed.data.action === "MARK_FAILED") {
    await prisma.$transaction(async (tx) => {
      const updated = await tx.donation.update({
        where: {
          id: donation.id
        },
        data: {
          status: "FAILED",
          paymentStatus: "FAILED",
          adminNotes
        }
      });

      await tx.auditLog.create({
        data: {
          actorId: session.user.id,
          action: "STATUS_CHANGED",
          entity: "Donation",
          entityId: updated.id,
          oldValue: {
            status: donation.status,
            paymentStatus: donation.paymentStatus
          },
          newValue: {
            status: updated.status,
            paymentStatus: updated.paymentStatus,
            adminNotes
          }
        }
      });
    });

    revalidatePath("/admin");
    revalidatePath("/admin/donations");
    revalidatePath(`/admin/donations/${donation.id}`);
    redirect(`/admin/donations/${donation.id}`);
  }

  await prisma.$transaction(async (tx) => {
    const updated = await tx.donation.update({
      where: {
        id: donation.id
      },
      data: {
        status: "SUCCESS",
        paymentStatus: "SUCCESS",
        paidAt: new Date(),
        adminNotes
      }
    });

    await tx.campaign.update({
      where: {
        id: donation.campaignId
      },
      data: {
        raisedAmountPaise: {
          increment: donation.amountPaise
        }
      }
    });

    await tx.auditLog.create({
      data: {
        actorId: session.user.id,
        action: "STATUS_CHANGED",
        entity: "Donation",
        entityId: updated.id,
        oldValue: {
          status: donation.status,
          paymentStatus: donation.paymentStatus
        },
        newValue: {
          status: updated.status,
          paymentStatus: updated.paymentStatus,
          amountPaise: updated.amountPaise,
          receiptNumber: updated.receiptNumber
        }
      }
    });
  });

  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath(`/campaigns/${donation.campaign.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/donations");
  revalidatePath(`/admin/donations/${donation.id}`);
  revalidatePath(`/receipts/${donation.receiptNumber}`);

  redirect(`/admin/donations/${donation.id}`);
}