import { HeartHandshake, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import { createDonationIntentAction } from "@/features/donations/donation.actions";
import { Button } from "@/components/ui/button";

interface DonationIntentFormProps {
  readonly campaignId: string;
  readonly campaignSlug: string;
  readonly campaignTitle: string;
  readonly errorMessage?: string;
}

const quickAmounts = [500, 1000, 2500, 5000, 10000, 25000] as const;

export function DonationIntentForm({
  campaignId,
  campaignSlug,
  campaignTitle,
  errorMessage
}: DonationIntentFormProps) {
  return (
    <form
      action={createDonationIntentAction}
      className="relative overflow-hidden rounded-[38px] border border-white/70 bg-white/78 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-300/20 blur-3xl"
      />

      <input type="hidden" name="campaignId" value={campaignId} />
      <input type="hidden" name="campaignSlug" value={campaignSlug} />

      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-[20px] bg-blue-600 text-white shadow-[0_16px_40px_rgba(37,99,235,0.24)]">
            <HeartHandshake className="h-6 w-6" />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Secure Support Intent
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-slate-950">
              Support this student campaign.
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your support intent is linked to this verified campaign and will be
              visible to admins for confirmation.
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

        <div className="mt-6">
          <p className="text-sm font-bold text-slate-700">Choose amount</p>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {quickAmounts.map((amount, index) => (
              <label
                key={amount}
                className="group cursor-pointer rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
              >
                <input
                  type="radio"
                  name="amountRupees"
                  value={amount}
                  defaultChecked={index === 1}
                  className="peer sr-only"
                />

                <span className="block text-lg font-black tracking-[-0.04em] text-slate-950 peer-checked:text-blue-700">
                  ₹{amount.toLocaleString("en-IN")}
                </span>

                <span className="mt-1 block text-xs font-bold text-slate-500 peer-checked:text-blue-600">
                  Education support
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <label>
            <span className="text-sm font-bold text-slate-700">Full name</span>
            <div className="relative mt-2">
              <UserRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                name="donorName"
                required
                placeholder="Enter donor name"
                className="h-12 w-full rounded-[18px] border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="text-sm font-bold text-slate-700">Email</span>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  name="donorEmail"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-[18px] border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </label>

            <label>
              <span className="text-sm font-bold text-slate-700">Phone</span>
              <div className="relative mt-2">
                <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  name="donorPhone"
                  required
                  placeholder="10-digit mobile"
                  className="h-12 w-full rounded-[18px] border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </label>
          </div>

          <div className="rounded-[22px] border border-emerald-100 bg-emerald-50/80 p-4">
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <p className="text-sm leading-6 text-emerald-950">
                This creates a pending donation record. Admin verification and
                payment gateway integration can be connected cleanly after this.
              </p>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full rounded-[20px] devasiri-shine">
            Continue Support
            <HeartHandshake className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </form>
  );
}
