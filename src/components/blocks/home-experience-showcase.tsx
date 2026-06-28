import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileSearch,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGlassCard } from "@/components/motion/animated-glass-card";
import { MotionSection } from "@/components/motion/motion-section";
import { RevealText } from "@/components/motion/reveal-text";

const journey = [
  {
    title: "Students enter gently",
    description:
      "A guided scholarship path reduces fear and helps students explain their need clearly.",
    icon: GraduationCap
  },
  {
    title: "Records become verifiable",
    description:
      "The team can review identity, education, support need, and campaign readiness without chaos.",
    icon: FileSearch
  },
  {
    title: "Donors see purpose",
    description:
      "Support campaigns feel human, structured, and trustworthy instead of random donation boxes.",
    icon: HeartHandshake
  },
  {
    title: "Impact stays visible",
    description:
      "Donation records, progress, receipts, and outcomes remain connected to the support journey.",
    icon: BarChart3
  }
] as const;

export function HomeExperienceShowcase() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_48%,#ffffff_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute left-[-220px] top-24 h-[620px] w-[620px] rounded-full bg-blue-300/18 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-220px] bottom-24 h-[620px] w-[620px] rounded-full bg-cyan-300/18 blur-[110px]"
      />

      <MotionSection className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">
              <Sparkles className="h-4 w-4" />
              Platform experience
            </div>

            <RevealText
              as="h2"
              text="A trust-first operating system for education support."
              className="mt-5 max-w-4xl text-4xl font-black leading-[0.96] tracking-[-0.08em] text-slate-950 sm:text-5xl lg:text-7xl"
            />
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-600">
            Devasiri should feel bigger than a website. It should feel like a
            calm, premium support engine where every role understands what to do
            next.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {journey.map((item, index) => {
              const Icon = item.icon;

              return (
                <AnimatedGlassCard
                  key={item.title}
                  className="min-h-[270px] rounded-[36px] p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-blue-600 text-white shadow-[0_18px_45px_rgba(37,99,235,0.24)]">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="text-6xl font-black tracking-[-0.1em] text-slate-100">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-black tracking-[-0.06em] text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </AnimatedGlassCard>
              );
            })}
          </div>

          <div className="relative overflow-hidden rounded-[44px] border border-white/80 bg-slate-950 p-7 text-white shadow-[0_40px_130px_rgba(15,23,42,0.25)]">
            <div
              aria-hidden="true"
              className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-cyan-100 ring-1 ring-white/10">
                <ShieldCheck className="h-4 w-4" />
                High-trust journey
              </div>

              <h3 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.08em] sm:text-5xl">
                The interface should make the mission feel tall.
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/68">
                This experience uses visual depth, calm movement, clear role
                pathways, and emotional warmth without touching core backend
                functionality.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  "Student journey feels guided, not transactional",
                  "Donor flow feels transparent and accountable",
                  "Admin workflow stays trustworthy and structured",
                  "Motion supports clarity instead of distracting users"
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[20px] bg-white/8 px-4 py-3 text-sm font-bold text-white/86 ring-1 ring-white/10"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/apply" size="lg" className="rounded-[22px]">
                  Start Application
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <Button
                  href="/campaigns"
                  variant="secondary"
                  size="lg"
                  className="rounded-[22px] border-white/20 bg-white/10 text-white hover:bg-white/15"
                >
                  View Campaigns
                </Button>
              </div>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[28px] bg-white/8 p-5 ring-1 ring-white/10">
                  <UsersRound className="h-6 w-6 text-cyan-300" />
                  <p className="mt-4 text-3xl font-black tracking-[-0.07em]">
                    4 Roles
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white/55">
                    Student, donor, volunteer, admin
                  </p>
                </div>

                <div className="rounded-[28px] bg-white/8 p-5 ring-1 ring-white/10">
                  <HeartHandshake className="h-6 w-6 text-emerald-300" />
                  <p className="mt-4 text-3xl font-black tracking-[-0.07em]">
                    1 Mission
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white/55">
                    Keep education moving
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
    </section>
  );
}
