"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { parseCampaignFormData } from "@/features/campaigns/campaign.schemas";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

function toPaise(amountRupees: number): number {
  return Math.round(amountRupees * 100);
}

async function createUniqueCampaignSlug(title: string, existingId?: string) {
  const baseSlug = slugify(title) || `campaign-${Date.now()}`;
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.campaign.findUnique({
      where: { slug },
      select: { id: true }
    });

    if (!existing || existing.id === existingId) {
      return slug;
    }

    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }
}

function getRequestFailureRedirect(message: string, fallback: string): never {
  const encoded = encodeURIComponent(message);
  redirect(`${fallback}?error=${encoded}`);
}

export async function createCampaignAction(formData: FormData) {
  const session = await requireRole(["ADMIN"]);

  try {
    const data = parseCampaignFormData(formData);
    const slug = await createUniqueCampaignSlug(data.title);

    const campaign = await prisma.campaign.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        story: data.story,
        category: data.category,
        status: data.status,
        goalAmountPaise: toPaise(data.goalAmountRupees),
        raisedAmountPaise: toPaise(data.raisedAmountRupees),
        coverImageUrl: data.coverImageUrl,
        videoUrl: data.videoUrl,
        startDate: data.startDate,
        endDate: data.endDate,
        isFeatured: data.isFeatured,
        createdById: session.user.id
      }
    });

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        action: "CREATE",
        entity: "Campaign",
        entityId: campaign.id,
        newValue: {
          title: campaign.title,
          status: campaign.status,
          category: campaign.category
        }
      }
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/campaigns");
  } catch (error) {
    if (error instanceof z.ZodError) {
      getRequestFailureRedirect(
        error.issues[0]?.message ?? "Invalid campaign data.",
        "/admin/campaigns/new"
      );
    }

    getRequestFailureRedirect(
      "Campaign could not be created. Please verify the fields.",
      "/admin/campaigns/new"
    );
  }

  redirect("/admin/campaigns");
}

export async function updateCampaignAction(formData: FormData) {
  const session = await requireRole(["ADMIN"]);

  try {
    const data = parseCampaignFormData(formData);

    if (!data.id) {
      getRequestFailureRedirect(
        "Campaign id is missing.",
        "/admin/campaigns"
      );
    }

    const existing = await prisma.campaign.findUnique({
      where: { id: data.id }
    });

    if (!existing) {
      getRequestFailureRedirect(
        "Campaign was not found.",
        "/admin/campaigns"
      );
    }

    const slug =
      existing.title === data.title
        ? existing.slug
        : await createUniqueCampaignSlug(data.title, data.id);

    const campaign = await prisma.campaign.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug,
        description: data.description,
        story: data.story,
        category: data.category,
        status: data.status,
        goalAmountPaise: toPaise(data.goalAmountRupees),
        raisedAmountPaise: toPaise(data.raisedAmountRupees),
        coverImageUrl: data.coverImageUrl,
        videoUrl: data.videoUrl,
        startDate: data.startDate,
        endDate: data.endDate,
        isFeatured: data.isFeatured
      }
    });

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        action: "UPDATE",
        entity: "Campaign",
        entityId: campaign.id,
        oldValue: {
          title: existing.title,
          status: existing.status,
          category: existing.category
        },
        newValue: {
          title: campaign.title,
          status: campaign.status,
          category: campaign.category
        }
      }
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/campaigns");
    revalidatePath(`/admin/campaigns/${campaign.id}/edit`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      getRequestFailureRedirect(
        error.issues[0]?.message ?? "Invalid campaign data.",
        "/admin/campaigns"
      );
    }

    getRequestFailureRedirect(
      "Campaign could not be updated.",
      "/admin/campaigns"
    );
  }

  redirect("/admin/campaigns");
}

export async function archiveOrDeleteCampaignAction(formData: FormData) {
  const session = await requireRole(["ADMIN"]);

  const campaignId = String(formData.get("campaignId") ?? "");

  if (!campaignId) {
    redirect("/admin/campaigns?error=Campaign%20id%20is%20missing");
  }

  const donationCount = await prisma.donation.count({
    where: { campaignId }
  });

  if (donationCount > 0) {
    const campaign = await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        status: "ARCHIVED"
      }
    });

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        action: "STATUS_CHANGED",
        entity: "Campaign",
        entityId: campaign.id,
        newValue: {
          status: "ARCHIVED",
          reason: "Campaign has donations and was archived instead of deleted."
        }
      }
    });
  } else {
    await prisma.campaign.delete({
      where: { id: campaignId }
    });

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        action: "DELETE",
        entity: "Campaign",
        entityId: campaignId
      }
    });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/campaigns");
  redirect("/admin/campaigns");
}