"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { parseDonationIntentFormData, type DonationIntentInput } from "@/features/donations/donation.schemas";
import { prisma } from "@/lib/prisma";
import { createDonationReference } from "@/lib/donation-reference";

function toPaise(amountRupees: number): number {
  return Math.round(amountRupees * 100);
}

async function createUniqueDonationReference(): Promise<string> {
  // A 128-bit token makes collisions exceptionally unlikely. The database
  // uniqueness check is retained as a defensive guard before insert.
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const reference = createDonationReference();
    const existing = await prisma.donation.findUnique({
      where: { receiptNumber: reference },
      select: { id: true },
    });

    if (!existing) return reference;
  }

  throw new Error("Could not allocate a unique donation reference");
}

function redirectWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function createDonationIntentAction(formData: FormData) {
  const campaignSlug = String(formData.get("campaignSlug") ?? "");
  const fallbackPath = campaignSlug
    ? `/campaigns/${encodeURIComponent(campaignSlug)}/donate`
    : "/campaigns";

  let data: DonationIntentInput;

  // Keep redirect() calls outside the try blocks they might otherwise be
  // caught by. Next.js redirects are implemented as thrown control signals.
  try {
    data = parseDonationIntentFormData(formData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      redirectWithError(
        fallbackPath,
        error.issues[0]?.message ?? "Please check donation details.",
      );
    }

    redirectWithError(fallbackPath, "Please check the donation details and try again.");
  }

  let campaign: { id: string; status: string } | null;

  try {
    campaign = await prisma.campaign.findUnique({
      where: { id: data.campaignId },
      select: { id: true, status: true },
    });
  } catch {
    redirectWithError(fallbackPath, "Campaign details could not be checked. Please try again.");
  }

  if (!campaign || campaign.status !== "ACTIVE") {
    redirectWithError(
      fallbackPath,
      "This campaign is not currently accepting donations.",
    );
  }

  let receiptNumber: string;

  try {
    const reference = await createUniqueDonationReference();
    const donation = await prisma.donation.create({
      data: {
        campaignId: data.campaignId,
        donorName: data.donorName,
        donorEmail: data.donorEmail,
        donorPhone: data.donorPhone,
        amountPaise: toPaise(data.amountRupees),
        currency: "INR",
        status: "PENDING",
        paymentStatus: "PENDING",
        receiptNumber: reference,
        message: data.message ?? null,
        isAnonymous: data.isAnonymous,
      },
      select: { receiptNumber: true },
    });

    if (!donation.receiptNumber) {
      throw new Error("Donation reference was not persisted");
    }

    receiptNumber = donation.receiptNumber;
  } catch {
    redirectWithError(
      fallbackPath,
      "Donation intent could not be recorded. No payment has been taken. Please try again.",
    );
  }

  redirect(`/donation/success?ref=${encodeURIComponent(receiptNumber)}`);
}
