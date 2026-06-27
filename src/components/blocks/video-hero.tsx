import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingIllustration } from "@/components/ui/floating-illustration";
import { HeroVideoBackground } from "@/components/ui/hero-video-background";
import { InteractiveTiltCard } from "@/components/ui/interactive-tilt-card";

const trustPoints = [
  "Student-first scholarship journey",
  "Admin verified records",
  "Transparent campaign impact"
] as const;

const flowCards = [
  {
    label: "Apply",
    description: "Student submits education support request.",
    icon: GraduationCap
  },
  {
    label: "Verify",
    description: "Admin and volunteers review documents.",
    icon: FileCheck2
  },
  {
    label: "Support",
    description: "Campaigns and donors move support forward.",
    icon: ShieldCheck
  }
] as const;

export function VideoHero() {
  return (
    <HeroVideoBackground className="px-6 pb-24 pt-36 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <div className="relative z-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/76 px-4 py-2 text-sm font-black text-blue-700 shadow-sm backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Karnataka education support platform
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.08em] text-slate-950 sm:text-6xl lg:text-7xl">
            A transparent scholarship platform for students who cannot afford to stop.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Devasiri connects verified students, donors, volunteers, and admins
            through a clean digital platform for professional degree education
            support.
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
              className="rounded-[20px] px-7"
            >
              Support a Student Campaign
              <HeartHandshake className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustPoints.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-[18px] border border-slate-200 bg-white/66 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-xl"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[430px] lg:min-h-[650px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200/50 via-cyan-100/40 to-transparent blur-3xl"
          />

          <FloatingIllustration
            src="/illustrations/student-scholarship-hero.png"
            alt="Student receiving scholarship support"
            priority
            className="relative z-10 mx-auto max-w-[760px] lg:max-w-[860px] devasiri-float-slow"
          />

          <div className="relative z-20 -mt-10 grid gap-3 sm:grid-cols-3 lg:-mt-16">
            {flowCards.map((item) => {
              const Icon = item.icon;

              return (
                <InteractiveTiltCard key={item.label} className="p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-blue-600 text-white shadow-[0_14px_35px_rgba(37,99,235,0.24)]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <p className="mt-4 text-lg font-black tracking-[-0.04em] text-slate-950">
                    {item.label}
                  </p>

                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                    {item.description}
                  </p>
                </InteractiveTiltCard>
              );
            })}
          </div>
        </div>
      </div>
    </HeroVideoBackground>
  );
}
