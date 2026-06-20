import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { StudentApplicationForm } from "@/components/scholarship/student-application-form";

export const metadata: Metadata = {
  title: "Start Scholarship Application",
  description:
    "Submit a professional degree scholarship application to Devasiri Charitable Trust."
};

interface ApplyStartPageProps {
  readonly searchParams: Promise<{
    error?: string;
  }>;
}

export default async function ApplyStartPage({
  searchParams
}: ApplyStartPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen px-6 pb-20 pt-24 sm:px-8 sm:pt-28 lg:px-12">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-[32px] border border-white/40 bg-white/78 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="flex items-center"
              aria-label="Devasiri home"
            >
              <Image
                src="/brand/devasiri-logo.png"
                alt="Devasiri Charitable Trust"
                width={220}
                height={72}
                priority
                className="h-12 w-auto object-contain sm:h-14"
              />
            </Link>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[16px] border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Go back to home
              </Link>

              <Link
                href="/apply/start"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[16px] bg-slate-950 px-5 text-sm font-bold text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition hover:bg-slate-800"
              >
                <RotateCcw className="h-4 w-4" />
                Reset form
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Scholarship Application
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.075em] text-slate-950 sm:text-5xl lg:text-6xl">
            Submit your education support request.
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600">
            This form collects academic, financial, and verification details for
            professional degree scholarship support in Karnataka.
          </p>
        </div>

        <StudentApplicationForm
          errorMessage={
            params.error ? decodeURIComponent(params.error) : undefined
          }
        />
      </section>
    </main>
  );
}