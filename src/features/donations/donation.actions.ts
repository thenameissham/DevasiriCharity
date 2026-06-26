"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { parseDonationIntentFormData } from "@/features/donations/donation.schemas";
import { prisma } from "@/lib/prisma";

function toPaise(amountRupees: number): number {
  return Math.round(amountRupees * 100);
}

async function createDonationReference(): Promise<string> {
  const year = new Date().getFullYear();

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const random = Math.random().toString(36).slice(2, 8).toUpperCase();
    const reference = `DSD-${year}-${random}`;

    const existing = await prisma.donation.findFirst({
      where: {
        receiptNumber: reference
      },
      select: {
        id: true
      }
    });

    if (!existing) return reference;
  }

  return `DSD-${year}-${Date.now()}`;
}

function redirectWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function createDonationIntentAction(formData: FormData) {
  const campaignSlug = String(formData.get("campaignSlug") ?? "");

  try {
    const data = parseDonationIntentFormData(formData);

    const campaign = await prisma.campaign.findUnique({
      where: {
        id: data.campaignId
      },
      select: {
        id: true,
        slug: true,
        status: true
      }
    });

    if (!campaign || campaign.status !== "ACTIVE") {
      redirectWithError(
        campaignSlug ? `/campaigns/${campaignSlug}/donate` : "/campaigns",
        "This campaign is not currently accepting donations."
      );
    }

    const reference = await createDonationReference();

    const donation = await prisma.donation.create({
      data: {
        campaignId: data.campaignId,
        donorName: data.isAnonymous ? "Anonymous Donor" : data.donorName,
        donorEmail: data.donorEmail,
        donorPhone: data.donorPhone,
        amountPaise: toPaise(data.amountRupees),
        currency: "INR",
        status: "PENDING",
        paymentStatus: "PENDING",
        paymentProvider: "MANUAL",
        receiptNumber: reference,
        message: data.message,
        isAnonymous: data.isAnonymous
      }
    });

    redirect(`/donation/success?ref=${donation.receiptNumber}`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      redirectWithError(
        campaignSlug ? `/campaigns/${campaignSlug}/donate` : "/campaigns",
        error.issues[0]?.message ?? "Please check donation details."
      );
    }

    redirectWithError(
      campaignSlug ? `/campaigns/${campaignSlug}/donate` : "/campaigns",
      "Donation could not be started. Please try again."
    );
  }
} 