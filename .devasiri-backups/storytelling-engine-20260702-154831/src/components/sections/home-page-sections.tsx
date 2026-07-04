import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { VideoHero } from "@/components/blocks/video-hero";
import { SuccessMetrics } from "@/components/blocks/success-metrics";
import { PublicCampaignCard } from "@/components/campaigns/public-campaign-card";
import { ImpactPathway } from "@/components/landing/impact-pathway";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { getFeaturedCampaigns } from "@/features/campaigns/campaign.queries";

const capabilities = [
  {
    number: "01",
    title: "Student continuity",
    description:
      "Applications, education assistance, scholarships, and hostel-related needs remain connected to the student’s verified context.",
    icon: GraduationCap,
    accent: "bg-[#e9f2ff] text-[#0c66e4]",
  },
  {
    number: "02",
    title: "Responsible participation",
    description:
      "Donors and volunteers can understand the need, the intended outcome, and how their contribution fits the wider support journey.",
    icon: HeartHandshake,
    accent: "bg-[#dcfff1] text-[#216e4e]",
  },
  {
    number: "03",
    title: "Operational accountability",
    description:
      "Administrators work through reviewable applications, campaign controls, contribution records, role-based access, and audit-oriented workflows.",
    icon: ShieldCheck,
    accent: "bg-[#fff3eb] text-[#974f0c]",
  },
] as const;

export async function HomePageSections() {
  const campaigns = await getFeaturedCampaigns(3).catch((error) => {
    console.error("Unable to load featured homepage campaigns", error);

    return [] as Awaited<ReturnType<typeof getFeaturedCampaigns>>;
  });

  return (
    <>
      <Navbar />

      <main>
        <VideoHero />

        <SuccessMetrics />

        <section
          id="about"
          className="relative overflow-hidden border-y border-[#dfe1e6] bg-white px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(12,102,228,0.09),transparent_27%),radial-gradient(circle_at_10%_88%,rgba(14,147,132,0.07),transparent_28%)]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(9,30,66,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(9,30,66,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(circle_at_55%_42%,black,transparent_76%)]"
          />

          <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b3d4ff] bg-[#e9f2ff] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.15em] text-[#0055cc]">
                <BadgeCheck
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                Who we are and what we do
              </div>

              <h2 className="mt-5 text-balance [font-family:ui-sans-serif,system-ui,sans-serif] text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] text-[#091e42] sm:text-5xl lg:text-6xl">
                A charitable operating platform designed around a
                student&apos;s next step.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-[#44546f]">
                Devasiri combines human verification, community participation,
                and transparent digital records so educational support reaches
                the right need at the right time.
              </p>

              <Link
                href="/apply"
                className="group mt-7 inline-flex items-center gap-2 rounded-[8px] text-sm font-bold text-[#0c66e4] transition hover:text-[#0055cc] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#0c66e4]"
              >
                Start a student application

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#dfe1e6] bg-white shadow-[0_20px_64px_rgba(9,30,66,0.10)]">
              <div className="flex flex-col gap-4 border-b border-[#dfe1e6] bg-[#f7f8f9] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#626f86]">
                    Platform capabilities
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#172b4d]">
                    One connected system with clear ownership
                  </p>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#dcfff1] px-3 py-1.5 text-xs font-bold text-[#216e4e]">
                  <span className="h-2 w-2 rounded-full bg-[#22a06b]" />
                  Student-first
                </span>
              </div>

              <div className="divide-y divide-[#dfe1e6]">
                {capabilities.map((capability) => {
                  const Icon = capability.icon;

                  return (
                    <article
                      key={capability.title}
                      className="group grid gap-4 px-5 py-6 transition duration-200 hover:bg-[#f7f8f9] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-7"
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-[12px] ${capability.accent}`}
                      >
                        <Icon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                      </span>

                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-[#7a869a]">
                          {capability.number}
                        </p>

                        <h3 className="mt-1 text-xl font-bold tracking-[-0.025em] text-[#172b4d]">
                          {capability.title}
                        </h3>

                        <p className="mt-2 max-w-2xl text-sm leading-7 text-[#44546f]">
                          {capability.description}
                        </p>
                      </div>

                      <ArrowRight
                        aria-hidden="true"
                        className="hidden h-5 w-5 text-[#7a869a] transition duration-200 group-hover:translate-x-1 group-hover:text-[#0c66e4] sm:block"
                      />
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <ImpactPathway />

        <section
          id="campaigns"
          className="relative overflow-hidden bg-[#f7f8f9] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        >
          <div
            aria-hidden="true"
            className="absolute -left-48 top-10 h-[480px] w-[480px] rounded-full bg-[#b3d4ff]/25 blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-48 bottom-0 h-[440px] w-[440px] rounded-full bg-[#79f2c0]/20 blur-[120px]"
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0c66e4]">
                  Verified campaigns
                </p>

                <h2 className="mt-4 text-balance [font-family:ui-sans-serif,system-ui,sans-serif] text-4xl font-extrabold tracking-[-0.05em] text-[#091e42] sm:text-5xl">
                  Support a real education need with the context to understand
                  it.
                </h2>

                <p className="mt-4 text-base leading-8 text-[#44546f]">
                  Featured campaigns are selected through the administration
                  workflow and loaded directly from the platform database.
                </p>
              </div>

              <Link
                href="/campaigns"
                className="group inline-flex h-11 w-fit items-center justify-center gap-2 rounded-[10px] border border-[#b3b9c4] bg-white px-5 text-sm font-bold text-[#172b4d] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#8590a2] hover:bg-[#f1f2f4] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#0c66e4]"
              >
                View all campaigns

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {campaigns.length > 0 ? (
              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {campaigns.map((campaign) => (
                  <PublicCampaignCard
                    key={campaign.id}
                    campaign={campaign}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-[22px] border border-dashed border-[#b3b9c4] bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-bold tracking-[-0.035em] text-[#172b4d]">
                  Verified campaigns will appear here.
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#44546f]">
                  Once an active campaign is marked as featured by the
                  administration team, it will be published automatically.
                </p>
              </div>
            )}
          </div>
        </section>

        <section
          id="volunteer"
          className="bg-white px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        >
          <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-[#0c66e4] p-8 text-white shadow-[0_28px_80px_rgba(12,102,228,0.25)] sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:p-14">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_90%_5%,rgba(255,255,255,0.22),transparent_27%),radial-gradient(circle_at_5%_100%,rgba(121,242,192,0.22),transparent_30%)]"
            />

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#deebff]">
                <UsersRound
                  aria-hidden="true"
                  className="h-4 w-4"
                />

                Participate in the mission
              </div>

              <h2 className="mt-5 text-balance [font-family:ui-sans-serif,system-ui,sans-serif] text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-5xl">
                Students, supporters, and volunteers belong in one trusted
                journey.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#deebff]">
                Apply for assistance, support a verified campaign, or
                contribute time and guidance through Devasiri&apos;s connected
                support platform.
              </p>
            </div>

            <div className="relative flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/apply"
                className="inline-flex h-12 min-w-48 items-center justify-center gap-2 rounded-[10px] bg-white px-6 text-sm font-bold text-[#0c66e4] shadow-[0_10px_24px_rgba(9,30,66,0.16)] transition hover:-translate-y-0.5 hover:bg-[#f7f8f9] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Apply for support

                <GraduationCap
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </Link>

              <Link
                href="/volunteer"
                className="inline-flex h-12 min-w-48 items-center justify-center gap-2 rounded-[10px] border border-white/25 bg-white/10 px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Join as volunteer

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
