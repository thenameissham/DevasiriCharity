"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  ClipboardCheck,
  FileHeart,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Home,
  MessageCircleHeart,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import { useState } from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

type SupportMode = {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly points: readonly string[];
  readonly href: string;
  readonly cta: string;
};

const supportModes: readonly SupportMode[] = [
  {
    id: "student",
    label: "For Students",
    title: "A safe path to ask for education support.",
    description:
      "Students should not feel like they are begging. The experience frames support as a guided, dignified journey with review and clarity.",
    icon: GraduationCap,
    href: "/apply",
    cta: "Start Application",
    points: [
      "Fee, hostel, and sponsorship support",
      "Guided onboarding before application",
      "Clear support request journey"
    ]
  },
  {
    id: "volunteer",
    label: "For Volunteers",
    title: "A human layer for verification and guidance.",
    description:
      "Volunteers can be positioned as helpers in document review, student guidance, campaign story preparation, and trust building.",
    icon: UsersRound,
    href: "/volunteer",
    cta: "Open Volunteer Path",
    points: [
      "Student guidance support",
      "Verification assistance",
      "Mission participation"
    ]
  },
  {
    id: "donor",
    label: "For Donors",
    title: "A transparent way to support verified needs.",
    description:
      "Donors should see purpose, progress, and receipt-connected accountability before contributing to campaigns.",
    icon: HeartHandshake,
    href: "/campaigns",
    cta: "Explore Campaigns",
    points: [
      "Verified campaign discovery",
      "Progress and goal visibility",
      "Receipt-connected giving"
    ]
  },
  {
    id: "admin",
    label: "For Admins",
    title: "A structured command layer for trust operations.",
    description:
      "Admins continue using existing role-protected flows while the public experience explains the trust architecture clearly.",
    icon: ShieldCheck,
    href: "/login",
    cta: "Open Secure Portal",
    points: [
      "Role-safe access",
      "Application and campaign control",
      "Donation and receipt records"
    ]
  }
];

const supportCategories = [
  {
    title: "Fee Support",
    description: "Help students continue education without fee pressure.",
    icon: ReceiptText
  },
  {
    title: "Hostel Support",
    description: "Support safe stay, travel stability, and continuity.",
    icon: Home
  },
  {
    title: "Sponsorship",
    description: "Create longer-term education support relationships.",
    icon: HandHeart
  },
  {
    title: "Emergency Need",
    description: "Respond to urgent education-related interruptions.",
    icon: FileHeart
  }
] as const;

const volunteerActions = [
  {
    title: "Guide",
    description: "Help students understand what details to prepare.",
    icon: MessageCircleHeart
  },
  {
    title: "Review",
    description: "Support verification and documentation clarity.",
    icon: ClipboardCheck
  },
  {
    title: "Connect",
    description: "Help campaigns communicate the real student story.",
    icon: BookOpenCheck
  }
] as const;

