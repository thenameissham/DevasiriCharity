import Link from "next/link";
import { ArrowRight, ShieldCheck, Users } from "lucide-react";
import {
  formatINRFromPaise,
  getCampaignProgress,
  type PublicCampaign
} from "@/features/campaigns/campaign.queries";

interface PublicCampaignCardProps {
  readonly campaign: PublicCampaign;
}

export function PublicCampaignCard({ campaign }: PublicCampaignCardProps) {
  const progress = getCampaignProgress(
    campaign.raisedAmountPaise,
    campaign.goalAmountPaise
  );

  return (
    <article className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white/86 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(15,23,42,0.14)]">
<div className="relative h-52 overflow-hidden bg-gradient-to-br from-blue-50/70 via-cyan-50/50 to-white">        {campaign.coverImageUrl ? (
          <img
            src={campaign.coverImageUrl}
            alt={campaign.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src="/illustrations/campaign-education-support.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
          />
        )}

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/92 px-3 py-1 text-xs font-black text-blue-700 shadow-sm backdrop-blur">
            {campaign.category}
          </span>

          {campaign.isFeatured ? (
            <span className="rounded-full bg-amber-50/95 px-3 py-1 text-xs font-black text-amber-700 shadow-sm backdrop-blur">
              FEATURED
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-black tracking-[-0.045em] text-slate-950">
          {campaign.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {campaign.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-[20px] bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Raised
            </p>
            <p className="mt-1 text-sm font-black text-slate-950">
              {formatINRFromPaise(campaign.raisedAmountPaise)}
            </p>
          </div>

          <div className="rounded-[20px] bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Goal
            </p>
            <p className="mt-1 text-sm font-black text-slate-950">
              {formatINRFromPaise(campaign.goalAmountPaise)}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-slate-700">Progress</p>
            <p className="text-sm font-black text-blue-600">{progress}%</p>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2 font-semibold">
            <Users className="h-4 w-4" />
            {campaign.donationCount} donations
          </span>

          <span className="inline-flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-4 w-4" />
            Verified
          </span>
        </div>

        <Link
          href={`/campaigns/${campaign.slug}`}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[18px] bg-blue-600 px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(37,99,235,0.24)] transition hover:bg-blue-700"
        >
          View details & support
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}