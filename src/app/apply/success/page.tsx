import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, Info } from "lucide-react";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

export const metadata: Metadata = {
  title: "Application Confirmation",
  description:
    "View the confirmation reference for your Devasiri education support application.",
  robots: { index: false, follow: false },
};

interface ApplySuccessPageProps {
  readonly searchParams: Promise<{
    ref?: string;
  }>;
}

export default async function ApplySuccessPage({
  searchParams,
}: ApplySuccessPageProps) {
  const params = await searchParams;
  const reference = params.ref?.trim();
  const hasReference = Boolean(reference);

  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f6f8fa] px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <section className="w-full max-w-2xl rounded-xl border border-[#d0d7de] bg-white p-6 sm:p-10">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${hasReference ? "bg-[#dafbe1] text-[#1a7f37]" : "bg-[#ddf4ff] text-[#0969da]"}`}>
            {hasReference ? (
              <CheckCircle2 aria-hidden="true" className="h-6 w-6" />
            ) : (
              <Info aria-hidden="true" className="h-6 w-6" />
            )}
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#59636e]">
            Student support
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-[#24292f] sm:text-4xl">
            {hasReference ? "Application received" : "Check your submission status"}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#59636e]">
            {hasReference
              ? "Your application submission returned a reference number. Keep it for future communication. This confirmation does not mean that support has been approved; the application must still be reviewed."
              : "A reference number was not supplied in this page address. This page alone cannot confirm whether an application was submitted. Return to the application form or contact Devasiri for help."}
          </p>

          {hasReference ? (
            <div className="mt-6 rounded-lg border border-[#d0d7de] bg-[#f6f8fa] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#59636e]">
                <ClipboardCheck aria-hidden="true" className="h-4 w-4" />
                Application reference
              </div>
              <p className="mt-3 break-all font-mono text-xl font-semibold tracking-tight text-[#24292f] sm:text-2xl">
                {reference}
              </p>
              <p className="mt-2 text-xs leading-5 text-[#59636e]">Save this reference. It may be needed when asking about your application.</p>
            </div>
          ) : null}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/apply"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#d0d7de] bg-white px-4 py-2.5 text-sm font-semibold text-[#24292f] transition-colors hover:bg-[#f6f8fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f883d]"
            >
              Application guidance
            </Link>
            <Link
              href="/campaigns"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#1a7f37] bg-[#1f883d] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1a7f37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f883d]"
            >
              Explore campaigns <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
