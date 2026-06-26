import {
  ArrowRight,
  BadgeIndianRupee,
  FileCheck2,
  GraduationCap,
  Landmark,
  MapPinned
} from "lucide-react";
import { Button } from "@/components/ui/button";

const requirements = [
  {
    title: "Professional degree student",
    text: "Engineering, Medical, Law, Pharmacy, Nursing, Management, or similar courses.",
    icon: GraduationCap
  },
  {
    title: "Karnataka-based verification",
    text: "District, college, and local verification details are collected during application.",
    icon: MapPinned
  },
  {
    title: "Academic documents",
    text: "Rank, college admission, semester/year, fee structure, and marks proof.",
    icon: FileCheck2
  },
  {
    title: "Financial need proof",
    text: "Income certificate, fee gap, and existing scholarship benefit details.",
    icon: BadgeIndianRupee
  }
] as const;

export function ScholarshipEntry() {
  return (
    <section className="px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Student Scholarship Track
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-5xl">
              A cleaner path for students who need education support.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              The platform is being structured around real student applications,
              transparent verification, and donor-backed scholarship assistance
              instead of generic donation-only messaging.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/apply" size="lg">
                Check Eligibility
                <ArrowRight className="h-5 w-5" />
              </Button>

              <Button href="/student" variant="secondary" size="lg">
                Student Portal
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {requirements.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-slate-200 bg-white/82 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-blue-50 text-blue-600">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-black tracking-[-0.04em] text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-blue-100 bg-blue-50/70 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-white text-blue-600 shadow-sm">
              <Landmark aria-hidden="true" className="h-5 w-5" />
            </div>

            <p className="text-sm leading-6 text-blue-950">
              The application flow will collect whether the student already
              receives SSP, Vidyasiri, college concession, or any other support,
              so Devasiri can prioritize the unmet fee gap responsibly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}