export function VolunteerSupportCommand() {
  const [activeModeId, setActiveModeId] = useState("student");
  const { reducedMotion } = useMotionExperience();

  const activeMode =
    supportModes.find((mode) => mode.id === activeModeId) ?? supportModes[0];

  const ActiveIcon = activeMode.icon;

  return (
    <section
      id="volunteer"
      className="relative overflow-hidden bg-white px-6 py-24 sm:px-8 lg:px-12"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--theme-soft)_0%,white_42%,var(--theme-surface)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute left-[-280px] top-20 h-[740px] w-[740px] rounded-full bg-[var(--theme-primary)]/14 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-280px] bottom-16 h-[740px] w-[740px] rounded-full bg-[var(--theme-accent)]/14 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 devasiri-premium-grid opacity-40"
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 26 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-white/76 px-4 py-2 text-sm font-black text-[var(--theme-primary)] shadow-sm backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              Volunteer & Support Command
            </div>

            <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.085em] text-[var(--theme-ink)] sm:text-5xl lg:text-7xl">
              Make help feel organized, dignified, and human.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-600">
            This section turns Devasiri into a multi-role support platform:
            students ask clearly, volunteers guide responsibly, donors support
            verified needs, and admins protect trust.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[390px_1fr]">
          <aside className="rounded-[44px] border border-white/80 bg-white/76 p-4 shadow-[0_34px_120px_rgba(7,17,31,0.11)] backdrop-blur-2xl">
            <div className="grid gap-3">
              {supportModes.map((mode) => {
                const Icon = mode.icon;
                const active = mode.id === activeModeId;

                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveModeId(mode.id)}
                    className={cn(
                      "group flex items-center gap-4 rounded-[28px] border p-4 text-left transition duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]",
                      active
                        ? "border-[var(--theme-border)] bg-[var(--theme-soft)] shadow-[0_18px_55px_rgba(7,17,31,0.08)]"
                        : "border-transparent bg-white/54 hover:border-slate-200 hover:bg-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-13 w-13 shrink-0 items-center justify-center rounded-[20px] transition",
                        active
                          ? "bg-[var(--theme-primary)] text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-[var(--theme-soft)] group-hover:text-[var(--theme-primary)]"
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                        {mode.label}
                      </p>

                      <p className="mt-1 text-lg font-black tracking-[-0.05em] text-[var(--theme-ink)]">
                        {mode.points[0]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="relative overflow-hidden rounded-[48px] border border-white/80 bg-[var(--theme-ink)] p-6 text-white shadow-[0_44px_150px_rgba(7,17,31,0.26)] sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[var(--theme-primary)]/34 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[var(--theme-accent)]/24 blur-3xl"
            />

            <motion.div
              key={activeMode.id}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid gap-8 xl:grid-cols-[1fr_0.9fr]"
            >
              <div>
                <div className="flex h-18 w-18 items-center justify-center rounded-[28px] bg-white/10 text-[var(--theme-accent)] ring-1 ring-white/10">
                  <ActiveIcon className="h-9 w-9" />
                </div>

                <p className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-white/42">
                  {activeMode.label}
                </p>

                <h3 className="mt-4 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.08em] sm:text-5xl">
                  {activeMode.title}
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/66">
                  {activeMode.description}
                </p>

                <div className="mt-8 grid gap-3">
                  {activeMode.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 rounded-[20px] bg-white/8 px-4 py-3 text-sm font-bold text-white/84 ring-1 ring-white/10"
                    >
                      <BadgeCheck className="h-4 w-4 shrink-0 text-[var(--theme-accent)]" />
                      {point}
                    </div>
                  ))}
                </div>

                <Link
                  href={activeMode.href}
                  className="mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-[20px] bg-[var(--theme-primary)] px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,118,110,0.24)] transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-white/20"
                >
                  {activeMode.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[36px] bg-white/8 p-5 ring-1 ring-white/10">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-white/44">
                    Support categories
                  </p>

                  <div className="mt-5 grid gap-3">
                    {supportCategories.map((category) => {
                      const Icon = category.icon;

                      return (
                        <div
                          key={category.title}
                          className="rounded-[24px] bg-white/7 p-4 ring-1 ring-white/10"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[17px] bg-white/10 text-[var(--theme-accent)]">
                              <Icon className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="text-sm font-black text-white">
                                {category.title}
                              </p>

                              <p className="mt-1 text-xs leading-5 text-white/50">
                                {category.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[36px] bg-white/8 p-5 ring-1 ring-white/10">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-white/44">
                    Volunteer actions
                  </p>

                  <div className="mt-5 grid gap-3">
                    {volunteerActions.map((action, index) => {
                      const Icon = action.icon;

                      return (
                        <div
                          key={action.title}
                          className="flex items-center justify-between rounded-[22px] bg-white/7 px-4 py-3 ring-1 ring-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-white/10 text-[var(--theme-accent)]">
                              <Icon className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="text-sm font-black text-white">
                                {action.title}
                              </p>

                              <p className="text-xs text-white/45">
                                {action.description}
                              </p>
                            </div>
                          </div>

                          <span className="text-xs font-black text-white/35">
                            0{index + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Dignified asking",
              text: "Students explain their need through a guided path.",
              icon: GraduationCap
            },
            {
              title: "Responsible helping",
              text: "Volunteers and admins protect clarity and trust.",
              icon: ShieldCheck
            },
            {
              title: "Visible giving",
              text: "Donors support verified campaigns with confidence.",
              icon: HeartHandshake
            }
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[32px] border border-white/80 bg-white/74 p-6 shadow-[0_24px_80px_rgba(7,17,31,0.08)] backdrop-blur-2xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[var(--theme-soft)] text-[var(--theme-primary)]">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-2xl font-black tracking-[-0.06em] text-[var(--theme-ink)]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
