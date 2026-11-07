import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  BookOpenText,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  IndianRupee,
  Target,
} from "lucide-react";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { Button } from "@/components/ui/button";
import { getPublicCampaignBySlug } from "@/features/campaigns/campaign.queries";
import {
  formatINRFromPaise,
  getCampaignDateLabel,
  getCampaignProgress,
} from "@/lib/campaign-display";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface CampaignDetailPageProps {
  readonly params: Promise<{
    slug: string;
  }>;
}

export const metadata: Metadata = {
  title: "Campaign Details",
  description: "Explore Devasiri education support campaign details.",
};

export default async function CampaignDetailPage({
  params,
}: CampaignDetailPageProps) {
  const routeParams = await params;
  const campaign = await getPublicCampaignBySlug(routeParams.slug);

  if (!campaign) {
    notFound();
  }

  const progress = getCampaignProgress(
    campaign.raisedAmountPaise,
    campaign.goalAmountPaise,
  );
  const campaignDateLabel = getCampaignDateLabel(
    campaign.startDate,
    campaign.endDate,
    "long",
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f6f8fa] px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-[#59636e] transition-colors hover:bg-white hover:text-[#1f2328] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f883d]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All campaigns
          </Link>

          <section className="mt-4 overflow-hidden rounded-xl border border-[#d1d9e0] bg-white">
            <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
              <div className="p-5 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#d1d9e0] bg-[#f6f8fa] px-3 py-1 text-xs font-semibold text-[#59636e]">
                    {campaign.category}
                  </span>
                  {campaign.isFeatured ? (
                    <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-xs font-semibold text-[#1d4ed8]">
                      Featured campaign
                    </span>
                  ) : null}
                </div>

                <h1 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-[#1f2328] sm:text-4xl lg:text-[2.8rem]">
                  {campaign.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#59636e]">
                  {campaign.description}
                </p>

                {campaignDateLabel ? (
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#59636e]">
                    <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <span>{campaignDateLabel}</span>
                  </p>
                ) : null}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href={`/campaigns/${campaign.slug}/donate`}
                    size="lg"
                    className="rounded-md bg-[#1f883d] shadow-none hover:bg-[#1a7f37] focus-visible:outline-[#1f883d]"
                  >
                    Explore support options
                    <HeartHandshake aria-hidden="true" className="h-4 w-4" />
                  </Button>
                  <Button
                    href="/apply"
                    variant="secondary"
                    size="lg"
                    className="rounded-md shadow-none"
                  >
                    Student support
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex min-h-[240px] items-center justify-center border-t border-[#d1d9e0] bg-[#f6f8fa] p-6 sm:p-8 lg:border-l lg:border-t-0">
                <img
                  src={campaign.coverImageUrl ?? "/illustrations/campaign-education-support.png"}
                  alt={campaign.title}
                  className="h-auto max-h-[340px] w-full max-w-[520px] object-contain"
                />
              </div>
            </div>
          </section>

          <section aria-label="Campaign progress" className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-[#d1d9e0] bg-white p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-[#59636e]">
                <IndianRupee aria-hidden="true" className="h-4 w-4" />
                Recorded support
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-[#1f2328]">
                {formatINRFromPaise(campaign.raisedAmountPaise)}
              </p>
              <p className="mt-1 text-sm text-[#59636e]">Amount currently recorded for this campaign</p>
            </div>
            <div className="rounded-lg border border-[#d1d9e0] bg-white p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-[#59636e]">
                <GraduationCap aria-hidden="true" className="h-4 w-4" />
                Campaign goal
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-[#1f2328]">
                {formatINRFromPaise(campaign.goalAmountPaise)}
              </p>
              <p className="mt-1 text-sm text-[#59636e]">Published support target</p>
            </div>
            <div className="rounded-lg border border-[#d1d9e0] bg-white p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-[#59636e]">
                <Target aria-hidden="true" className="h-4 w-4" />
                Progress toward goal
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-[#1f2328]">
                {progress}%
              </p>
              <div
                role="progressbar"
                aria-label="Campaign goal progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-valuetext={`${progress}% of campaign goal recorded`}
                className="mt-3 h-2 overflow-hidden rounded-full bg-[#d8dee4]"
              >
                <div
                  className="h-full rounded-full bg-[#1f883d] transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </section>

          <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="rounded-xl border border-[#d1d9e0] bg-white p-5 sm:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1f883d]">
                <BookOpenText aria-hidden="true" className="h-4 w-4" />
                About this campaign
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#1f2328]">
                Why this support matters
              </h2>
              <p className="mt-4 whitespace-pre-line text-base leading-7 text-[#59636e]">
                {campaign.story ??
                  "This campaign describes an education support need. Review the campaign details and intended purpose before proceeding. Devasiri aims to connect community support with students’ ability to continue learning."}
              </p>
            </article>

            <aside className="h-fit rounded-xl border border-[#d1d9e0] bg-white p-5 sm:p-6">
              <h2 className="text-lg font-semibold tracking-tight text-[#1f2328]">
                Before you continue
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#59636e]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#1f883d]" />
                  Review the campaign purpose and description.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#1f883d]" />
                  Check the current recorded amount and support goal.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#1f883d]" />
                  Review the next-step details before submitting a support request.
                </li>
              </ul>
              <Button
                href={`/campaigns/${campaign.slug}/donate`}
                size="lg"
                className="mt-5 w-full rounded-md bg-[#1f883d] shadow-none hover:bg-[#1a7f37]"
              >
                Continue
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
              <p className="mt-3 text-xs leading-5 text-[#59636e]">
                This page displays campaign information. It does not confirm a completed payment.
              </p>
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
