import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ExternalLink, XCircle } from "lucide-react";
import { reviewDonationAction } from "@/features/donations/donation-admin.actions";
import { DashboardPanel } from "@/components/dashboard/dashboard-panel";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";

interface AdminDonationDetailPageProps {
  readonly params: Promise<{
    donationId: string;
  }>;
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

function formatDateTime(date: Date | null): string {
  if (!date) return "Not recorded";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function Row({
  label,
  value
}: {
  readonly label: string;
  readonly value: ReactNode;
}) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
        {label}
      </p>
      <div className="mt-2 text-sm font-semibold leading-6 text-slate-800">
        {value || "Not provided"}
      </div>
    </div>
  );
}

export default async function AdminDonationDetailPage({
  params,
  searchParams
}: AdminDonationDetailPageProps) {
  const session = await requireRole(["ADMIN"]);
  const routeParams = await params;
  const query = await searchParams;

  const donation = await prisma.donation.findUnique({
    where: {
      id: routeParams.donationId
    },
    include: {
      campaign: true
    }
  });

  if (!donation) {
    notFound();
  }

  const canReview = donation.status === "PENDING";

  return (
    <DashboardShell
      role="ADMIN"
      title="Donation Review"
      description="Verify donation intent, update donation status, and access receipt reference."
      userName={session.user.name ?? session.user.email ?? "Admin"}
    >
      <Link
        href="/admin/donations"
        className="mb-6 inline-flex items-center gap-2 rounded-[16px] border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to donations
      </Link>

      {query.error ? (
        <div className="mb-6 rounded-[20px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {decodeURIComponent(query.error)}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="grid gap-6">
          <DashboardPanel
            title="Donation Information"
            description={donation.receiptNumber ?? "Receipt number not generated"}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Row label="Donor Name" value={donation.donorName} />
              <Row label="Donor Email" value={donation.donorEmail} />
              <Row label="Donor Phone" value={donation.donorPhone ?? "Not provided"} />
              <Row label="Amount" value={formatINRFromPaise(donation.amountPaise)} />
              <Row label="Currency" value={donation.currency} />
              <Row label="Donation Status" value={donation.status} />
              <Row label="Receipt Number" value={donation.receiptNumber ?? "Not generated"} />
              <Row label="Created At" value={formatDateTime(donation.createdAt)} />
              <Row label="Last Updated" value={formatDateTime(donation.updatedAt)} />
              <Row label="Campaign" value={donation.campaign.title} />
            </div>
          </DashboardPanel>

          <DashboardPanel title="Receipt Access">
            {donation.receiptNumber ? (
              <Link
                href={`/receipts/${donation.receiptNumber}`}
                target="_blank"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[16px] bg-blue-600 px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)] transition hover:bg-blue-700"
              >
                Open Receipt Page
                <ExternalLink className="h-4 w-4" />
              </Link>
            ) : (
              <p className="text-sm leading-6 text-slate-600">
                Receipt number is not available for this donation.
              </p>
            )}
          </DashboardPanel>
        </div>

        <aside>
          <DashboardPanel
            title="Admin Verification"
            description={
              canReview
                ? "Mark the donation after confirming payment externally."
                : "This donation has already been reviewed."
            }
          >
            <form action={reviewDonationAction} className="grid gap-4">
              <input type="hidden" name="donationId" value={donation.id} />

              <label>
                <span className="text-sm font-bold text-slate-700">
                  Admin notes
                </span>
                <textarea
                  name="adminNotes"
                  rows={5}
                  disabled={!canReview}
                  placeholder="Optional note. Stored in audit log."
                  className="mt-2 w-full rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 disabled:bg-slate-100"
                />
              </label>

              {canReview ? (
                <div className="grid gap-3">
                  <button
                    type="submit"
                    name="action"
                    value="MARK_SUCCESS"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-emerald-600 px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(16,185,129,0.22)] transition hover:bg-emerald-700"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    Mark Successful
                  </button>

                  <button
                    type="submit"
                    name="action"
                    value="MARK_FAILED"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] border border-red-200 bg-red-50 px-5 text-sm font-black text-red-700 transition hover:bg-red-100"
                  >
                    <XCircle className="h-5 w-5" />
                    Mark Failed
                  </button>
                </div>
              ) : (
                <Button href="/admin/donations" variant="secondary">
                  Back to Donation List
                </Button>
              )}
            </form>
          </DashboardPanel>
        </aside>
      </div>
    </DashboardShell>
  );
}
