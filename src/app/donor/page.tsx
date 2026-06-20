import { DollarSign, FileText, HeartHandshake, ShieldCheck } from "lucide-react";
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

export default async function DonorDashboardPage() {
  const session = await requireRole(["DONOR", "ADMIN"]);

  const donations = await prisma.donation.findMany({
    where: {
      donorEmail: session.user.email ?? ""
    },
    include: {
      campaign: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 5
  });

  const totalDonated = donations
    .filter((donation) => donation.status === "SUCCESS")
    .reduce((sum, donation) => sum + donation.amountPaise, 0);

  return (
    <DashboardShell
      role="DONOR"
      title="Donor Portal"
      description="Track your giving history, receipts, campaign progress, and future tax certificate workflows."
      userName={session.user.name ?? session.user.email ?? "Donor"}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <DashboardStatCard
          title="Total Donated"
          value={formatINRFromPaise(totalDonated)}
          description="Your successful contribution value."
          icon={DollarSign}
          tone="emerald"
        />
        <DashboardStatCard
          title="Donations"
          value={String(donations.length)}
          description="Recent donations linked to your donor email."
          icon={HeartHandshake}
          tone="blue"
        />
        <DashboardStatCard
          title="Receipts"
          value="Ready"
          description="Receipt generation will connect to successful transactions."
          icon={FileText}
          tone="amber"
        />
      </div>

      <div className="mt-6">
        <DashboardPanel
          title="Recent Donations"
          description="Your latest donation activity."
        >
          {donations.length > 0 ? (
            <div className="grid gap-3">
              {donations.map((donation) => (
                <article
                  key={donation.id}
                  className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold tracking-[-0.03em] text-slate-950">
                        {donation.campaign.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {donation.status} • {donation.currency}
                      </p>
                    </div>
                    <p className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      {formatINRFromPaise(donation.amountPaise)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <DashboardEmptyState
              title="No donations yet"
              description="Once you donate, your receipts and campaign tracking will appear here."
              icon={ShieldCheck}
            />
          )}
        </DashboardPanel>
      </div>
    </DashboardShell>
  );
}