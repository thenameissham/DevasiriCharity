import { prisma } from "@/lib/prisma";

export interface PublicCampaign {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly story: string | null;
  readonly category: string;
  readonly status: string;
  readonly goalAmountPaise: number;
  readonly raisedAmountPaise: number;
  readonly coverImageUrl: string | null;
  readonly isFeatured: boolean;
  readonly donationCount: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly startDate: Date;
  readonly endDate: Date;
}

type CampaignWithCount = {
  id: string;
  slug: string;
  title: string;
  description: string;
  story: string | null;
  category: string;
  status: string;
  goalAmountPaise: number;
  raisedAmountPaise: number;
  coverImageUrl: string | null;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    donations: number;
  };
};

function toPublicCampaign(campaign: CampaignWithCount): PublicCampaign {
  return {
    id: campaign.id,
    slug: campaign.slug,
    title: campaign.title,
    description: campaign.description,
    story: campaign.story,
    category: campaign.category,
    status: campaign.status,
    goalAmountPaise: campaign.goalAmountPaise,
    raisedAmountPaise: campaign.raisedAmountPaise,
    coverImageUrl: campaign.coverImageUrl,
    isFeatured: campaign.isFeatured,
    donationCount: campaign._count.donations,
    createdAt: campaign.createdAt,
    updatedAt: campaign.updatedAt,
    startDate: campaign.createdAt,
    endDate: campaign.updatedAt
  };
}

export function formatINRFromPaise(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value / 100);
}

export function getCampaignProgress(
  raisedAmountPaise: number,
  goalAmountPaise: number
): number {
  if (goalAmountPaise <= 0) return 0;

  return Math.min(
    100,
    Math.round((raisedAmountPaise / goalAmountPaise) * 100)
  );
}

export async function getPublicCampaigns(): Promise<PublicCampaign[]> {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        status: "ACTIVE"
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

    return campaigns.map(toPublicCampaign);
  } catch (error) {
    console.error("Failed to load public campaigns", error);
    return [];
  }
}

export async function getFeaturedCampaigns(
  limit = 3
): Promise<PublicCampaign[]> {
  try {
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

    return campaigns.map(toPublicCampaign);
  } catch (error) {
    console.error("Failed to load featured campaigns", error);
    return [];
  }
}

export async function getPublicCampaignBySlug(
  slug: string
): Promise<PublicCampaign | null> {
  try {
    const campaign = await prisma.campaign.findFirst({
      where: {
        slug,
        status: "ACTIVE"
      },
      include: {
        _count: {
          select: {
            donations: true
          }
        }
      }
    });

    return campaign ? toPublicCampaign(campaign) : null;
  } catch (error) {
    console.error("Failed to load public campaign by slug", error);
    return null;
  }
}
