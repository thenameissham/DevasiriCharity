import type { Metadata } from "next";
import { HeartHandshake, SearchX } from "lucide-react";
import { PublicCampaignCard } from "@/components/campaigns/public-campaign-card";
import { Button } from "@/components/ui/button";
import { getPublicCampaigns } from "@/features/campaigns/campaign.queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Campaigns",
  description:
    "Explore verified Devasiri campaigns for education assistance, hostel support, sponsorships, and student welfare."
};

export default async function CampaignsPage() {
  const campaigns = await getPublicCampaigns();

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden px-6 py-20 sm:px-8 lg:px-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(37,99,235,0.16),transparent_30%),radial-gradient(circle_at_92%_10%,rgba(6,182,212,0.14),transparent_28%)]"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Public Campaigns
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-[-0.07em] text-slate-950 sm:text-6xl">
              Support verified student impact campaigns.
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Every campaign is structured for transparency, progress tracking,
              and accountable education-focused support.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/login?callbackUrl=/donor" size="lg">
                Donate securely
                <HeartHandshake className="h-5 w-5" />
              </Button>

              <Button href="/" variant="secondary" size="lg">
                Back to home
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {campaigns.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {campaigns.map((campaign) => (
                <PublicCampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-[32px] p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[22px] bg-blue-50 text-blue-600">
                <SearchX className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-[-0.055em] text-slate-950">
                No public campaigns yet
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                Active campaigns created from the admin dashboard will appear
                here automatically.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}