import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  IndianRupee,
  ShieldCheck,
  Users
} from "lucide-react";
import { Navbar } from "@/components/layouts/navbar";
import { Button } from "@/components/ui/button";
import {
  formatINRFromPaise,
  getCampaignProgress,
  getPublicCampaignBySlug
} from "@/features/campaigns/campaign.queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface CampaignDetailPageProps {
  readonly params: Promise<{
    slug: string;
  }>;
}

export const metadata: Metadata = {
  title: "Campaign Details",
  description: "View verified Devasiri education support campaign details."
};

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
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#f7fbff] px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_46%,#edf6ff_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute -left-40 top-16 h-[520px] w-[520px] rounded-full bg-blue-300/24 blur-[90px]"
        />

        <div
          aria-hidden="true"
          className="absolute right-[-180px] top-24 h-[620px] w-[620px] rounded-full bg-cyan-300/24 blur-[100px]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 devasiri-grid-mask opacity-50"
        />

        <section className="relative mx-auto max-w-7xl">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 rounded-[16px] border border-slate-200 bg-white/74 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-xl transition hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to campaigns
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700 ring-1 ring-blue-100">
                  {campaign.category}
                </span>

                {campaign.isFeatured ? (
                  <span className="rounded-full bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-amber-700 ring-1 ring-amber-100">
                    Featured
                  </span>
                ) : null}

                <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-700 ring-1 ring-emerald-100">
                  Verified
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.08em] text-slate-950 sm:text-6xl">
                {campaign.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {campaign.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={`/campaigns/${campaign.slug}/donate`}
                  size="lg"
                  className="rounded-[20px] px-7 devasiri-shine"
                >
                  Support this Campaign
                  <HeartHandshake className="h-5 w-5" />
                </Button>

                <Button
                  href="/apply"
                  variant="secondary"
                  size="lg"
                  className="rounded-[20px] px-7"
                >
                  Student? Check Eligibility
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200/50 via-cyan-100/40 to-transparent blur-3xl"
              />

              <img
                src={campaign.coverImageUrl ?? "/illustrations/campaign-education-support.png"}
                alt={campaign.title}
                className="relative mx-auto h-auto w-full max-w-[760px] rounded-[34px] object-contain"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <div className="rounded-[28px] border border-white/70 bg-white/74 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <IndianRupee className="h-6 w-6 text-blue-600" />
              <p className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-950">
                {formatINRFromPaise(campaign.raisedAmountPaise)}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                raised so far
              </p>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/74 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <GraduationCap className="h-6 w-6 text-cyan-600" />
              <p className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-950">
                {formatINRFromPaise(campaign.goalAmountPaise)}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                support goal
              </p>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/74 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <Users className="h-6 w-6 text-emerald-600" />
              <p className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-950">
                {campaign.donationCount}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                donation records
              </p>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/74 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
              <p className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-950">
                {progress}%
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                campaign progress
              </p>
            </div>
          </div>

          <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
            <article className="rounded-[36px] border border-white/70 bg-white/76 p-7 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Campaign Story
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-slate-950">
                Why this campaign matters
              </h2>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
                {campaign.story ??
                  "This campaign supports verified education needs so that students can continue their learning journey with dignity, accountability, and transparent support."}
              </p>
            </article>

            <aside className="rounded-[36px] border border-white/70 bg-white/76 p-6 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Trust Checklist
              </p>

              <div className="mt-5 grid gap-3">
                {[
                  "Campaign verified by admin",
                  "Donation records are traceable",
                  "Support progress is visible",
                  "Receipt reference is generated"
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[18px] border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-bold text-slate-700"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>

              <Button
                href={`/campaigns/${campaign.slug}/donate`}
                size="lg"
                className="mt-6 w-full rounded-[20px]"
              >
                Continue Support
                <HeartHandshake className="h-5 w-5" />
              </Button>
            </aside>
          </section>
        </section>
      </main>
    </>
  );
}
