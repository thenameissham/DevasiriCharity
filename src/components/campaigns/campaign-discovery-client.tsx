"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  HeartHandshake,
  IndianRupee,
  Search,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

function CampaignCard({ campaign }: { readonly campaign: CampaignDiscoveryItem }) {
  const progress = getCampaignProgress(
    campaign.raisedAmountPaise,
    campaign.goalAmountPaise
  );

  return (
    <article className="group relative overflow-hidden rounded-[34px] border border-slate-200 bg-white/78 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_34px_100px_rgba(37,99,235,0.16)]">
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.16),transparent_38%)]"
        />

        {campaign.coverImageUrl ? (
          <img
            src={campaign.coverImageUrl}
            alt={campaign.title}
            className="relative h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src="/illustrations/campaign-education-support.png"
            alt=""
            aria-hidden="true"
            className="relative mx-auto h-full w-full object-contain p-4 transition duration-500 group-hover:scale-[1.04]"
          />
        )}

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
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
        <h3 className="text-2xl font-black tracking-[-0.055em] text-slate-950">
          {campaign.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {campaign.description}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Raised
            </p>
            <p className="mt-1 text-lg font-black tracking-[-0.04em] text-slate-950">
              {formatINRFromPaise(campaign.raisedAmountPaise)}
            </p>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Goal
            </p>
            <p className="mt-1 text-lg font-black tracking-[-0.04em] text-slate-950">
              {formatINRFromPaise(campaign.goalAmountPaise)}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-700">Progress</p>
            <p className="text-sm font-black text-blue-600">{progress}%</p>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 transition-all duration-700"
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

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <Link
            href={`/campaigns/${campaign.slug}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 shadow-sm transition hover:bg-slate-50"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href={`/campaigns/${campaign.slug}/donate`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-blue-600 px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(37,99,235,0.24)] transition hover:bg-blue-700"
          >
            Support Now
            <HeartHandshake className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CampaignDiscoveryClient({
  campaigns
}: CampaignDiscoveryClientProps) {
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

  return (
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
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/76 px-4 py-2 text-sm font-black text-blue-700 shadow-sm backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              Verified education support campaigns
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.08em] text-slate-950 sm:text-6xl lg:text-7xl">
              Discover campaigns that keep students learning.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Explore verified education, hostel, sponsorship, and fee-support
              campaigns managed through Devasiri’s transparent platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/apply" size="lg" className="rounded-[20px] px-7">
                Check Student Eligibility
                <ArrowRight className="h-5 w-5" />
              </Button>

              <Button
                href="/"
                variant="secondary"
                size="lg"
                className="rounded-[20px] px-7"
              >
                Back to Home
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200/50 via-cyan-100/40 to-transparent blur-3xl"
            />

            <img
              src="/illustrations/campaign-education-support.png"
              alt=""
              aria-hidden="true"
              className="relative mx-auto h-auto w-full max-w-[720px] object-contain devasiri-float-slow"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-white/70 bg-white/72 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <IndianRupee className="h-6 w-6 text-blue-600" />
            <p className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-950">
              {formatINRFromPaise(totalRaised)}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              verified campaign support raised
            </p>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/72 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <HeartHandshake className="h-6 w-6 text-emerald-600" />
            <p className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-950">
              {totalDonations}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              donation records connected
            </p>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-white/72 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <ShieldCheck className="h-6 w-6 text-cyan-600" />
            <p className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-950">
              {formatINRFromPaise(totalGoal)}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              total support goal across campaigns
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-[32px] border border-white/70 bg-white/72 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="relative block">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search campaigns by title, purpose, or category..."
                className="h-13 w-full rounded-[20px] border border-slate-200 bg-white px-12 py-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "h-11 rounded-[16px] px-4 text-sm font-black transition",
                    activeCategory === category
                      ? "bg-blue-600 text-white shadow-[0_14px_34px_rgba(37,99,235,0.22)]"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
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
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="rounded-[34px] border border-slate-200 bg-white/78 p-10 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <h2 className="text-3xl font-black tracking-[-0.06em] text-slate-950">
                No matching campaigns found
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                Try clearing the search or choosing another campaign category.
              </p>

              <Button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("ALL");
                }}
                className="mt-6"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
