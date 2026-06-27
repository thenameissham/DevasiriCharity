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

  if (donation.status !== "PENDING") {
    redirect(`/admin/donations/${donation.id}?error=Donation%20already%20reviewed`);
  }

  if (parsed.data.action === "MARK_FAILED") {
    await prisma.$transaction(async (tx) => {
      const updated = await tx.donation.update({
        where: {
          id: donation.id
        },
        data: {
          status: "FAILED"
        }
      });

      await tx.auditLog.create({
        data: {
          actorId: session.user.id,
          action: "STATUS_CHANGED",
          entity: "Donation",
          entityId: updated.id,
          oldValue: {
            status: donation.status
          },
          newValue: {
            status: updated.status,
            adminNotes: parsed.data.adminNotes ?? null
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
        status: "SUCCESS"
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
          status: donation.status
        },
        newValue: {
          status: updated.status,
          amountPaise: updated.amountPaise,
          receiptNumber: updated.receiptNumber,
          adminNotes: parsed.data.adminNotes ?? null
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

  if (donation.receiptNumber) {
    revalidatePath(`/receipts/${donation.receiptNumber}`);
  }

  redirect(`/admin/donations/${donation.id}`);
}
