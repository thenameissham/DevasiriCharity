"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { donationTiers } from "@/data/home";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export function DonationWidget() {
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState<string>("");

  const activeAmount = useMemo(() => {
    const parsed = Number(customAmount);

    return customAmount.trim().length > 0 && Number.isFinite(parsed) && parsed > 0
      ? parsed
      : selectedAmount;
  }, [customAmount, selectedAmount]);

  return (
    <section
      id="donate"
      className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white sm:px-8 lg:px-12"
    >
      <div aria-hidden="true" className="kaggle-grid absolute inset-0 opacity-20" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.42),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(6,182,212,0.28),transparent_26%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-200 backdrop-blur-xl">
            <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            Secure donation experience
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
            Choose a giving tier. Create visible student impact.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-6 text-white/68">
            Every contribution is designed to connect with education assistance,
            hostel support, sponsorship milestones, and transparent reporting.
          </p>

          <div className="mt-8 grid gap-3">
            {[
              "Verified student support categories",
              "Transparent campaign-wise usage tracking",
              "Receipt and donor history ready for dashboard flow"
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm font-medium text-white/78"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="h-5 w-5 text-emerald-300"
                />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/10 p-4 shadow-[0_32px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-6">
          <div className="rounded-[28px] bg-white p-5 text-slate-950 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                  Donation Tiers
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.045em]">
                  Select amount
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-blue-50 text-blue-600">
                <Heart aria-hidden="true" className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {donationTiers.map((tier) => {
                const isActive =
                  selectedAmount === tier.amount && customAmount.length === 0;

                return (
                  <button
                    key={tier.name}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setSelectedAmount(tier.amount);
                      setCustomAmount("");
                    }}
                    className={cn(
                      "rounded-[22px] border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue-500",
                      isActive
                        ? "border-blue-300 bg-blue-50 shadow-[0_14px_36px_rgba(37,99,235,0.14)]"
                        : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-bold text-slate-950">{tier.name}</p>
                      {isActive ? (
                        <Sparkles
                          aria-hidden="true"
                          className="h-4 w-4 text-blue-600"
                        />
                      ) : null}
                    </div>

                    <p className="mt-2 text-2xl font-black tracking-[-0.05em] text-slate-950">
                      {formatINR(tier.amount)}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {tier.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-slate-700">
                Custom amount
              </span>
              <input
                type="number"
                min={100}
                inputMode="numeric"
                value={customAmount}
                onChange={(event) => setCustomAmount(event.target.value)}
                placeholder="Enter custom amount"
                className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">
                Selected contribution
              </p>
              <p className="mt-1 text-4xl font-black tracking-[-0.06em] text-slate-950">
                {formatINR(activeAmount)}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Payment gateway integration will connect this amount to Razorpay
                order creation and donation records in the backend phase.
              </p>
            </div>

            <Button type="button" className="mt-5 w-full" size="lg">
              Continue securely
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}