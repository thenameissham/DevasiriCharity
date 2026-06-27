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
    month: "long",
    year: "numeric"
  }).format(date);
}

export const metadata: Metadata = {
  title: "Donation Receipt",
  description: "Devasiri donation receipt verification page."
};

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const routeParams = await params;

  const donation = await prisma.donation.findFirst({
    where: {
      receiptNumber: routeParams.receiptNumber
    },
    include: {
      campaign: true
    }
  });

  if (!donation) {
    notFound();
  }

  const isVerified = donation.status === "SUCCESS";

  return (
    <main className="min-h-screen px-6 py-12 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link href="/" className="text-sm font-black text-blue-700">
            Devasiri Charitable Trust
          </Link>
        </div>

        <article className="rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_28px_90px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-6 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Donation Receipt
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-[-0.065em] text-slate-950">
                {donation.receiptNumber}
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Receipt generated for Devasiri Charitable Trust campaign support.
              </p>
            </div>

            <div
              className={
                isVerified
                  ? "rounded-[22px] bg-emerald-50 px-5 py-4 text-emerald-700"
                  : "rounded-[22px] bg-amber-50 px-5 py-4 text-amber-700"
              }
            >
              <div className="flex items-center gap-2 text-sm font-black">
                <CheckCircle2 className="h-5 w-5" />
                {isVerified ? "Verified Donation" : "Pending Verification"}
              </div>
            </div>
          </div>

          <div className="grid gap-5 py-8 sm:grid-cols-2">
            <div className="rounded-[24px] bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Donor
              </p>
              <p className="mt-2 text-lg font-black text-slate-950">
                {donation.donorName}
              </p>
              <p className="mt-1 text-sm text-slate-600">{donation.donorEmail}</p>
            </div>

            <div className="rounded-[24px] bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Amount
              </p>
              <p className="mt-2 text-lg font-black text-slate-950">
                {formatINRFromPaise(donation.amountPaise)}
              </p>
              <p className="mt-1 text-sm text-slate-600">{donation.currency}</p>
            </div>

            <div className="rounded-[24px] bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Campaign
              </p>
              <p className="mt-2 text-lg font-black text-slate-950">
                {donation.campaign.title}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {donation.campaign.category}
              </p>
            </div>

            <div className="rounded-[24px] bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Record Date
              </p>
              <p className="mt-2 text-lg font-black text-slate-950">
                {formatDate(donation.updatedAt)}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Status: {donation.status}
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-blue-100 bg-blue-50 p-5">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-white text-blue-600">
                <HeartHandshake className="h-6 w-6" />
              </div>

              <p className="text-sm leading-6 text-blue-950/80">
                This page verifies that the donation record exists in the
                Devasiri platform. Final tax receipt format, 80G fields, digital
                signature, and PDF download can be added after legal details are
                finalized.
              </p>
            </div>
          </div>
        </article>

        <div className="mt-8 flex justify-center print:hidden">
          <Button href="/campaigns" variant="secondary">
            View More Campaigns
          </Button>
        </div>
      </section>
    </main>
  );
}
