import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { BrandBackground } from "@/components/landing/brand-background";
import { MotionSection } from "@/components/motion/motion-section";
import { RevealText } from "@/components/motion/reveal-text";
import { Button } from "@/components/ui/button";
import { FloatingIllustration } from "@/components/ui/floating-illustration";

const proofPoints = [
  "Student-first application",
  "Human verification",
  "Traceable support records",
] as const;

const journey = [
  { label: "Apply", icon: GraduationCap },
  { label: "Review", icon: FileCheck2 },
  { label: "Support", icon: HandCoins },
  { label: "Report", icon: ShieldCheck },
] as const;

export function VideoHero() {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:min-h-[930px] lg:px-12 lg:pb-28 lg:pt-40">
      <BrandBackground />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-24 h-px w-[min(1120px,88vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--theme-primary)]/20 to-transparent"
      />

      <MotionSection className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="relative z-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-white/72 px-4 py-2 text-sm font-extrabold text-[var(--theme-primary)] shadow-[0_14px_40px_rgba(8,26,28,0.07)] backdrop-blur-2xl">
            <Sparkles className="h-4 w-4 text-[var(--theme-accent)]" />
            Devasiri Charitable Trust
          </div>

          <RevealText
            as="h1"
            text="Keeping education in motion when financial barriers stand in the way."
            className="font-headline text-balance mt-7 max-w-4xl text-[3.4rem] font-extrabold leading-[0.95] tracking-[-0.072em] text-[var(--theme-ink)] sm:text-[4.7rem] lg:text-[5.45rem]"
          />

          <p className="mt-7 max-w-xl text-base leading-8 text-[#526567] sm:text-lg">
            We connect verified students, responsible supporters, committed
            volunteers, and accountable administrators in one transparent
            education-support system—from application to visible outcome.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              href="/apply"
              size="lg"
              className="group relative h-14 overflow-hidden rounded-full px-8 text-base"
            >
              <span className="absolute -left-10 top-0 h-full w-10 rotate-[16deg] bg-white/25 blur-md transition-all duration-700 group-hover:left-[120%]" />
              <span className="relative inline-flex items-center gap-2">
                Check your eligibility
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Button>

            <Button
              href="/campaigns"
              variant="secondary"
              size="lg"
              className="h-14 rounded-full border-[var(--theme-border)] bg-white/72 px-8 text-base backdrop-blur-xl"
            >
              Explore verified campaigns
            </Button>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-2.5 rounded-[20px] border border-white/80 bg-white/58 px-4 py-3 text-sm font-bold leading-5 text-[#294345] shadow-[0_16px_42px_rgba(8,26,28,0.055)] backdrop-blur-xl"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--theme-primary)]" />
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[760px]">
          <div
            aria-hidden="true"
            className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.18),rgba(197,138,42,0.1)_40%,transparent_70%)] blur-3xl"
          />

          <div className="relative overflow-hidden rounded-[42px] border border-white/75 bg-[linear-gradient(155deg,rgba(255,255,255,0.8),rgba(243,249,246,0.84)_55%,rgba(255,248,232,0.8))] p-5 shadow-[0_50px_150px_rgba(8,26,28,0.18)] backdrop-blur-3xl sm:p-6">
            <div className="brand-grid absolute inset-0 opacity-45" />

            <div className="relative overflow-hidden rounded-[34px] border border-white/75 bg-[linear-gradient(160deg,#ecf7f2_0%,#f8fbf7_48%,#fff7e7_100%)] p-5 sm:p-7">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#dff1ea]/70 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute -right-8 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.18),transparent_68%)] blur-2xl"
              />
              <div
                aria-hidden="true"
                className="absolute -left-10 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.16),transparent_68%)] blur-2xl"
              />

              <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--theme-primary)]">
                    The Devasiri support loop
                  </p>
                  <h2 className="font-headline mt-2 text-2xl font-extrabold tracking-[-0.045em] text-[var(--theme-ink)] sm:text-3xl">
                    Need becomes accountable impact.
                  </h2>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-[#fff8ea]/90 px-4 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-[#b66c18] shadow-sm backdrop-blur-xl">
                  <Sparkles className="h-3.5 w-3.5" />
                  Built for continuity
                </div>
              </div>

              <div className="relative mt-5 min-h-[360px] overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,rgba(233,246,240,0.88),rgba(255,251,239,0.88))] sm:min-h-[430px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.72),transparent_34%),radial-gradient(circle_at_40%_84%,rgba(16,185,129,0.08),transparent_38%)]"
                />

                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/76 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--theme-primary)] shadow-sm backdrop-blur-xl">
                  <HeartHandshake className="h-3.5 w-3.5 text-[var(--theme-accent)]" />
                  Education · Hostel · Guidance
                </div>

                <FloatingIllustration
                  src="/illustrations/student-scholarship-hero.png"
                  alt="Student receiving education support through Devasiri"
                  priority
                  className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[600px]"
                />

                <div className="absolute bottom-5 left-5 right-5 rounded-[22px] border border-[#0f2f31]/12 bg-[#062123]/92 p-4 text-white shadow-[0_20px_60px_rgba(8,26,28,0.24)] backdrop-blur-xl sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-emerald-400/12 text-emerald-300">
                        <Workflow className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#9ce5d8]">
                          Trust pathway
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white/82">
                          Structured support that stays clear, respectful, and reviewable.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {journey.map((item, index) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.label}
                            className="rounded-[16px] border border-white/10 bg-white/[0.06] px-3 py-2.5 text-center"
                          >
                            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white text-[var(--theme-primary)] shadow-sm">
                              <Icon className="h-4 w-4" />
                            </div>
                            <p className="mt-2 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-white/58">
                              0{index + 1}
                            </p>
                            <p className="text-xs font-bold text-white">
                              {item.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
    </section>
  );
}
