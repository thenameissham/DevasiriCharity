import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, LockKeyhole } from "lucide-react";
import { StudentApplicationForm } from "@/components/scholarship/student-application-form";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

export const metadata: Metadata = {
  title: "Start Scholarship Application",
  description:
    "Submit an education support application to Devasiri Charitable Trust.",
};

interface ApplyStartPageProps {
  readonly searchParams: Promise<{
    error?: string;
  }>;
}

const applicationSections = [
  "Personal and contact details",
  "Location and academic details",
  "Financial need and existing support",
  "Supporting document links and consent",
] as const;

export default async function ApplyStartPage({
  searchParams,
}: ApplyStartPageProps) {
  const params = await searchParams;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f6f8fa] px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-[#59636e] transition-colors hover:bg-white hover:text-[#24292f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f883d]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to application guidance
          </Link>

          <header className="mt-4 rounded-xl border border-[#d0d7de] bg-white p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#59636e]">
              <span className="rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-3 py-1.5">Student support</span>
              <span aria-hidden="true">·</span>
              <span>Application form</span>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#24292f] sm:text-4xl">
              Tell us about your education support needs.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#59636e]">
              Complete the sections below and submit them together. Your application is not saved until submission succeeds, so keep the required information ready before you begin.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {applicationSections.map((section, index) => (
                <div key={section} className="flex items-start gap-3 rounded-lg border border-[#d0d7de] bg-white p-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f6f8fa] text-xs font-semibold text-[#24292f]">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-sm leading-5 text-[#59636e]">{section}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-lg border border-[#d0d7de] bg-[#f6f8fa] p-4">
              <LockKeyhole aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#59636e]" />
              <p className="text-sm leading-6 text-[#59636e]">
                Enter only accurate details. Do not submit a full Aadhaar number or publicly shared links to sensitive documents. A private document-upload facility is not yet available.
              </p>
            </div>
          </header>

          <section className="mt-5" aria-label="Scholarship application form">
            <StudentApplicationForm errorMessage={params.error} />
          </section>

          <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#59636e]">
            <FileText aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            If you encounter an error, review the message at the top of the form and correct the indicated field before submitting again.
          </p>

          <div className="mt-6 text-center">
            <Link href="/apply" className="text-sm font-semibold text-[#1a7f37] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f883d]">
              Return to eligibility guidance
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
