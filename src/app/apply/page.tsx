import type { Metadata } from "next";
import { ArrowRight, ClipboardCheck, GraduationCap, ShieldCheck } from "lucide-react";
import { EligibilityScreener } from "@/components/scholarship/eligibility-screener";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

export const metadata: Metadata = {
  title: "Apply for Scholarship",
  description:
    "Review the education support application guidance and check your readiness to apply through Devasiri Charitable Trust.",
};

const preparationItems = [
  "Admission or college identity proof",
  "Current fee structure or fee demand letter",
  "Income certificate or other financial-need evidence",
  "Details of other scholarships or support, if any",
  "Academic records such as marks, rank, USN, or registration number",
] as const;

export default function ApplyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#d0d7de] bg-[#f6f8fa] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#59636e]">
              <GraduationCap aria-hidden="true" className="h-3.5 w-3.5" /> Education support
            </p>
            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#24292f] sm:text-4xl lg:text-5xl">
              Help your education continue.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#59636e] sm:text-lg">
              Review the information you may need, check your application readiness, and take the next step when you are prepared.
            </p>
          </header>

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)] lg:gap-6">
            <aside className="space-y-4">
              <section className="rounded-xl border border-[#d0d7de] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dafbe1] text-[#1a7f37]">
                    <ClipboardCheck aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-semibold tracking-tight text-[#24292f]">Prepare before you apply</h2>
                </div>
                <ul className="mt-5 space-y-3">
                  {preparationItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-[#59636e]">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1f883d]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-xl border border-[#d0d7de] bg-[#f6f8fa] p-5 sm:p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#24292f]">
                  <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#1f883d]" />
                  Your information matters
                </div>
                <p className="mt-2 text-sm leading-6 text-[#59636e]">
                  Provide only information needed to review your request. Do not enter a full Aadhaar number or use publicly accessible links for sensitive documents. The current form does not provide private file uploads.
                </p>
                <a href="#eligibility-check" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1a7f37] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f883d]">
                  Check application readiness <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </section>
            </aside>

            <div id="eligibility-check" className="min-w-0 scroll-mt-28">
              <EligibilityScreener />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

