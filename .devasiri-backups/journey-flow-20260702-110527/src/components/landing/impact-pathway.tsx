import {
  FileCheck2,
  GraduationCap,
  HandCoins,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { MotionSection } from "@/components/motion/motion-section";
import { SectionHeading } from "@/components/landing/section-heading";

const pathway = [
  {
    step: "01",
    title: "Apply",
    description:
      "Students submit their need through a structured support application.",
    icon: GraduationCap,
  },
  {
    step: "02",
    title: "Review",
    description:
      "The trust evaluates the request and supporting details through human review.",
    icon: FileCheck2,
  },
  {
    step: "03",
    title: "Support",
    description:
      "Approved needs connect to campaigns, sponsorship, or program assistance.",
    icon: HandCoins,
  },
  {
    step: "04",
    title: "Report",
    description:
      "Progress and contribution records remain visible through the platform.",
    icon: ShieldCheck,
  },
] as const;

export function ImpactPathway() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,#f5f9f7_0%,#edf5f1_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-48 top-10 h-[460px] w-[460px] rounded-full bg-emerald-200/28 blur-[115px]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-48 bottom-0 h-[460px] w-[460px] rounded-full bg-amber-200/24 blur-[115px]"
      />

      <MotionSection className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <SectionHeading
            eyebrow="How support moves"
            title="A clear pathway from application to visible action."
            description="The platform keeps the student journey understandable while giving administrators, donors, and volunteers the right operational context."
          />

          <div className="rounded-[30px] border border-white/90 bg-white/80 p-6 shadow-[0_26px_90px_rgba(8,26,28,0.08)] backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[var(--theme-soft)] text-[var(--theme-primary)] ring-1 ring-[var(--theme-ring)]">
                <Workflow className="h-6 w-6" />
              </div>

              <div>
                <p className="font-headline text-2xl font-extrabold tracking-[-0.04em] text-[var(--theme-ink)]">
                  Simple for students. Accountable for the trust.
                </p>

                <p className="mt-2 text-sm leading-7 text-[#526567]">
                  Each stage has a visible purpose: application, human review,
                  responsible support, and documented follow-through.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-11 hidden h-px bg-gradient-to-r from-transparent via-[var(--theme-primary)]/30 to-transparent lg:block"
          />

          <div className="grid gap-5 lg:grid-cols-4">
            {pathway.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.step}
                  className="group relative overflow-hidden rounded-[30px] border border-white/90 bg-white/86 p-6 shadow-[0_24px_80px_rgba(8,26,28,0.075)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_100px_rgba(8,26,28,0.12)]"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--theme-primary),#3cb39d,var(--theme-accent))]"
                  />

                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--theme-soft)] text-[var(--theme-primary)] ring-1 ring-[var(--theme-ring)] transition duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <h3 className="font-headline text-2xl font-extrabold tracking-[-0.04em] text-[var(--theme-ink)]">
                      {item.title}
                    </h3>

                    <span className="rounded-full bg-[#f3f7f5] px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-[var(--theme-primary)] ring-1 ring-[var(--theme-border)]">
                      {item.step}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#526567]">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </MotionSection>
    </section>
  );
}
