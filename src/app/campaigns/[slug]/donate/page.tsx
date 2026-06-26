import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DonationIntentForm } from "@/components/donations/donation-intent-form";
import { FloatingIllustration } from "@/components/ui/floating-illustration";
import {
  formatINRFromPaise,
  getCampaignProgress,
  getPublicCampaignBySlug
} from "@/features/campaigns/campaign.queries";

export const dynamic = "force-dynamic";

interface DonatePageProps {
  readonly params: Promise<{
    slug: string;
  }>;
  readonly searchParams: Promise<{
    error?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Support Campaign",
  description: "Start a secure donation intent for a Devasiri campaign."
};

export default async function DonatePage({
  params,
  searchParams
}: DonatePageProps) {
  const routeParams = await params;
  const query = await searchParams;

  const campaign = await getPublicCampaignBySlug(routeParams.slug);

  if (!campaign) {
    notFound();
  }

  const progress = getCampaignProgress(
    campaign.raisedAmountPaise,
    campaign.goalAmountPaise
  );

  return (
    <main className="min-h-screen px-6 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <Link
          href={`/campaigns/${campaign.slug}`}
          className="inline-flex items-center gap-2 rounded-[16px] border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to campaign
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Support Campaign
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-[-0.075em] text-slate-950">
              Help this education support campaign move forward.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Your contribution intent is linked to this campaign and can later
              be mapped to payment verification, receipt generation, and impact
              reporting.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-slate-200 bg-white/70 p-5 backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Raised
                </p>
                <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-slate-950">
                  {formatINRFromPaise(campaign.raisedAmountPaise)}
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white/70 p-5 backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Goal
                </p>
                <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-slate-950">
                  {formatINRFromPaise(campaign.goalAmountPaise)}
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white/70 p-5 backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Progress
                </p>
                <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-blue-600">
                  {progress}%
                </p>
              </div>
            </div>

            <FloatingIllustration
              src="/illustrations/campaign-education-support.png"
              alt="Education support campaign illustration"
              className="mt-8 max-w-[720px]"
            />
          </div>

          <DonationIntentForm
            campaignId={campaign.id}
            campaignSlug={campaign.slug}
            campaignTitle={campaign.title}
            errorMessage={
              query.error ? decodeURIComponent(query.error) : undefined
            }
          />
        </div>
      </section>
    </main>
  );
}