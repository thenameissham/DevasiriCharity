import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { BrandBackground } from "@/components/landing/brand-background";
import { MotionSection } from "@/components/motion/motion-section";
import { RevealText } from "@/components/motion/reveal-text";

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
    <section className="relative isolate overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:min-h-[900px] lg:px-12 lg:pb-24 lg:pt-40">
      <BrandBackground />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-24 h-px w-[min(1120px,88vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--theme-primary)]/20 to-transparent"
      />

      <MotionSection className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative z-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-white/80 px-4 py-2 text-sm font-extrabold text-[var(--theme-primary)] shadow-[0_14px_40px_rgba(8,26,28,0.07)] backdrop-blur-2xl">
            <Sparkles className="h-4 w-4 text-[var(--theme-accent)]" />
            Devasiri Charitable Trust
          </div>

          <RevealText
            as="h1"
            text="Keeping education in motion when financial barriers stand in the way."
            className="font-headline text-balance mt-7 max-w-4xl text-[3.35rem] font-extrabold leading-[0.95] tracking-[-0.072em] text-[var(--theme-ink)] sm:text-[4.6rem] lg:text-[5.35rem]"
          />

          <p className="mt-7 max-w-xl text-base leading-8 text-[#526567] sm:text-lg">
            We connect verified students, responsible supporters, committed
            volunteers, and accountable administrators in one transparent
            education-support system—from application to visible outcome.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/apply"
              className="premium-cta premium-cta-primary group inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-extrabold"
            >
              <span className="relative z-10 text-white">
                Check your eligibility
              </span>

              <ArrowRight className="relative z-10 h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/campaigns"
              className="premium-cta premium-cta-light group inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-extrabold"
            >
              <span className="relative z-10 text-[#071a1c]">
                Explore verified campaigns
              </span>

              <HeartHandshake className="relative z-10 h-5 w-5 text-[#b7791f]" />
            </Link>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-2.5 rounded-[20px] border border-white/85 bg-white/68 px-4 py-3 text-sm font-bold leading-5 text-[#294345] shadow-[0_16px_42px_rgba(8,26,28,0.055)] backdrop-blur-xl"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--theme-primary)]" />
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto min-h-[560px] w-full max-w-[760px] lg:min-h-[680px]">
          <div
            aria-hidden="true"
            className="absolute inset-[6%_0_10%] rounded-[50%] bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.94)_0%,rgba(236,248,242,0.78)_40%,rgba(255,245,220,0.4)_66%,transparent_76%)]"
          />

          <div
            aria-hidden="true"
            className="absolute left-[6%] top-[18%] h-[310px] w-[310px] rounded-full bg-emerald-200/30 blur-[90px]"
          />

          <div
            aria-hidden="true"
            className="absolute right-[2%] top-[5%] h-[300px] w-[300px] rounded-full bg-amber-200/38 blur-[90px]"
          />

          <div className="absolute right-0 top-8 z-20 max-w-[270px] rounded-[22px] border border-amber-200/80 bg-[#fff9eb]/94 px-5 py-4 shadow-[0_18px_55px_rgba(146,96,12,0.12)] backdrop-blur-xl sm:right-7 lg:right-0">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-amber-100 text-amber-700">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.17em] text-[#ad651b]">
                  Built for continuity
                </p>

                <p className="mt-1 text-sm font-bold leading-5 text-[#263638]">
                  Education, hostel support, and guidance in one journey.
                </p>
              </div>
            </div>
          </div>

          <Image
            src="/illustrations/student-scholarship-hero.png"
            alt="Student receiving education support through Devasiri"
            width={980}
            height={760}
            priority
            className="hero-integrated-illustration absolute inset-x-0 bottom-20 mx-auto h-auto w-full max-w-[700px] object-contain drop-shadow-[0_32px_45px_rgba(8,26,28,0.16)]"
          />

          <div className="absolute inset-x-3 bottom-0 z-20 rounded-[26px] border border-white/12 bg-[#061d1f]/94 p-4 text-white shadow-[0_24px_80px_rgba(8,26,28,0.28)] backdrop-blur-2xl sm:inset-x-8 sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-emerald-400/12 text-emerald-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-[#9ce5d8]">
                    Trust pathway
                  </p>

                  <p className="mt-1 max-w-xs text-sm font-semibold leading-6 text-[#e8f1f0]">
                    Every step stays clear, human-reviewed, and connected to a
                    visible record.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {journey.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="min-w-0 rounded-[15px] border border-white/10 bg-white/[0.065] px-2 py-2.5 text-center"
                    >
                      <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white text-[var(--theme-primary)] shadow-sm">
                        <Icon className="h-4 w-4" />
                      </div>

                      <p className="mt-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.1em] text-[#9fb4b4]">
                        0{index + 1}
                      </p>

                      <p className="truncate text-[0.7rem] font-bold text-white">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
    </section>
  );
}
