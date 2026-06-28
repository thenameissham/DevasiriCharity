import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  Landmark,
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
  "Admin-controlled records"
] as const;

const platformSignals = [
  {
    label: "Student",
    value: "Apply",
    icon: GraduationCap
  },
  {
    label: "Team",
    value: "Verify",
    icon: FileCheck2
  },
  {
    label: "Donor",
    value: "Support",
    icon: HeartHandshake
  }
] as const;

export function VideoHero() {
  return (
    <HeroVideoBackground className="px-6 pb-32 pt-36 sm:px-8 sm:pt-40 lg:px-12 lg:pb-36">
      <div className="absolute inset-0 opacity-80">
        <InteractiveConstellationBackground />
      </div>

      <MotionSection className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/72 px-4 py-2 text-sm font-black text-blue-700 shadow-sm backdrop-blur-2xl">
            <Sparkles className="h-4 w-4" />
            Devasiri Charitable Trust
          </div>

          <RevealText
            as="h1"
            text="A warmer, smarter way to keep education moving."
            className="mt-6 max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.09em] text-slate-950 sm:text-6xl lg:text-8xl"
          />

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            A cinematic scholarship and support platform where students,
            donors, volunteers, and administrators move through one trusted
            system — from need to verification to visible impact.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SharedAuthTrigger
              intent="branch"
              ariaLabel="Open Devasiri guided start"
              className="h-14 rounded-[22px] px-8 text-base devasiri-shine"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </SharedAuthTrigger>

            <Button
              href="/campaigns"
              variant="secondary"
              size="lg"
              className="h-14 rounded-[22px] border-blue-100 bg-white/76 px-8 text-base shadow-[0_18px_55px_rgba(15,23,42,0.09)] backdrop-blur-2xl"
            >
              View Campaigns
              <HeartHandshake className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {proofPills.map((item) => (
              <div
                key={item}
                className="rounded-[20px] border border-white/70 bg-white/62 px-4 py-3 shadow-[0_16px_45px_rgba(15,23,42,0.06)] backdrop-blur-2xl"
              >
                <div className="flex items-center gap-2 text-sm font-black text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[560px] lg:min-h-[760px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.20),rgba(6,182,212,0.12)_45%,transparent_72%)] blur-2xl"
          />

          <div className="absolute left-0 top-8 z-20 hidden w-[250px] rounded-[32px] border border-white/70 bg-white/74 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.14)] backdrop-blur-2xl lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-blue-600 text-white">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-950">
                  Trust Layer
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Verified records
                </p>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 z-20 hidden w-[310px] overflow-hidden rounded-[34px] border border-white/70 bg-slate-950/92 p-5 text-white shadow-[0_34px_110px_rgba(15,23,42,0.26)] backdrop-blur-2xl lg:block">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-500/30 blur-3xl"
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white/10 text-cyan-200 ring-1 ring-white/10">
                  <Landmark className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm font-black">Platform Console</p>
                  <p className="text-xs text-white/55">
                    Student • Donor • Volunteer • Admin
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {["Applications", "Campaigns", "Donations", "Receipts"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-[18px] bg-white/8 px-3 py-3 text-xs font-bold ring-1 ring-white/10"
                    >
                      {item}
                      <span className="rounded-full bg-cyan-300/14 px-2 py-1 text-[10px] text-cyan-100">
                        0{index + 1}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <FloatingIllustration
            src="/illustrations/student-scholarship-hero.png"
            alt="Student receiving scholarship support"
            priority
            className="relative z-10 mx-auto max-w-[820px] lg:max-w-[940px] devasiri-float-slow"
          />

          <div className="relative z-30 -mt-10 grid gap-3 sm:grid-cols-3 lg:-mt-24">
            {platformSignals.map((item) => {
              const Icon = item.icon;

              return (
                <AnimatedGlassCard
                  key={item.label}
                  className="rounded-[30px] p-5"
                >
                  <div className="flex h-13 w-13 items-center justify-center rounded-[20px] bg-blue-600 text-white shadow-[0_16px_40px_rgba(37,99,235,0.24)]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <p className="mt-5 text-3xl font-black tracking-[-0.07em] text-slate-950">
                    {item.value}
                  </p>

                  <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                    {item.label}
                  </p>
                </AnimatedGlassCard>
              );
            })}
          </div>

          <div className="absolute bottom-12 left-2 z-20 hidden rounded-[30px] border border-white/70 bg-white/76 p-4 shadow-[0_28px_85px_rgba(15,23,42,0.13)] backdrop-blur-2xl lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-emerald-50 text-emerald-600">
                <BookOpenCheck className="h-6 w-6" />
              </div>

              <div>
                <p className="font-black tracking-[-0.04em] text-slate-950">
                  Education should continue
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Fee • Hostel • Sponsorship support
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-36 right-0 z-20 hidden rounded-[30px] border border-white/70 bg-white/76 p-4 shadow-[0_28px_85px_rgba(15,23,42,0.13)] backdrop-blur-2xl lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-blue-50 text-blue-600">
                <UsersRound className="h-6 w-6" />
              </div>

              <div>
                <p className="font-black tracking-[-0.04em] text-slate-950">
                  Human-centered support
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Guided, verified, accountable
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
    </HeroVideoBackground>
  );
}
