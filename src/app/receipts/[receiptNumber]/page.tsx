import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

interface ReceiptPageProps {
  readonly params: Promise<{
    receiptNumber: string;
  }>;
}

export const metadata: Metadata = {
  title: "Donation Record | Devasiri",
  description: "Check the status of a Devasiri donation record.",
  robots: {
    index: false,
    follow: false,
  },
};

function formatINRFromPaise(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value / 100);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const { receiptNumber } = await params;

  // Select only fields needed by this public lookup. Never load donor contact
  // information into a route that can be opened without authentication.
  const donation = await prisma.donation.findFirst({
    where: { receiptNumber },
    select: {
      amountPaise: true,
      currency: true,
      status: true,
      paymentStatus: true,
      createdAt: true,
      paidAt: true,
      donatedAt: true,
      campaign: {
        select: {
          title: true,
          category: true,
        },
      },
    },
  });

  if (!donation) notFound();

  const isConfirmed =
    donation.status === "SUCCESS" && donation.paymentStatus === "SUCCESS";
  const isRefunded =
    donation.status === "REFUNDED" || donation.paymentStatus === "REFUNDED";
  const isFailed =
    donation.status === "FAILED" ||
    donation.status === "CANCELLED" ||
    donation.paymentStatus === "FAILED" ||
    donation.paymentStatus === "CANCELLED";
  const statusLabel = isConfirmed
    ? "Confirmed donation record"
    : isRefunded
      ? "Refund recorded"
      : isFailed
        ? "Not confirmed"
        : "Pending confirmation";
  const recordDate = donation.paidAt ?? donation.donatedAt ?? donation.createdAt;

  return (
    <main className="min-h-screen px-4 py-10 sm:px-8 sm:py-12 lg:px-12">
      <section className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link href="/" className="text-sm font-semibold text-blue-700 hover:underline">
            Devasiri Charitable Trust
          </Link>
        </div>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Donation record
              </p>
              <h1 className="mt-2 break-all text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                {receiptNumber}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Check the current recorded status of this reference.
              </p>
            </div>

            <div
              className={
                isConfirmed
                  ? "inline-flex shrink-0 items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800"
                  : "inline-flex shrink-0 items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800"
              }
              role="status"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {statusLabel}
            </div>
          </div>

          <dl className="grid gap-3 py-6 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {isConfirmed ? "Recorded amount" : "Intended amount"}
              </dt>
              <dd className="mt-2 text-xl font-semibold text-slate-950">
                {formatINRFromPaise(donation.amountPaise)}
              </dd>
              <dd className="mt-1 text-sm text-slate-600">{donation.currency}</dd>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Campaign
              </dt>
              <dd className="mt-2 text-base font-semibold text-slate-950">
                {donation.campaign.title}
              </dd>
              <dd className="mt-1 text-sm text-slate-600">
                {donation.campaign.category.replaceAll("_", " ")}
              </dd>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Record date
              </dt>
              <dd className="mt-2 text-sm font-medium text-slate-900">
                {formatDate(recordDate)}
              </dd>
            </div>
          </dl>

          <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  {isConfirmed ? "About this record" : "This is not a payment receipt"}
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {isConfirmed
                    ? "Devasiri has marked this donation record as confirmed. This page is a status lookup, not a tax receipt or payment-provider confirmation. Contact the trust for an official receipt."
                    : "This reference does not confirm that money was received. Online payment processing and official receipt generation are separate steps. Please contact the trust if you need help with this record."}
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-6 flex justify-center print:hidden">
          <Button href="/campaigns" variant="secondary">
            View campaigns
          </Button>
        </div>
      </section>
    </main>
  );
}
