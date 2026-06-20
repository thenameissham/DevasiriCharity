import Link from "next/link";
import {
  AlertCircle,
  ClipboardCheck,
  DollarSign,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Users
} from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardPanel } from "@/components/dashboard/dashboard-panel";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";

function formatINRFromPaise(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value / 100);
}

const reviewStatuses = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "DOCUMENTS_PENDING"
] as const;

export default async function AdminDashboardPage() {
  const session = await requireRole(["ADMIN"]);

  const [
    totalUsers,
    totalCampaigns,
    activeCampaigns,
    totalStudents,
    totalVolunteers,
    totalApplications,
    reviewQueueCount,
    approvedApplications,
    successfulDonations,
    donationAggregate,
    requestedAggregate,
    recentApplications,
    recentCampaigns
  ] = await Promise.all([
    prisma.user.count(),
    prisma.campaign.count(),
    prisma.campaign.count({
      where: {
        status: "ACTIVE"
      }
    }),
    prisma.student.count(),
    prisma.volunteer.count(),
    prisma.studentApplication.count(),
    prisma.studentApplication.count({
      where: {
        status: {
          in: [...reviewStatuses]
        }
      }
    }),
    prisma.studentApplication.count({
      where: {
        status: {
          in: ["APPROVED", "FUNDED", "DISBURSED"]
        }
      }
    }),
    prisma.donation.count({
      where: {
        status: "SUCCESS"
      }
    }),
    prisma.donation.aggregate({
      where: {
        status: "SUCCESS"
      },
      _sum: {
        amountPaise: true
      }
    }),
    prisma.studentApplication.aggregate({
      _sum: {
        requestedAmountPaise: true
      }
    }),
    prisma.studentApplication.findMany({
      orderBy: {
        createdAt: "desc"
      },
      take: 5
    }),
    prisma.campaign.findMany({
      orderBy: {
        createdAt: "desc"
      },
      take: 4
    })
  ]);

  const totalRaised = donationAggregate._sum.amountPaise ?? 0;
  const totalRequested = requestedAggregate._sum.requestedAmountPaise ?? 0;

  return (
    <DashboardShell
      role="ADMIN"
      title="Devasiri Command Center"
      description="A real-time operating view for scholarship applications, campaigns, donors, volunteers, and transparent education support."
      userName={session.user.name ?? session.user.email ?? "Admin"}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Raised"
          value={formatINRFromPaise(totalRaised)}
          description={`${successfulDonations} successful donation records.`}
          icon={DollarSign}
          tone="emerald"
        />

        <DashboardStatCard
          title="Applications"
          value={String(totalApplications)}
          description={`${reviewQueueCount} applications need review.`}
          icon={ClipboardCheck}
          tone="blue"
        />

        <DashboardStatCard
          title="Requested Support"
          value={formatINRFromPaise(totalRequested)}
          description={`${approvedApplications} approved/funded/disbursed records.`}
          icon={GraduationCap}
          tone="amber"
        />

        <DashboardStatCard
          title="Active Campaigns"
          value={String(activeCampaigns)}
          description={`${totalCampaigns} total campaigns created.`}
          icon={HeartHandshake}
          tone="slate"
        />
      </div>

      {reviewQueueCount > 0 ? (
        <div className="mt-6 rounded-[28px] border border-amber-200 bg-amber-50 p-5">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-white text-amber-600 shadow-sm">
              <AlertCircle className="h-6 w-6" />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-black tracking-[-0.04em] text-slate-950">
                {reviewQueueCount} scholarship applications need attention
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-700">
                Review submitted applications, document status, fee gap, and
                district verification before approval.
              </p>

              <Link
                href="/admin/applications"
                className="mt-4 inline-flex items-center gap-2 text-sm font-black text-amber-700"
              >
                Review applications
                <ShieldCheck className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <DashboardPanel
          title="Recent Scholarship Applications"
          description="Latest student applications submitted from the public scholarship flow."
        >
          {recentApplications.length > 0 ? (
            <div className="grid gap-3">
              {recentApplications.map((application) => (
                <Link
                  key={application.id}
                  href={`/admin/applications/${application.id}`}
                  className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 ring-1 ring-blue-100">
                          {application.status}
                        </span>

                        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 ring-1 ring-slate-200">
                          {application.district}
                        </span>
                      </div>

                      <h3 className="mt-3 font-black tracking-[-0.03em] text-slate-950">
                        {application.fullName}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {application.courseType} • {application.collegeName}
                      </p>
                    </div>

                    <p className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">
                      {formatINRFromPaise(application.requestedAmountPaise)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <DashboardEmptyState
              title="No applications yet"
              description="Student scholarship applications will appear here after submission."
              icon={GraduationCap}
            />
          )}
        </DashboardPanel>

        <DashboardPanel
          title="Recent Campaigns"
          description="Newest support campaigns connected to the public platform."
        >
          {recentCampaigns.length > 0 ? (
            <div className="grid gap-3">
              {recentCampaigns.map((campaign) => (
                <Link
                  key={campaign.id}
                  href={`/admin/campaigns/${campaign.id}/edit`}
                  className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-black tracking-[-0.03em] text-slate-950">
                        {campaign.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {campaign.category} • {campaign.status}
                      </p>
                    </div>

                    <p className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                      {formatINRFromPaise(campaign.raisedAmountPaise)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <DashboardEmptyState
              title="No campaigns yet"
              description="Create campaigns to start public donation flows."
              icon={HeartHandshake}
            />
          )}
        </DashboardPanel>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <DashboardPanel title="Platform Users">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-slate-950 text-white">
              <Users className="h-7 w-7" />
            </div>

            <div>
              <p className="text-3xl font-black tracking-[-0.06em] text-slate-950">
                {totalUsers}
              </p>
              <p className="text-sm font-semibold text-slate-600">
                Total registered users
              </p>
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel title="Student Records">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-blue-50 text-blue-600">
              <GraduationCap className="h-7 w-7" />
            </div>

            <div>
              <p className="text-3xl font-black tracking-[-0.06em] text-slate-950">
                {totalStudents}
              </p>
              <p className="text-sm font-semibold text-slate-600">
                Verified student profiles
              </p>
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel title="Volunteer Network">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-emerald-50 text-emerald-600">
              <Users className="h-7 w-7" />
            </div>

            <div>
              <p className="text-3xl font-black tracking-[-0.06em] text-slate-950">
                {totalVolunteers}
              </p>
              <p className="text-sm font-semibold text-slate-600">
                Support and verification volunteers
              </p>
            </div>
          </div>
        </DashboardPanel>
      </div>
    </DashboardShell>
  );
}