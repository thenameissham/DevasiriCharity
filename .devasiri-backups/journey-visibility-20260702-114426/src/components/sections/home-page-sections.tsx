import { DonationWidget } from "@/components/blocks/donation-widget";
import { Navbar } from "@/components/layouts/navbar";
import { ImpactStoryGrid } from "@/components/blocks/impact-story-grid";
import { LiveTicker } from "@/components/blocks/live-ticker";
import { PlatformReliability } from "@/components/blocks/platform-reliability";
import { PremiumCTA } from "@/components/blocks/premium-cta";
import { PremiumActionDock } from "@/components/blocks/premium-action-dock";
import { ScholarshipEntry } from "@/components/blocks/scholarship-entry";
import { FloatingIllustration } from "@/components/ui/floating-illustration";
import { SponsorSection } from "@/components/blocks/sponsor-section";
import { SuccessMetrics } from "@/components/blocks/success-metrics";
import { Testimonials } from "@/components/blocks/testimonials";
import { TransparencyDashboard } from "@/components/blocks/transparency-dashboard";
import { TrustPillars } from "@/components/blocks/trust-pillars";
import { VideoHero } from "@/components/blocks/video-hero";
import { HomeExperienceShowcase } from "@/components/blocks/home-experience-showcase";
import { PublicCampaignCard } from "@/components/campaigns/public-campaign-card";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";
import { getFeaturedCampaigns } from "@/features/campaigns/campaign.queries";
import { MissionFlowTheater } from "@/components/blocks/mission-flow-theater";
import { ImpactObservatory } from "@/components/blocks/impact-observatory";
import { TrustStackTheater } from "@/components/blocks/trust-stack-theater";
import { VolunteerSupportCommand } from "@/components/blocks/volunteer-support-command";
import { TransparencyLedgerTheater } from "@/components/blocks/transparency-ledger-theater";

export async function HomePageSections() {
  const campaigns = await getFeaturedCampaigns(3);

  return (
    <>
      <Navbar />
      <VideoHero />
      <PremiumActionDock />
      <HomeExperienceShowcase />
      <MissionFlowTheater />
      <ImpactObservatory />
      <TrustStackTheater />
      <VolunteerSupportCommand />
      <TransparencyLedgerTheater />
      <LiveTicker />
      <ScholarshipEntry />
      <SuccessMetrics />
      <TrustPillars />

      <SectionShell
        id="campaigns"
        eyebrow="Active Campaigns"
        title="Support verified education needs."
        description="Featured campaigns are controlled from the admin dashboard and loaded from the database."
      >
        <div className="mb-8 flex justify-end">
          <Button href="/campaigns" variant="secondary">
            View all campaigns
          </Button>
        </div>

        {campaigns.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {campaigns.map((campaign) => (
              <PublicCampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-[32px] p-8 text-center">
            <h3 className="text-2xl font-black tracking-[-0.055em] text-slate-950">
              No featured campaigns yet
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Create an active featured campaign from the admin dashboard and it
              will appear here automatically.
            </p>
            <Button href="/admin/campaigns/new" className="mt-6">
              Create campaign
            </Button>
          </div>
        )}
      </SectionShell>

      <SponsorSection />
      <ImpactStoryGrid />
      <TransparencyDashboard />

      <section id="volunteer" className="relative overflow-hidden px-6 py-16 sm:px-8 lg:px-12">
  <div
    aria-hidden="true"
    className="absolute inset-y-8 right-0 w-1/2 rounded-l-full bg-cyan-100/35 blur-3xl"
  />

  <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
        Volunteer With Devasiri
      </p>

      <h2 className="mt-4 text-4xl font-black tracking-[-0.065em] text-slate-950 sm:text-5xl">
        Help verify, guide, and support students.
      </h2>

      <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
        Volunteers help with document review, district-level follow-up,
        student interviews, mentoring, and transparent reporting.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button href="/volunteer" size="lg">
          Join as Volunteer
        </Button>

        <Button href="/apply" variant="secondary" size="lg">
          Guide a Student to Apply
        </Button>
      </div>
    </div>

    <FloatingIllustration
      src="/illustrations/volunteer-student-support.png"
      alt="Volunteers supporting student education"
      className="mx-auto max-w-[760px]"
    />
  </div>
</section>

      <DonationWidget />
      <PlatformReliability />
      <PremiumCTA />
      <Testimonials />
    </>
  );
}
