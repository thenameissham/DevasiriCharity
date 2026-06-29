"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Filter,
  HeartHandshake,
  IndianRupee,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users
} from "lucide-react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

export interface CampaignDiscoveryItem {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly story: string | null;
  readonly category: string;
  readonly status: string;
  readonly goalAmountPaise: number;
  readonly raisedAmountPaise: number;
  readonly coverImageUrl: string | null;
  readonly isFeatured: boolean;
  readonly donationCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

interface CampaignDiscoveryClientProps {
  readonly campaigns: readonly CampaignDiscoveryItem[];
}

function formatINRFromPaise(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value / 100);
}

function getCampaignProgress(raisedAmountPaise: number, goalAmountPaise: number) {
  if (goalAmountPaise <= 0) return 0;

  return Math.min(
    100,
    Math.round((raisedAmountPaise / goalAmountPaise) * 100)
  );
}

function CampaignExperienceCard({
  campaign,
  index
}: {
  readonly campaign: CampaignDiscoveryItem;
  readonly index: number;
}) {
  const { reducedMotion } = useMotionExperience();

  const progress = getCampaignProgress(
    campaign.raisedAmountPaise,
    campaign.goalAmountPaise
  );

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.25),
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative overflow-hidden rounded-[38px] border border-white/80 bg-white/76 shadow-[0_28px_90px_rgba(7,17,31,0.09)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-[var(--theme-border)] hover:shadow-[0_38px_120px_rgba(7,17,31,0.15)]"
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--theme-primary)]/0 blur-3xl transition duration-500 group-hover:bg-[var(--theme-primary)]/16"
      />

      <div className="relative grid min-h-full lg:grid-rows-[270px_1fr]">
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,var(--theme-soft),white,var(--theme-accent-soft))]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.25),transparent_38%)]"
          />

          {campaign.coverImageUrl ? (
            <img
              src={campaign.coverImageUrl}
              alt={campaign.title}
              className="relative h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
            />
          ) : (
            <img
              src="/illustrations/campaign-education-support.png"
              alt=""
              aria-hidden="true"
              className="relative mx-auto h-full w-full object-contain p-5 transition duration-700 group-hover:scale-[1.04]"
            />
          )}

          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/70 bg-white/88 px-3 py-1.5 text-xs font-black text-[var(--theme-primary)] shadow-sm backdrop-blur-xl">
              {campaign.category}
            </span>

            {campaign.isFeatured ? (
              <span className="rounded-full border border-white/70 bg-[var(--theme-accent-soft)] px-3 py-1.5 text-xs font-black text-[var(--theme-accent)] shadow-sm backdrop-blur-xl">
                FEATURED
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-5 right-5 rounded-full border border-white/70 bg-white/88 px-3 py-1.5 text-xs font-black text-[var(--theme-ink)] shadow-sm backdrop-blur-xl">
            {progress}% funded
          </div>
        </div>

        <div className="relative p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-black leading-tight tracking-[-0.06em] text-[var(--theme-ink)]">
              {campaign.title}
            </h3>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[17px] bg-[var(--theme-soft)] text-[var(--theme-primary)]">
              <BadgeCheck className="h-5 w-5" />
            </div>
          </div>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
            {campaign.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-[22px] border border-slate-200/80 bg-white/72 p-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                <IndianRupee className="h-3.5 w-3.5" />
                Raised
              </div>

              <p className="mt-2 text-lg font-black tracking-[-0.045em] text-[var(--theme-ink)]">
                {formatINRFromPaise(campaign.raisedAmountPaise)}
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200/80 bg-white/72 p-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                <Target className="h-3.5 w-3.5" />
                Goal
              </div>

              <p className="mt-2 text-lg font-black tracking-[-0.045em] text-[var(--theme-ink)]">
                {formatINRFromPaise(campaign.goalAmountPaise)}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-black text-[var(--theme-ink)]">
                Campaign progress
              </p>

              <p className="text-sm font-black text-[var(--theme-primary)]">
                {progress}%
              </p>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-accent)] to-[var(--theme-primary)]"
                initial={reducedMotion ? false : { width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: reducedMotion ? 0 : 0.75 }}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2 font-bold">
              <Users className="h-4 w-4" />
              {campaign.donationCount} donations
            </span>

            <span className="inline-flex items-center gap-2 font-bold">
              <ShieldCheck className="h-4 w-4 text-[var(--theme-primary)]" />
              Verified
            </span>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <Link
              href={`/campaigns/${campaign.slug}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] border border-slate-200 bg-white px-5 text-sm font-black text-[var(--theme-ink)] shadow-sm transition hover:bg-[var(--theme-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
            >
              View Details
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href={`/campaigns/${campaign.slug}/donate`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-[var(--theme-primary)] px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,118,110,0.22)] transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
            >
              Support Now
              <HeartHandshake className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function CampaignDiscoveryClient({
  campaigns
}: CampaignDiscoveryClientProps) {
  const { reducedMotion } = useMotionExperience();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = useMemo(() => {
    const unique = new Set(campaigns.map((campaign) => campaign.category));
    return ["ALL", ...Array.from(unique)];
  }, [campaigns]);

  const filteredCampaigns = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return campaigns.filter((campaign) => {
      const matchesCategory =
        activeCategory === "ALL" || campaign.category === activeCategory;

      const matchesSearch =
        normalizedQuery.length === 0 ||
        campaign.title.toLowerCase().includes(normalizedQuery) ||
        campaign.description.toLowerCase().includes(normalizedQuery) ||
        campaign.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, campaigns, query]);

  const totalRaised = campaigns.reduce(
    (sum, campaign) => sum + campaign.raisedAmountPaise,
    0
  );

  const totalGoal = campaigns.reduce(
    (sum, campaign) => sum + campaign.goalAmountPaise,
    0
  );

  const totalDonations = campaigns.reduce(
    (sum, campaign) => sum + campaign.donationCount,
    0
  );

  const overallProgress =
    totalGoal <= 0 ? 0 : Math.min(100, Math.round((totalRaised / totalGoal) * 100));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--theme-surface)] px-6 pb-24 pt-32 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--theme-surface)_0%,white_46%,var(--theme-soft)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-52 top-16 h-[620px] w-[620px] rounded-full bg-[var(--theme-primary)]/16 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-220px] top-24 h-[680px] w-[680px] rounded-full bg-[var(--theme-accent)]/16 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 devasiri-premium-grid opacity-55"
      />

      <section className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-white/72 px-4 py-2 text-sm font-black text-[var(--theme-primary)] shadow-sm backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              Verified education support campaigns
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.085em] text-[var(--theme-ink)] sm:text-6xl lg:text-7xl">
              Discover campaigns that keep students learning.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Explore verified education, hostel, sponsorship, and fee-support
              campaigns managed through Devasiri’s transparent platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/apply"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[22px] bg-[var(--theme-primary)] px-7 text-sm font-black text-white shadow-[0_20px_55px_rgba(15,118,110,0.23)] transition hover:-translate-y-0.5 hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
              >
                Check Student Eligibility
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[22px] border border-slate-200 bg-white/76 px-7 text-sm font-black text-[var(--theme-ink)] shadow-[0_16px_45px_rgba(7,17,31,0.08)] backdrop-blur-2xl transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_68%)] blur-3xl"
            />

            <img
              src="/illustrations/campaign-education-support.png"
              alt=""
              aria-hidden="true"
              className="relative mx-auto h-auto w-full max-w-[720px] object-contain devasiri-float-slow"
            />
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: IndianRupee,
              value: formatINRFromPaise(totalRaised),
              label: "verified campaign support raised"
            },
            {
              icon: HeartHandshake,
              value: String(totalDonations),
              label: "donation records connected"
            },
            {
              icon: Target,
              value: `${overallProgress}%`,
              label: "overall campaign progress"
            }
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-[30px] border border-white/80 bg-white/76 p-6 shadow-[0_24px_80px_rgba(7,17,31,0.08)] backdrop-blur-2xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[var(--theme-soft)] text-[var(--theme-primary)]">
                  <Icon className="h-6 w-6" />
                </div>

                <p className="mt-5 text-3xl font-black tracking-[-0.065em] text-[var(--theme-ink)]">
                  {item.value}
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="sticky top-28 z-30 mt-10 rounded-[34px] border border-white/80 bg-white/78 p-4 shadow-[0_24px_90px_rgba(7,17,31,0.10)] backdrop-blur-2xl">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="relative block">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search campaigns by title, purpose, or category..."
                className="h-14 w-full rounded-[22px] border border-slate-200 bg-white px-12 text-sm font-semibold text-[var(--theme-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--theme-primary)] focus:ring-4 focus:ring-[var(--theme-ring)]"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex h-11 items-center gap-2 rounded-[16px] border border-slate-200 bg-white px-4 text-sm font-black text-slate-500">
                <Filter className="h-4 w-4" />
                Filter
              </span>

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "h-11 rounded-[16px] px-4 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]",
                    activeCategory === category
                      ? "bg-[var(--theme-primary)] text-white shadow-[0_14px_34px_rgba(15,118,110,0.22)]"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-[var(--theme-soft)]"
                  )}
                >
                  {category === "ALL" ? "All" : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          {filteredCampaigns.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-3">
              {filteredCampaigns.map((campaign, index) => (
                <CampaignExperienceCard
                  key={campaign.id}
                  campaign={campaign}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[38px] border border-white/80 bg-white/78 p-10 text-center shadow-[0_24px_80px_rgba(7,17,31,0.08)] backdrop-blur-2xl">
              <h2 className="text-3xl font-black tracking-[-0.06em] text-[var(--theme-ink)]">
                No matching campaigns found
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                Try clearing the search or choosing another campaign category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("ALL");
                }}
                className="mt-6 inline-flex h-12 items-center justify-center rounded-[18px] bg-[var(--theme-primary)] px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,118,110,0.22)] transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
