import Link from "next/link";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DonationSuccessPageProps {
  readonly searchParams: Promise<{
    ref?: string;
  }>;
}

export default async function DonationSuccessPage({
  searchParams
}: DonationSuccessPageProps) {
  const params = await searchParams;
  const reference = params.ref ?? "Donation intent recorded";

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <section className="glass-card w-full max-w-xl rounded-[36px] p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h1 className="mt-6 text-4xl font-black tracking-[-0.065em] text-slate-950">
          Donation intent recorded
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Your donation record has been created as pending. Payment gateway,
          receipt generation, and verification will be connected in the next
          phase.
        </p>

        <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Reference Number
          </p>
          <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950">
            {reference}
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/campaigns">
            View Campaigns
            <HeartHandshake className="h-5 w-5" />
          </Button>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-[16px] border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}