import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import {
  formatINRFromPaise,
  formatSuccessfulDonationCount,
  getCampaignDateLabel,
  getCampaignProgress,
} from "@/lib/campaign-display";
import type { PublicCampaign } from "@/features/campaigns/campaign.queries";

interface PublicCampaignCardProps {
  readonly campaign: PublicCampaign;
}

export function PublicCampaignCard({ campaign }: PublicCampaignCardProps) {
  const progress = getCampaignProgress(
    campaign.raisedAmountPaise,
    campaign.goalAmountPaise,
  );

  const dateLabel = getCampaignDateLabel(campaign.startDate, campaign.endDate);

  return (
    <article className="group overflow-hidden rounded-xl border border-[var(--theme-border)] bg-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-56 overflow-hidden bg-[linear-gradient(145deg,#e5f4ee,#fff5dc)]">
        {campaign.coverImageUrl ? (
          <img
            src={campaign.coverImageUrl}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <img
            src="/illustrations/campaign-education-support.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-4 transition duration-700 ease-out group-hover:scale-[1.035]"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b2729]/50 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-md border border-white/80 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--theme-primary)] shadow-sm">
            {campaign.category}
          </span>
          {campaign.isFeatured ? (
            <span className="rounded-full border border-amber-200/80 bg-[#fff4d6]/92 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#986113] shadow-sm backdrop-blur-xl">
              Featured
            </span>
          ) : null}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 text-sm font-bold text-white">
          <span>{formatSuccessfulDonationCount(campaign.donationCount)}</span>
          <span>{progress}% funded</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-headline text-balance mt-4 text-2xl font-extrabold leading-tight tracking-[-0.045em] text-[var(--theme-ink)]">
          {campaign.title}
        </h3>

        <p className="mt-3 line-clamp-3 min-h-[84px] text-sm leading-7 text-[#607071]">
          {campaign.description}
        </p>

        {dateLabel ? (
          <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[#59636e]">
            <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span>{dateLabel}</span>
          </p>
        ) : null}

        <div className="mt-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#7b8a8b]">Recorded support</p>
              <p className="font-headline mt-1 text-lg font-extrabold tracking-[-0.03em] text-[var(--theme-ink)]">
                {formatINRFromPaise(campaign.raisedAmountPaise)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-[#7b8a8b]">Goal</p>
              <p className="font-headline mt-1 text-sm font-extrabold text-[#405456]">
                {formatINRFromPaise(campaign.goalAmountPaise)}
              </p>
            </div>
          </div>

          <div
            role="progressbar"
            aria-label={`Funding progress for ${campaign.title}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={`${progress}% funded`}
            className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#e7efeb]"
          >
            <div aria-hidden="true"
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--theme-primary),#35a995,var(--theme-accent))] transition-[width] duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link
          href={`/campaigns/${campaign.slug}`}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,#071a1c,#0e2b2d)] px-5 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(8,26,28,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#0f766e,#0d8b77)]"
        >
          View campaign
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
