import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  HeartHandshake,
  ShieldCheck,
  Users
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  formatINRFromPaise,
  getCampaignProgress,
  getPublicCampaignBySlug
} from "@/features/campaigns/campaign.queries";

export const dynamic = "force-dynamic";

interface CampaignDetailPageProps {
  readonly params: Promise<{
    slug: string;
  }>;
}

function formatDate(date: Date | null): string {
  if (!date) return "Flexible";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

export async function generateMetadata({
  params
}: CampaignDetailPageProps): Promise<Metadata> {
  const routeParams = await params;
  const campaign = await getPublicCampaignBySlug(routeParams.slug);

  if (!campaign) {
    return {
      title: "Campaign not found"
    };
  }

  return {
    title: campaign.title,
    description: campaign.description
  };
}

export default async function CampaignDetailPage({
  params
}: CampaignDetailPageProps) {
  const routeParams = await params;
  const campaign = await getPublicCampaignBySlug(routeParams.slug);

  if (!campaign) {
    notFound();
  }

  const progress = getCampaignProgress(
    campaign.raisedAmountPaise,
    campaign.goalAmountPaise
  );

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(37,99,235,0.16),transparent_30%),radial-gradient(circle_at_92%_10%,rgba(6,182,212,0.14),transparent_28%)]"
        />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 rounded-[16px] border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to campaigns
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-black text-blue-700 ring-1 ring-blue-100">
                  {campaign.category}
                </span>

                <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-slate-600 ring-1 ring-slate-200">
                  {campaign.status}
                </span>

                {campaign.isFeatured ? (
                  <span className="rounded-full bg-amber-50 px-4 py-2 text-xs font-black text-amber-700 ring-1 ring-amber-100">
                    FEATURED
                  </span>
                ) : null}
              </div>

              <h1 className="mt-5 text-5xl font-black tracking-[-0.075em] text-slate-950 sm:text-6xl">
                {campaign.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
                {campaign.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-slate-200 bg-white/82 p-5 shadow-sm backdrop-blur-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Raised
                  </p>
                  <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-slate-950">
                    {formatINRFromPaise(campaign.raisedAmountPaise)}
                  </p>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-white/82 p-5 shadow-sm backdrop-blur-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Goal
                  </p>
                  <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-slate-950">
                    {formatINRFromPaise(campaign.goalAmountPaise)}
                  </p>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-white/82 p-5 shadow-sm backdrop-blur-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Progress
                  </p>
                  <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-blue-600">
                    {progress}%
                  </p>
                </div>
              </div>

              <div className="mt-8 h-4 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <aside className="rounded-[36px] border border-slate-200 bg-white/82 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.1)] backdrop-blur-xl">
              <div className="overflow-hidden rounded-[28px] bg-slate-100">
                {campaign.coverImageUrl ? (
                  <img
                    src={campaign.coverImageUrl}
                    alt={campaign.title}
                    className="h-72 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-72 w-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.22),transparent_34%),linear-gradient(135deg,#eff6ff,#ecfeff)]">
                    <HeartHandshake className="h-16 w-16 text-blue-600" />
                  </div>
                )}
              </div>

              <div className="mt-5 grid gap-3">
                <div className="flex items-center gap-3 rounded-[20px] bg-slate-50 p-4 ring-1 ring-slate-200">
                  <Users className="h-5 w-5 text-blue-600" />
                  <p className="text-sm font-bold text-slate-700">
                    {campaign.donationCount} donation records
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-[20px] bg-slate-50 p-4 ring-1 ring-slate-200">
                  <CalendarDays className="h-5 w-5 text-emerald-600" />
                  <p className="text-sm font-bold text-slate-700">
                    {formatDate(campaign.startDate)} →{" "}
                    {formatDate(campaign.endDate)}
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-[20px] bg-slate-50 p-4 ring-1 ring-slate-200">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <p className="text-sm font-bold text-slate-700">
                    Verified by Devasiri admin
                  </p>
                </div>
              </div>

              <Button
                href={`/campaigns/${campaign.slug}/donate`}
               size="lg"
                className="mt-5 w-full"
>
                Support this Campaign
                 <HeartHandshake className="h-5 w-5" />
              </Button>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="glass-card mx-auto max-w-7xl rounded-[36px] p-8 md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Campaign Story
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-[-0.055em] text-slate-950">
            Why this campaign matters
          </h2>

          <div className="mt-5 max-w-4xl whitespace-pre-line text-sm leading-7 text-slate-700">
            {campaign.story ?? campaign.description}
          </div>
        </div>
      </section>
    </main>
  );
}