import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, HeartHandshake, ShieldCheck } from "lucide-react";
import { DonationIntentForm } from "@/components/donations/donation-intent-form";
import { Navbar } from "@/components/layouts/navbar";
import {
  formatINRFromPaise,
  getCampaignProgress,
  getPublicCampaignBySlug
} from "@/features/campaigns/campaign.queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
            href={`/campaigns/${campaign.slug}`}
            className="inline-flex items-center gap-2 rounded-[16px] border border-slate-200 bg-white/74 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-xl transition hover:bg-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to campaign
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Campaign Support
              </p>

              <h1 className="mt-4 text-5xl font-black tracking-[-0.08em] text-slate-950 sm:text-6xl">
                Help this education campaign move forward.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                Your support creates a pending donation record that can be
                verified and connected to transparent campaign progress.
              </p>

              <div className="mt-8 rounded-[34px] border border-white/70 bg-white/76 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
                <img
                  src={campaign.coverImageUrl ?? "/illustrations/campaign-education-support.png"}
                  alt={campaign.title}
                  className="mx-auto h-auto w-full max-w-[620px] object-contain"
                />

                <div className="mt-5 rounded-[24px] bg-slate-50 p-5 ring-1 ring-slate-200">
                  <h2 className="text-xl font-black tracking-[-0.04em] text-slate-950">
                    {campaign.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {campaign.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Raised",
                    value: formatINRFromPaise(campaign.raisedAmountPaise)
                  },
                  {
                    label: "Goal",
                    value: formatINRFromPaise(campaign.goalAmountPaise)
                  },
                  {
                    label: "Progress",
                    value: `${progress}%`
                  }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-white/70 bg-white/72 p-5 shadow-sm backdrop-blur-xl"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-xl font-black tracking-[-0.05em] text-slate-950">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky top-28">
              <DonationIntentForm
                campaignId={campaign.id}
                campaignSlug={campaign.slug}
                campaignTitle={campaign.title}
                errorMessage={
                  query.error ? decodeURIComponent(query.error) : undefined
                }
              />

              <div className="mt-5 grid gap-3 rounded-[28px] border border-white/70 bg-white/70 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.07)] backdrop-blur-2xl">
                {[
                  {
                    icon: ShieldCheck,
                    label: "Admin verified campaign"
                  },
                  {
                    icon: HeartHandshake,
                    label: "Donation record created securely"
                  },
                  {
                    icon: CheckCircle2,
                    label: "Receipt reference available after record creation"
                  }
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 text-sm font-bold text-slate-700"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-blue-600" />
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
