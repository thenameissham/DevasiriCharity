import { ArrowRight, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/landing/section-heading";
import { MotionSection } from "@/components/motion/motion-section";
import { PublicCampaignCard } from "@/components/campaigns/public-campaign-card";
import { Button } from "@/components/ui/button";
import type { PublicCampaign } from "@/features/campaigns/campaign.queries";

interface FeaturedCampaignsProps {
  readonly campaigns: readonly PublicCampaign[];
}

export function FeaturedCampaigns({ campaigns }: FeaturedCampaignsProps) {
  return (
    <section
      id="campaigns"
      className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -left-64 top-10 h-[560px] w-[560px] rounded-full bg-emerald-200/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-64 bottom-0 h-[520px] w-[520px] rounded-full bg-amber-200/25 blur-[120px]"
      />

      <MotionSection className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Verified campaigns"
            title="Support a real education need with the context to understand it."
            description="Featured campaigns are selected through the Devasiri administration workflow and loaded directly from the platform database."
          />

          <Button
            href="/campaigns"
            variant="secondary"
            size="lg"
            className="w-fit shrink-0 rounded-full border-white/80 bg-white/75 px-6"
          >
            View all campaigns
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {campaigns.length > 0 ? (
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {campaigns.map((campaign) => (
              <PublicCampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="mt-12 overflow-hidden rounded-[34px] border border-[var(--theme-border)] bg-white/72 p-8 shadow-[0_24px_80px_rgba(8,26,28,0.08)] backdrop-blur-2xl sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[var(--theme-soft)] text-[var(--theme-primary)]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-headline mt-6 text-3xl font-extrabold tracking-[-0.05em] text-[var(--theme-ink)]">
              Verified campaigns will appear here.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#607071]">
              There are no featured active campaigns at the moment. Once a
              campaign is verified, activated, and marked as featured by the
              administration team, it will be published here automatically.
            </p>
          </div>
        )}
      </MotionSection>
    </section>
  );
}
