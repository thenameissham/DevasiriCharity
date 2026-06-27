import type { Metadata } from "next";
import { CampaignDiscoveryClient } from "@/components/campaigns/campaign-discovery-client";
import { Navbar } from "@/components/layouts/navbar";
import { getPublicCampaigns } from "@/features/campaigns/campaign.queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Campaigns",
  description:
    "Explore Devasiri education support campaigns for verified students."
};

export default async function CampaignsPage() {
  const campaigns = await getPublicCampaigns();

  const safeCampaigns = campaigns.map((campaign) => ({
    ...campaign,
    createdAt: campaign.createdAt.toISOString(),
    updatedAt: campaign.updatedAt.toISOString()
  }));

  return (
    <>
      <Navbar />
      <CampaignDiscoveryClient campaigns={safeCampaigns} />
    </>
  );
}
