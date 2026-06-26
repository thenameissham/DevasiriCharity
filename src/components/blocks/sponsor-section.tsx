import {
  ArrowRight,
  GraduationCap,
  HeartHandshake,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingIllustration } from "@/components/ui/floating-illustration";

export function SponsorSection() {
  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-y-8 right-0 w-1/2 rounded-l-full bg-cyan-100/30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Student Sponsorship
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.065em] text-slate-950 sm:text-5xl">
            Turn giving into a clear student support journey.
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
            Sponsors can help verified students cover fee gaps, books,
            hostel needs, exam fees, or learning continuity with transparent
            progress updates.
          </p>

          <div className="mt-6 grid gap-3">
            {[
              {
                icon: GraduationCap,
                label: "Support professional degree students"
              },
              {
                icon: ShieldCheck,
                label: "Verified applications and documents"
              },
              {
                icon: HeartHandshake,
                label: "Campaign-based transparent giving"
              }
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-white/70 px-4 py-3 text-sm font-bold text-slate-700 backdrop-blur-xl"
                >
                  <Icon className="h-5 w-5 text-blue-600" />
                  {item.label}
                </div>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/campaigns" size="lg">
              Sponsor a Student
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button href="/apply" variant="secondary" size="lg">
              Check Student Eligibility
            </Button>
          </div>
        </div>

        <FloatingIllustration
          src="/illustrations/campaign-education-support.png"
          alt="Campaign education support illustration"
          className="mx-auto max-w-[760px]"
        />
      </div>
    </section>
  );
}