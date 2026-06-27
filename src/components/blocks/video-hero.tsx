import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
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
import { InteractiveTiltCard } from "@/components/ui/interactive-tilt-card";

const heroStats = [
  {
    label: "Student Journey",
    value: "Apply",
    icon: GraduationCap
  },
  {
    label: "Trust Layer",
    value: "Verify",
    icon: FileCheck2
  },
  {
    label: "Impact Flow",
    value: "Support",
    icon: HeartHandshake
  }
] as const;

const trustPoints = [
  "Scholarship-first platform",
  "Verified campaign records",
  "Transparent support journey"
] as const;

export function VideoHero() {
  return (
    <HeroVideoBackground className="px-6 pb-24 pt-36 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="relative z-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/76 px-4 py-2 text-sm font-black text-blue-700 shadow-sm backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Devasiri Charitable Trust
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.085em] text-slate-950 sm:text-6xl lg:text-7xl">
            Building a transparent education support system for deserving students.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            A premium scholarship platform connecting students, donors,
            volunteers, and administrators through verified campaigns,
            accountable records, and meaningful education impact.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/apply" size="lg" className="rounded-[20px] px-7 devasiri-shine">
              Check Scholarship Eligibility
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              href="/campaigns"
              variant="secondary"
              size="lg"
              className="rounded-[20px] border-blue-100 bg-white/78 px-7 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              Support a Student Campaign
              <HeartHandshake className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustPoints.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-[18px] border border-slate-200 bg-white/68 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-xl"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[470px] lg:min-h-[690px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200/60 via-cyan-100/40 to-transparent blur-3xl"
          />

          <div className="absolute right-0 top-0 z-20 hidden w-[290px] rounded-[30px] border border-white/70 bg-slate-950/90 p-5 text-white shadow-[0_30px_90px_rgba(15,23,42,0.24)] backdrop-blur-2xl lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-blue-500">
                <BadgeCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black">Verified Platform</p>
                <p className="text-xs text-white/60">Admin controlled records</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {["Applications", "Campaigns", "Receipts"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-[16px] bg-white/8 px-3 py-2 text-xs font-bold"
                >
                  {item}
                  <ShieldCheck className="h-4 w-4 text-cyan-300" />
                </div>
              ))}
            </div>
          </div>

          <FloatingIllustration
            src="/illustrations/student-scholarship-hero.png"
            alt="Student receiving scholarship support"
            priority
            className="relative z-10 mx-auto max-w-[780px] lg:max-w-[900px] devasiri-float-slow"
          />

          <div className="relative z-30 -mt-8 grid gap-3 sm:grid-cols-3 lg:-mt-20">
            {heroStats.map((item) => {
              const Icon = item.icon;

              return (
                <InteractiveTiltCard key={item.label} className="p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[17px] bg-blue-600 text-white shadow-[0_14px_35px_rgba(37,99,235,0.24)]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <p className="mt-4 text-2xl font-black tracking-[-0.055em] text-slate-950">
                    {item.value}
                  </p>

                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    {item.label}
                  </p>
                </InteractiveTiltCard>
              );
            })}
          </div>

          <div className="absolute bottom-10 left-0 z-20 hidden rounded-[28px] border border-white/70 bg-white/76 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-emerald-50 text-emerald-600">
                <BookOpenCheck className="h-6 w-6" />
              </div>

              <div>
                <p className="font-black tracking-[-0.035em] text-slate-950">
                  Education should continue
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Fee support • Hostel support • Sponsorship
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-32 right-0 z-20 hidden rounded-[28px] border border-white/70 bg-white/76 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-blue-50 text-blue-600">
                <UsersRound className="h-6 w-6" />
              </div>

              <div>
                <p className="font-black tracking-[-0.035em] text-slate-950">
                  Donors + Volunteers
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Working through one trusted system
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroVideoBackground>
  );
}
