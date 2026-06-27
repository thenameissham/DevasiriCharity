import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileSearch,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveTiltCard } from "@/components/ui/interactive-tilt-card";

const journey = [
  {
    title: "Student applies",
    description:
      "Students submit academic, financial, and verification details through a guided scholarship flow.",
    icon: GraduationCap
  },
  {
    title: "Team verifies",
    description:
      "Admins and volunteers review documents, fee gaps, eligibility, and support priority.",
    icon: FileSearch
  },
  {
    title: "Campaign goes live",
    description:
      "Verified needs become structured education support campaigns for donors and sponsors.",
    icon: HeartHandshake
  },
  {
    title: "Impact is tracked",
    description:
      "Donation records, receipts, progress, and outcomes stay visible through the platform.",
    icon: BarChart3
  }
] as const;

export function HomeExperienceShowcase() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_48%,#f8fbff_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute left-[-180px] top-24 h-[520px] w-[520px] rounded-full bg-blue-300/18 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-160px] bottom-20 h-[560px] w-[560px] rounded-full bg-cyan-300/18 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              Platform Experience
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.075em] text-slate-950 sm:text-5xl lg:text-6xl">
              Not just a charity website. A complete education support engine.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-600">
            The home page should immediately communicate trust, scale, and
            purpose. Devasiri is positioned as a professional scholarship
            operating system where every action has meaning.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {journey.map((item, index) => {
              const Icon = item.icon;

              return (
                <InteractiveTiltCard
                  key={item.title}
                  className="min-h-[250px] p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-13 w-13 items-center justify-center rounded-[20px] bg-blue-600 text-white shadow-[0_16px_40px_rgba(37,99,235,0.24)]">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="text-5xl font-black tracking-[-0.09em] text-slate-100">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-2xl font-black tracking-[-0.055em] text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </InteractiveTiltCard>
              );
            })}
          </div>

          <div className="relative overflow-hidden rounded-[40px] border border-white/80 bg-slate-950 p-7 text-white shadow-[0_34px_110px_rgba(15,23,42,0.22)]">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-cyan-100 ring-1 ring-white/10">
                <ShieldCheck className="h-4 w-4" />
                Trust-first architecture
              </div>

              <h3 className="mt-6 text-4xl font-black tracking-[-0.075em] sm:text-5xl">
                Every student story should become a verified support journey.
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/68">
                The design now speaks with more confidence: strong hero,
                floating proof cards, meaningful CTA choices, and a system-level
                explanation of how Devasiri works.
              </p>

              <div className="mt-8 grid gap-3">
                {[
                  "Clear student entry point",
                  "Campaigns connected to support intent",
                  "Admin-verifiable records",
                  "Receipt-ready donation workflow"
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[18px] bg-white/8 px-4 py-3 text-sm font-bold text-white/86 ring-1 ring-white/10"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/apply" size="lg" className="rounded-[20px]">
                  Start Application
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <Button
                  href="/campaigns"
                  variant="secondary"
                  size="lg"
                  className="rounded-[20px] border-white/20 bg-white/10 text-white hover:bg-white/15"
                >
                  View Campaigns
                </Button>
              </div>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] bg-white/8 p-5 ring-1 ring-white/10">
                  <UsersRound className="h-6 w-6 text-cyan-300" />
                  <p className="mt-4 text-3xl font-black tracking-[-0.06em]">
                    4 Roles
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white/55">
                    Student, donor, volunteer, admin
                  </p>
                </div>

                <div className="rounded-[24px] bg-white/8 p-5 ring-1 ring-white/10">
                  <HeartHandshake className="h-6 w-6 text-emerald-300" />
                  <p className="mt-4 text-3xl font-black tracking-[-0.06em]">
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
      </div>
    </section>
  );
}
