import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApplySuccessPageProps {
  readonly searchParams: Promise<{
    ref?: string;
  }>;
}

export default async function ApplySuccessPage({
  searchParams
}: ApplySuccessPageProps) {
  const params = await searchParams;
  const reference = params.ref ?? "Application submitted";

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <section className="glass-card w-full max-w-xl rounded-[36px] p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h1 className="mt-6 text-4xl font-black tracking-[-0.065em] text-slate-950">
          Application submitted
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Your scholarship application has been recorded. Please save this
          reference number for future communication.
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
          <Button href="/">Back to home</Button>

          <Link
            href="/campaigns"
            className="inline-flex h-11 items-center justify-center rounded-[16px] border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm"
          >
            View campaigns
          </Link>
        </div>
      </section>
    </main>
  );
}