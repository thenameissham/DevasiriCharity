import { prisma } from "@/lib/prisma";

export interface PublicCampaign {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly story: string | null;
  readonly category: string;
  readonly status: string;
  readonly goalAmountPaise: number;
  readonly raisedAmountPaise: number;
  readonly coverImageUrl: string | null;
  readonly videoUrl: string | null;
  readonly startDate: Date | null;
  readonly endDate: Date | null;
  readonly isFeatured: boolean;
  readonly createdAt: Date;
  readonly donationCount: number;
}

export function formatINRFromPaise(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value / 100);
}

export function getCampaignProgress(raised: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}

export async function getPublicCampaigns(): Promise<PublicCampaign[]> {
  const campaigns = await prisma.campaign.findMany({
    where: {
      status: {
        in: ["ACTIVE", "COMPLETED"]
      }
    },
    orderBy: [
      {
        isFeatured: "desc"
      },
      {
        createdAt: "desc"
      }
    ],
    include: {
      _count: {
        select: {
          donations: true
        }
      }
    }
  });

  return campaigns.map((campaign) => ({
    id: campaign.id,
    title: campaign.title,
    slug: campaign.slug,
    description: campaign.description,
    story: campaign.story,
    category: campaign.category,
    status: campaign.status,
    goalAmountPaise: campaign.goalAmountPaise,
    raisedAmountPaise: campaign.raisedAmountPaise,
    coverImageUrl: campaign.coverImageUrl,
    videoUrl: campaign.videoUrl,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
    isFeatured: campaign.isFeatured,
    createdAt: campaign.createdAt,
    donationCount: campaign._count.donations
  }));
}

export async function getFeaturedCampaigns(limit = 3): Promise<PublicCampaign[]> {
  const campaigns = await prisma.campaign.findMany({
    where: {
      status: "ACTIVE",
      isFeatured: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: limit,
    include: {
      _count: {
        select: {
          donations: true
        }
      }
    }
  });

  return campaigns.map((campaign) => ({
    id: campaign.id,
    title: campaign.title,
    slug: campaign.slug,
    description: campaign.description,
    story: campaign.story,
    category: campaign.category,
    status: campaign.status,
    goalAmountPaise: campaign.goalAmountPaise,
    raisedAmountPaise: campaign.raisedAmountPaise,
    coverImageUrl: campaign.coverImageUrl,
    videoUrl: campaign.videoUrl,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
    isFeatured: campaign.isFeatured,
    createdAt: campaign.createdAt,
    donationCount: campaign._count.donations
  }));
}

export async function getPublicCampaignBySlug(
  slug: string
): Promise<PublicCampaign | null> {
  const campaign = await prisma.campaign.findFirst({
    where: {
      slug,
      status: {
        in: ["ACTIVE", "COMPLETED"]
      }
    },
    include: {
      _count: {
        select: {
          donations: true
        }
      }
    }
  });

  if (!campaign) return null;

  return {
    id: campaign.id,
    title: campaign.title,
    slug: campaign.slug,
    description: campaign.description,
    story: campaign.story,
    category: campaign.category,
    status: campaign.status,
    goalAmountPaise: campaign.goalAmountPaise,
    raisedAmountPaise: campaign.raisedAmountPaise,
    coverImageUrl: campaign.coverImageUrl,
    videoUrl: campaign.videoUrl,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
    isFeatured: campaign.isFeatured,
    createdAt: campaign.createdAt,
    donationCount: campaign._count.donations
  };
}