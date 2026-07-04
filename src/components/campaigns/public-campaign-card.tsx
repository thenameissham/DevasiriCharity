import Link from "next/link";
import { ArrowRight, ShieldCheck, Users } from "lucide-react";
import {
  formatINRFromPaise,
  getCampaignProgress,
  type PublicCampaign,
} from "@/features/campaigns/campaign.queries";

interface PublicCampaignCardProps {
  readonly campaign: PublicCampaign;
}

export function PublicCampaignCard({ campaign }: PublicCampaignCardProps) {
  const progress = getCampaignProgress(
    campaign.raisedAmountPaise,
    campaign.goalAmountPaise,
  );

  return (
    <article className="group overflow-hidden rounded-[32px] border border-[var(--theme-border)] bg-white/88 shadow-[0_24px_76px_rgba(8,26,28,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_100px_rgba(8,26,28,0.12)]">
      <div className="relative h-56 overflow-hidden bg-[linear-gradient(145deg,#e5f4ee,#fff5dc)]">
        {campaign.coverImageUrl ? (
          <img
            src={campaign.coverImageUrl}
            alt={campaign.title}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <img
            src="/illustrations/campaign-education-support.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-contain p-4 transition duration-700 ease-out group-hover:scale-[1.035]"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b2729]/50 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/70 bg-white/88 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[var(--theme-primary)] shadow-sm backdrop-blur-xl">
            {campaign.category}
          </span>
          {campaign.isFeatured ? (
            <span className="rounded-full border border-amber-200/80 bg-[#fff4d6]/92 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#986113] shadow-sm backdrop-blur-xl">
              Featured
            </span>
          ) : null}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 text-sm font-bold text-white">
          <span>{campaign.donationCount} supporters</span>
          <span>{progress}% funded</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3 text-xs font-bold text-[#708081]">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[var(--theme-primary)]" />
            Verified campaign
          </span>
        </div>

        <h3 className="font-headline text-balance mt-4 text-2xl font-extrabold leading-tight tracking-[-0.045em] text-[var(--theme-ink)]">
          {campaign.title}
        </h3>

        <p className="mt-3 line-clamp-3 min-h-[84px] text-sm leading-7 text-[#607071]">
          {campaign.description}
        </p>

        <div className="mt-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#7b8a8b]">Raised</p>
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

          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#e7efeb]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--theme-primary),#35a995,var(--theme-accent))] transition-[width] duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[var(--theme-border)] pt-5">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#607071]">
            <Users className="h-4 w-4 text-[var(--theme-primary)]" />
            {campaign.donationCount} supporters
          </span>
        </div>

        <Link
          href={`/campaigns/${campaign.slug}`}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[18px] bg-[linear-gradient(135deg,#071a1c,#0e2b2d)] px-5 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(8,26,28,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#0f766e,#0d8b77)]"
        >
          View campaign
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
