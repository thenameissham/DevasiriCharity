import { HeartHandshake, IndianRupee, ShieldCheck } from "lucide-react";
import { createDonationIntentAction } from "@/features/donations/donation.actions";
import { Button } from "@/components/ui/button";

interface DonationIntentFormProps {
  readonly campaignId: string;
  readonly campaignSlug: string;
  readonly campaignTitle: string;
  readonly errorMessage?: string;
}

const quickAmounts = [500, 1000, 2500, 5000, 10000] as const;

export function DonationIntentForm({
  campaignId,
  campaignSlug,
  campaignTitle,
  errorMessage
}: DonationIntentFormProps) {
  return (
    <form
      action={createDonationIntentAction}
      className="rounded-[36px] border border-slate-200 bg-white/86 p-6 shadow-[0_28px_90px_rgba(15,23,42,0.1)] backdrop-blur-2xl"
    >
      <input type="hidden" name="campaignId" value={campaignId} />
      <input type="hidden" name="campaignSlug" value={campaignSlug} />

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-blue-50 text-blue-600">
          <HeartHandshake className="h-6 w-6" />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Donation Intent
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.055em] text-slate-950">
            Support this campaign
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Record your donation intent securely. Payment gateway processing can
            be connected in the next integration phase.
          </p>
        </div>
      </div>

      {errorMessage ? (
        <div className="mt-5 rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div className="mt-6 rounded-[24px] border border-blue-100 bg-blue-50/70 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
          Selected Campaign
        </p>
        <p className="mt-2 text-lg font-black tracking-[-0.04em] text-blue-950">
          {campaignTitle}
        </p>
      </div>

      <div className="mt-6 grid gap-5">
        <label>
          <span className="text-sm font-bold text-slate-700">
            Donation amount ₹
          </span>

          <div className="relative mt-2">
            <IndianRupee className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              name="amountRupees"
              type="number"
              min={100}
              required
              defaultValue={1000}
              className="h-12 w-full rounded-[18px] border border-slate-200 bg-white pl-11 pr-4 text-sm font-bold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </label>

        <div>
          <p className="text-sm font-bold text-slate-700">Quick amount</p>

          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {quickAmounts.map((amount) => (
              <label
                key={amount}
                className="cursor-pointer rounded-[16px] border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <input
                  type="radio"
                  name="amountRupees"
                  value={amount}
                  className="sr-only"
                />
                ₹{amount.toLocaleString("en-IN")}
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label>
            <span className="text-sm font-bold text-slate-700">Full name</span>
            <input
              name="donorName"
              required
              className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Phone</span>
            <input
              name="donorPhone"
              required
              className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        <label>
          <span className="text-sm font-bold text-slate-700">Email</span>
          <input
            name="donorEmail"
            type="email"
            required
            className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label>
          <span className="text-sm font-bold text-slate-700">
            Message / purpose note
          </span>
          <textarea
            name="message"
            rows={4}
            placeholder="Optional message for this campaign"
            className="mt-2 w-full resize-none rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label className="flex items-start gap-3 rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3">
          <input name="isAnonymous" type="checkbox" className="mt-1 h-4 w-4" />
          <span className="text-sm font-semibold leading-6 text-slate-700">
            Show my donation as anonymous in public reporting.
          </span>
        </label>

        <div className="rounded-[22px] border border-emerald-100 bg-emerald-50 p-4">
          <div className="flex gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
            <p className="text-sm leading-6 text-emerald-950">
              This creates a pending donation record connected to the selected
              campaign.
            </p>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Continue Donation
          <HeartHandshake className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}