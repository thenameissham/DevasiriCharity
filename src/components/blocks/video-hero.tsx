import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingIllustration } from "@/components/ui/floating-illustration";
import { HeroVideoBackground } from "@/components/ui/hero-video-background";
import { AnimatedGlassCard } from "@/components/motion/animated-glass-card";
import { MotionSection } from "@/components/motion/motion-section";
import { RevealText } from "@/components/motion/reveal-text";
import { SharedAuthTrigger } from "@/components/motion/shared-auth-trigger";
import { InteractiveConstellationBackground } from "@/components/motion/interactive-constellation-background";

const proofPills = [
  "Verified student needs",
  "Transparent campaign progress",
  "Admin-controlled support flow"
] as const;

const journeyCards = [
  {
    label: "Apply",
    description: "Student begins the support journey",
    icon: GraduationCap
  },
  {
    label: "Verify",
    description: "Team reviews records and eligibility",
    icon: FileCheck2
  },
  {
    label: "Support",
    description: "Donors support verified campaigns",
    icon: HeartHandshake
  }
] as const;

export function VideoHero() {
  return (
    <HeroVideoBackground className="px-6 pb-28 pt-36 sm:px-8 sm:pt-40 lg:px-12 lg:pb-32">
      <div className="absolute inset-0 opacity-60">
        <InteractiveConstellationBackground />
      </div>

      <MotionSection className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative z-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-white/76 px-4 py-2 text-sm font-black text-[var(--theme-primary)] shadow-sm backdrop-blur-2xl">
            <Sparkles className="h-4 w-4" />
            Devasiri Charitable Trust
          </div>

          <RevealText
            as="h1"
            text="A warmer, smarter way to keep education moving."
            className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.09em] text-[var(--theme-ink)] sm:text-6xl lg:text-[5.8rem]"
          />

          <p className="mt-7 max-w-xl text-base leading-8 text-[#475569] sm:text-lg">
            A premium scholarship and support platform where students, donors,
            volunteers, and administrators move through one trusted system —
            from need to verification to visible impact.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SharedAuthTrigger
              intent="branch"
              ariaLabel="Open Devasiri guided start"
              className="h-14 rounded-[22px] bg-[var(--theme-primary)] px-8 text-base shadow-[0_20px_55px_rgba(15,118,110,0.26)] hover:bg-[var(--theme-primary-dark)] devasiri-shine"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </SharedAuthTrigger>

            <Button
              href="/campaigns"
              variant="secondary"
              size="lg"
              className="h-14 rounded-[22px] border-[var(--theme-border)] bg-white/76 px-8 text-base text-[var(--theme-ink)] shadow-[0_18px_55px_rgba(7,17,31,0.09)] backdrop-blur-2xl"
            >
              View Campaigns
              <HeartHandshake className="h-5 w-5 text-[var(--theme-accent)]" />
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {proofPills.map((item) => (
              <div
                key={item}
                className="rounded-[20px] border border-white/70 bg-white/66 px-4 py-3 shadow-[0_16px_45px_rgba(7,17,31,0.06)] backdrop-blur-2xl"
              >
                <div className="flex items-start gap-2 text-sm font-black leading-5 text-[#1f2937]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--theme-primary)]" />
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 min-h-[560px] lg:min-h-[720px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(15,118,110,0.16),rgba(245,158,11,0.10)_38%,transparent_68%)] blur-2xl"
          />

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[46%] h-[560px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/36 blur-3xl"
          />

          <FloatingIllustration
            src="/illustrations/student-scholarship-hero.png"
            alt="Student receiving scholarship support"
            priority
            className="relative z-10 mx-auto max-w-[760px] lg:max-w-[900px] devasiri-float-slow"
          />

          <div className="relative z-20 -mt-10 grid gap-3 sm:grid-cols-3 lg:-mt-16">
            {journeyCards.map((item) => {
              const Icon = item.icon;

              return (
                <AnimatedGlassCard
                  key={item.label}
                  className="rounded-[28px] p-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[var(--theme-primary)] text-white shadow-[0_16px_40px_rgba(15,118,110,0.22)]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <p className="mt-4 text-2xl font-black tracking-[-0.055em] text-[var(--theme-ink)]">
                    {item.label}
                  </p>

                  <p className="mt-1 text-xs font-semibold leading-5 text-[#64748b]">
                    {item.description}
                  </p>
                </AnimatedGlassCard>
              );
            })}
          </div>

          <div className="relative z-20 mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[26px] border border-white/70 bg-white/74 px-5 py-4 shadow-[0_18px_55px_rgba(7,17,31,0.08)] backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[17px] bg-[var(--theme-soft)] text-[var(--theme-primary)]">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-black text-[var(--theme-ink)]">
                    Verified support journey
                  </p>
                  <p className="text-xs font-semibold text-[#64748b]">
                    Records, review and trust stay connected
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/70 bg-white/74 px-5 py-4 shadow-[0_18px_55px_rgba(7,17,31,0.08)] backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[17px] bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]">
                  <UsersRound className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-black text-[var(--theme-ink)]">
                    Human-centered platform
                  </p>
                  <p className="text-xs font-semibold text-[#64748b]">
                    Student, donor, volunteer and admin flows
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
    </HeroVideoBackground>
  );
}
