import Link from "next/link";
import {
  Archive,
  Edit3,
  HeartHandshake,
  Plus,
  ShieldCheck,
  Trash2
} from "lucide-react";
import { archiveOrDeleteCampaignAction } from "@/features/campaigns/campaign.actions";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardPanel } from "@/components/dashboard/dashboard-panel";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";

interface CampaignsAdminPageProps {
  readonly searchParams: Promise<{
    error?: string;
  }>;
}

function formatINRFromPaise(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value / 100);
}

function getProgress(raised: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}

export default async function CampaignsAdminPage({
  searchParams
}: CampaignsAdminPageProps) {
  const session = await requireRole(["ADMIN"]);
  const params = await searchParams;

  const [campaigns, activeCount, archivedCount, aggregate] = await Promise.all([
    prisma.campaign.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        _count: {
          select: {
            donations: true
          }
        }
      }
    }),
    prisma.campaign.count({
      where: {
        status: "ACTIVE"
      }
    }),
    prisma.campaign.count({
      where: {
        status: "ARCHIVED"
      }
    }),
    prisma.campaign.aggregate({
      _sum: {
        raisedAmountPaise: true,
        goalAmountPaise: true
      }
    })
  ]);

  const totalRaised = aggregate._sum.raisedAmountPaise ?? 0;
  const totalGoal = aggregate._sum.goalAmountPaise ?? 0;

  return (
    <DashboardShell
      role="ADMIN"
      title="Campaign Management"
      description="Create, edit, monitor, archive, and safely manage all public donation campaigns."
      userName={session.user.name ?? session.user.email ?? "Admin"}
    >
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-black tracking-[-0.05em] text-slate-950">
            Campaigns
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Public campaigns are shown on the landing page and donation flows.
          </p>
        </div>

        <Button href="/admin/campaigns/new">
          <Plus className="h-4 w-4" />
          New campaign
        </Button>
      </div>

      {params.error ? (
        <div className="mb-6 rounded-[20px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {decodeURIComponent(params.error)}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-3">
        <DashboardStatCard
          title="Active Campaigns"
          value={String(activeCount)}
          description="Campaigns currently open for public support."
          icon={HeartHandshake}
          tone="blue"
        />
        <DashboardStatCard
          title="Archived"
          value={String(archivedCount)}
          description="Campaigns hidden from active donation flows."
          icon={Archive}
          tone="slate"
        />
        <DashboardStatCard
          title="Raised / Goal"
          value={`${getProgress(totalRaised, totalGoal)}%`}
          description={`${formatINRFromPaise(totalRaised)} raised across all campaigns.`}
          icon={ShieldCheck}
          tone="emerald"
        />
      </div>

      <div className="mt-6">
        <DashboardPanel
          title="All Campaigns"
          description="Safe delete archives campaigns that already have donations."
        >
          {campaigns.length > 0 ? (
            <div className="grid gap-4">
              {campaigns.map((campaign) => {
                const progress = getProgress(
                  campaign.raisedAmountPaise,
                  campaign.goalAmountPaise
                );

                return (
                  <article
                    key={campaign.id}
                    className="rounded-[26px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 ring-1 ring-blue-100">
                            {campaign.category}
                          </span>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 ring-1 ring-slate-200">
                            {campaign.status}
                          </span>
                          {campaign.isFeatured ? (
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700 ring-1 ring-amber-100">
                              FEATURED
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-4 text-xl font-black tracking-[-0.045em] text-slate-950">
                          {campaign.title}
                        </h3>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                          {campaign.description}
                        </p>

                        <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                          <div>
                            <p className="font-bold text-slate-500">Raised</p>
                            <p className="mt-1 font-black text-slate-950">
                              {formatINRFromPaise(campaign.raisedAmountPaise)}
                            </p>
                          </div>
                          <div>
                            <p className="font-bold text-slate-500">Goal</p>
                            <p className="mt-1 font-black text-slate-950">
                              {formatINRFromPaise(campaign.goalAmountPaise)}
                            </p>
                          </div>
                          <div>
                            <p className="font-bold text-slate-500">Donations</p>
                            <p className="mt-1 font-black text-slate-950">
                              {campaign._count.donations}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-2">
                        <Link
                          href={`/admin/campaigns/${campaign.id}/edit`}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-[16px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-100"
                        >
                          <Edit3 className="h-4 w-4" />
                          Edit
                        </Link>

                        <form action={archiveOrDeleteCampaignAction}>
                          <input
                            type="hidden"
                            name="campaignId"
                            value={campaign.id}
                          />
                          <button
                            type="submit"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-[16px] border border-red-200 bg-white px-4 text-sm font-bold text-red-600 shadow-sm transition hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            {campaign._count.donations > 0
                              ? "Archive"
                              : "Delete"}
                          </button>
                        </form>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <DashboardEmptyState
              title="No campaigns created"
              description="Create your first campaign for education assistance, hostel support, or student sponsorship."
              icon={HeartHandshake}
            />
          )}
        </DashboardPanel>
      </div>
    </DashboardShell>
  );
}