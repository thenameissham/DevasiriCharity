import type { Metadata } from "next";
import { EligibilityScreener } from "@/components/scholarship/eligibility-screener";

export const metadata: Metadata = {
  title: "Apply for Scholarship",
  description:
    "Check scholarship readiness and apply for professional degree education support through Devasiri Charitable Trust."
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen px-6 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-12">
      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Apply for Scholarship
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-[-0.075em] text-slate-950 sm:text-6xl">
            Professional education support for verified students.
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600">
            This application path is for students pursuing professional degrees
            in Karnataka who need support for college fees, exam fees, hostel
            needs, or education continuity.
          </p>

          <div className="mt-7 rounded-[28px] border border-blue-100 bg-blue-50/80 p-5">
            <p className="text-sm font-bold text-blue-950">
              Before applying, keep these ready:
            </p>

            <ul className="mt-3 grid gap-2 text-sm leading-6 text-blue-950/80">
              <li>• Admission or college identity proof</li>
              <li>• Current fee structure or fee demand letter</li>
              <li>• Income certificate or financial need proof</li>
              <li>• Existing scholarship details, if any</li>
              <li>• Academic records such as marks, rank, USN, or registration number</li>
            </ul>
          </div>
        </div>

        <EligibilityScreener />
      </section>
    </main>
  );
}