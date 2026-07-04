import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { BrandBackground } from "@/components/landing/brand-background";
import { MotionSection } from "@/components/motion/motion-section";

export function ParticipationSection() {
  return (
    <section
      id="volunteer"
      className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <BrandBackground tone="dark" />

      <MotionSection className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-[linear-gradient(135deg,#075c44,#06745f_45%,#046556_100%)] p-8 text-white shadow-[0_40px_130px_rgba(6,95,70,0.24)] sm:p-12 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10 lg:p-16">
          <div
            aria-hidden="true"
            className="absolute right-[-12%] top-[-8%] h-72 w-72 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute left-[-8%] bottom-[-10%] h-72 w-72 rounded-full bg-[#e3b45e]/18 blur-3xl"
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-100 ring-1 ring-white/10">
              <UsersRound className="h-3.5 w-3.5" />
              Participate in the mission
            </div>

            <h2 className="font-headline text-balance mt-6 text-4xl font-extrabold leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Students, supporters, and volunteers belong in one trusted journey.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-emerald-50/82 sm:text-lg">
              Apply for assistance, support a verified campaign, or contribute
              time and guidance through Devasiri’s growing platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/apply"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[20px] bg-white px-7 text-sm font-extrabold text-emerald-900 shadow-[0_18px_50px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-0.5"
              >
                Apply for support
                <GraduationCap className="h-4 w-4" />
              </Link>

              <Link
                href="/volunteer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-[20px] border border-white/20 bg-white/10 px-7 text-sm font-extrabold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/14"
              >
                Join as volunteer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[#e3b45e] text-[#102729]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-headline text-lg font-extrabold tracking-[-0.03em] text-white">
                  Built for trust, not noise.
                </p>
                <p className="mt-1 text-sm leading-7 text-white/72">
                  Every path is designed around clear actions, respectful
                  communication, and records that can be reviewed later.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-10 lg:mt-0">
            <Image
              src="/illustrations/volunteer-student-support.png"
              alt="Volunteers supporting a student through Devasiri"
              width={980}
              height={760}
              className="mx-auto h-auto w-full max-w-[620px] object-contain drop-shadow-[0_30px_50px_rgba(2,44,34,0.35)]"
            />
          </div>
        </div>
      </MotionSection>
    </section>
  );
}
