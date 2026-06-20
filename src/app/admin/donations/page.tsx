import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  HeartHandshake,
  IndianRupee
} from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardPanel } from "@/components/dashboard/dashboard-panel";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";

interface AdminDonationsPageProps {
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

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

export default async function AdminDonationsPage({
  searchParams
}: AdminDonationsPageProps) {
  const session = await requireRole(["ADMIN"]);
  const params = await searchParams;

  const [
    donations,
    pendingCount,
    successCount,
    failedCount,
    successfulAggregate
  ] = await Promise.all([
    prisma.donation.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        campaign: true
      },
      take: 100
    }),
    prisma.donation.count({
      where: {
        status: "PENDING"
      }
    }),
    prisma.donation.count({
      where: {
        status: "SUCCESS"
      }
    }),
    prisma.donation.count({
      where: {
        status: "FAILED"
      }
    }),
    prisma.donation.aggregate({
      where: {
        status: "SUCCESS"
      },
      _sum: {
        amountPaise: true
      }
    })
  ]);

  return (
    <DashboardShell
      role="ADMIN"
      title="Donation Verification"
      description="Review donation intents, verify successful contributions, mark failed records, and generate receipt links."
      userName={session.user.name ?? session.user.email ?? "Admin"}
    >
      {params.error ? (
        <div className="mb-6 rounded-[20px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {decodeURIComponent(params.error)}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-4">
        <DashboardStatCard
          title="Pending"
          value={String(pendingCount)}
          description="Donation intents waiting for admin verification."
          icon={AlertCircle}
          tone="amber"
        />

        <DashboardStatCard
          title="Successful"
          value={String(successCount)}
          description="Verified donations counted toward campaigns."
          icon={CheckCircle2}
          tone="emerald"
        />

        <DashboardStatCard
          title="Failed"
          value={String(failedCount)}
          description="Donation attempts marked as failed."
          icon={FileText}
          tone="rose"
        />

        <DashboardStatCard
          title="Verified Raised"
          value={formatINRFromPaise(successfulAggregate._sum.amountPaise ?? 0)}
          description="Total value of successful donations."
          icon={IndianRupee}
          tone="blue"
        />
      </div>

      <div className="mt-6">
        <DashboardPanel
          title="Donation Records"
          description="Newest donation records are shown first."
        >
          {donations.length > 0 ? (
            <div className="grid gap-4">
              {donations.map((donation) => (
                <Link
                  key={donation.id}
                  href={`/admin/donations/${donation.id}`}
                  className="block rounded-[26px] border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 ring-1 ring-blue-100">
                          {donation.status}
                        </span>

                        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 ring-1 ring-slate-200">
                          {donation.receiptNumber ?? "No receipt"}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-black tracking-[-0.045em] text-slate-950">
                        {donation.isAnonymous
                          ? "Anonymous Donor"
                          : donation.donorName}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {donation.campaign.title}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {donation.donorEmail} • {formatDate(donation.createdAt)}
                      </p>
                    </div>

                    <div className="text-left lg:text-right">
                      <p className="text-sm font-bold text-slate-500">Amount</p>
                      <p className="mt-1 text-2xl font-black tracking-[-0.05em] text-slate-950">
                        {formatINRFromPaise(donation.amountPaise)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <DashboardEmptyState
              title="No donations yet"
              description="Donation intents from campaign pages will appear here."
              icon={HeartHandshake}
            />
          )}
        </DashboardPanel>
      </div>
    </DashboardShell>
  );
}