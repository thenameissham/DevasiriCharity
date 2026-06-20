import { prisma } from "@/lib/prisma";

export interface PlatformImpactSummary {
  readonly totalRaisedPaise: number;
  readonly successfulDonationCount: number;
  readonly activeCampaignCount: number;
  readonly studentRecordCount: number;
  readonly volunteerRecordCount: number;
}

export function formatINRCompactFromPaise(value: number): string {
  const rupees = value / 100;

  if (rupees >= 10000000) {
    return `₹${(rupees / 10000000).toFixed(1)}Cr`;
  }

  if (rupees >= 100000) {
    return `₹${(rupees / 100000).toFixed(1)}L`;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(rupees);
}

export async function getPlatformImpactSummary(): Promise<PlatformImpactSummary> {
  const [
    donationAggregate,
    successfulDonationCount,
    activeCampaignCount,
    studentRecordCount,
    volunteerRecordCount
  ] = await Promise.all([
    prisma.donation.aggregate({
      where: {
        status: "SUCCESS"
      },
      _sum: {
        amountPaise: true
      }
    }),
    prisma.donation.count({
      where: {
        status: "SUCCESS"
      }
    }),
    prisma.campaign.count({
      where: {
        status: "ACTIVE"
      }
    }),
    prisma.student.count(),
    prisma.volunteer.count()
  ]);

  return {
    totalRaisedPaise: donationAggregate._sum.amountPaise ?? 0,
    successfulDonationCount,
    activeCampaignCount,
    studentRecordCount,
    volunteerRecordCount
  };
}