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
  /** Number of donation records whose business status is SUCCESS. */
  readonly donationCount: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly startDate: Date | null;
  readonly endDate: Date | null;
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
  startDate: Date | null;
  endDate: Date | null;
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
    startDate: campaign.startDate,
    endDate: campaign.endDate,
  };
}

export { formatINRFromPaise, getCampaignProgress } from "@/lib/campaign-display";

/** Public counts include successful donation records only. */
const successfulDonationCount = {
  select: {
    donations: {
      where: {
        status: "SUCCESS" as const,
      },
    },
  },
};

export async function getPublicCampaigns(): Promise<PublicCampaign[]> {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: { status: "ACTIVE" },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      include: { _count: successfulDonationCount },
    });

    return campaigns.map(toPublicCampaign);
  } catch (error) {
    console.error("Failed to load public campaigns", error);
    return [];
  }
}

export async function getFeaturedCampaigns(
  limit = 3,
): Promise<PublicCampaign[]> {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: { status: "ACTIVE", isFeatured: true },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { _count: successfulDonationCount },
    });

    return campaigns.map(toPublicCampaign);
  } catch (error) {
    console.error("Failed to load featured campaigns", error);
    return [];
  }
}

export async function getPublicCampaignBySlug(
  slug: string,
): Promise<PublicCampaign | null> {
  try {
    const campaign = await prisma.campaign.findFirst({
      where: { slug, status: "ACTIVE" },
      include: { _count: successfulDonationCount },
    });

    return campaign ? toPublicCampaign(campaign) : null;
  } catch (error) {
    console.error("Failed to load public campaign by slug", error);
    return null;
  }
}
