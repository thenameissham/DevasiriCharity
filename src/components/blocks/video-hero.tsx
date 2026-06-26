import {
  ArrowRight,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingIllustration } from "@/components/ui/floating-illustration";

export function VideoHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-12 pt-32 sm:px-8 sm:pt-36 lg:px-12 lg:pb-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_12%_4%,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(6,182,212,0.1),transparent_28%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm backdrop-blur-xl">
            <GraduationCap className="h-4 w-4" />
            Karnataka professional degree scholarship support
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.075em] text-slate-950 sm:text-6xl lg:text-7xl">
            Education support for students who cannot afford to stop.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Devasiri helps verified students pursuing Engineering, Medical,
            Law, Pharmacy, Nursing, and Management courses continue their
            education with dignity and transparent support.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/apply" size="lg">
              Check Scholarship Eligibility
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button href="/campaigns" variant="secondary" size="lg">
              Support a Student Campaign
              <HeartHandshake className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Apply", icon: GraduationCap },
              { label: "Verify", icon: FileCheck2 },
              { label: "Support", icon: ShieldCheck }
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-[18px] border border-slate-200 bg-white/68 px-4 py-3 text-sm font-bold text-slate-700 backdrop-blur-xl"
                >
                  <Icon className="h-4 w-4 text-blue-600" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[360px] lg:min-h-[560px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100/70 via-cyan-100/40 to-transparent blur-3xl"
          />

          <FloatingIllustration
            src="/illustrations/student-scholarship-hero.png"
            alt="Student receiving scholarship support"
            priority
            className="relative z-10 mx-auto max-w-[720px] lg:max-w-[820px]"
          />
        </div>
      </div>
    </section>
  );
}