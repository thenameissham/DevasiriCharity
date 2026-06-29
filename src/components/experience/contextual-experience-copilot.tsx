"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Compass,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
  type LucideIcon
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

type CopilotAction =
  | {
      readonly type: "link";
      readonly label: string;
      readonly href: string;
      readonly emphasis?: boolean;
    }
  | {
      readonly type: "auth";
      readonly label: string;
      readonly intent: "branch" | "login" | "signup";
      readonly emphasis?: boolean;
    };

interface CopilotGuide {
  readonly kicker: string;
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly bullets: readonly string[];
  readonly actions: readonly CopilotAction[];
}

function resolveGuide(pathname: string): CopilotGuide | null {
  if (pathname.startsWith("/admin")) return null;

  if (pathname === "/") {
    return {
      kicker: "Homepage guide",
      title: "Move through Devasiri like one continuous journey.",
      description:
        "Start with the hero, explore mission flow, understand trust layers, then open student support or verified campaigns.",
      icon: Compass,
      bullets: [
        "Use the journey navigator to move through sections",
        "Try Theme Studio to compare visual identities",
        "Open Get Started for the guided access flow"
      ],
      actions: [
        { type: "auth", label: "Open Guided Start", intent: "branch", emphasis: true },
        { type: "link", label: "View Campaigns", href: "/campaigns" }
      ]
    };
  }

  if (pathname.startsWith("/apply")) {
    return {
      kicker: "Student support guide",
      title: "This path is for dignified education support.",
      description:
        "The application journey should feel calm and structured. Saved onboarding details can be applied when matching fields are found.",
      icon: GraduationCap,
      bullets: [
        "Explain the support need clearly",
        "Keep education, contact, and document details ready",
        "Final submission still uses the existing backend flow"
      ],
      actions: [
        { type: "link", label: "Continue Application", href: "/apply/start", emphasis: true },
        { type: "link", label: "Explore Campaigns", href: "/campaigns" }
      ]
    };
  }

  if (pathname.includes("/donate")) {
    return {
      kicker: "Donation guide",
      title: "Support should feel connected to a real student need.",
      description:
        "This page continues the trust journey: campaign purpose, contribution, receipt, and visible impact.",
      icon: HeartHandshake,
      bullets: [
        "Review campaign purpose before supporting",
        "Use donor details carefully for receipt records",
        "Receipt route remains connected after donation"
      ],
      actions: [
        { type: "link", label: "Back to Campaigns", href: "/campaigns", emphasis: true },
        { type: "link", label: "Home", href: "/" }
      ]
    };
  }

  if (pathname.startsWith("/campaigns")) {
    return {
      kicker: "Campaign guide",
      title: "Discover verified education needs with clarity.",
      description:
        "Campaigns should help donors understand purpose, progress, target, and accountability before supporting.",
      icon: HeartHandshake,
      bullets: [
        "Use search and category filters",
        "Open campaign details before donating",
        "Progress and receipt paths reinforce trust"
      ],
      actions: [
        { type: "link", label: "Student Eligibility", href: "/apply", emphasis: true },
        { type: "link", label: "Home", href: "/" }
      ]
    };
  }

  if (pathname.startsWith("/receipts")) {
    return {
      kicker: "Receipt guide",
      title: "This is part of the public trust memory.",
      description:
        "Receipts should not feel isolated. They connect donation records back to campaigns and the wider mission.",
      icon: ReceiptText,
      bullets: [
        "Keep receipt reference safe",
        "Use campaign path to understand purpose",
        "Transparency strengthens donor confidence"
      ],
      actions: [
        { type: "link", label: "View Campaigns", href: "/campaigns", emphasis: true },
        { type: "link", label: "Home", href: "/" }
      ]
    };
  }

  if (pathname === "/login") {
    return {
      kicker: "Secure portal guide",
      title: "This route keeps existing authentication untouched.",
      description:
        "Use the login page for role-based access. The premium overlay only improves entry experience before reaching this route.",
      icon: ShieldCheck,
      bullets: [
        "Existing providers and sessions are preserved",
        "Admin, donor, student, and volunteer roles stay protected",
        "No backend auth rules are changed by experience patches"
      ],
      actions: [
        { type: "auth", label: "Open Login Overlay", intent: "login", emphasis: true },
        { type: "link", label: "Home", href: "/" }
      ]
    };
  }

  if (pathname === "/volunteer") {
    return {
      kicker: "Volunteer guide",
      title: "Volunteer support strengthens the human layer.",
      description:
        "This route is for guided participation, review help, and student support operations.",
      icon: UsersRound,
      bullets: [
        "Guide students with clarity",
        "Support verification responsibly",
        "Help campaigns communicate real needs"
      ],
      actions: [
        { type: "link", label: "Start Student Support", href: "/apply", emphasis: true },
        { type: "link", label: "Campaigns", href: "/campaigns" }
      ]
    };
  }

  return {
    kicker: "Experience guide",
    title: "You are inside the Devasiri support system.",
    description:
      "Every route is designed to connect student need, trust, support, receipts, and visible impact.",
    icon: BookOpenCheck,
    bullets: [
      "Use the command center with Ctrl/Cmd + K",
      "Theme Studio changes the visual mood",
      "Reduced motion keeps the experience calm"
    ],
    actions: [
      { type: "link", label: "Home", href: "/", emphasis: true },
      { type: "link", label: "Campaigns", href: "/campaigns" }
    ]
  };
}

export function ContextualExperienceCopilot() {
  const pathname = usePathname();
  const { reducedMotion, openAuthOverlay } = useMotionExperience();
  const [isOpen, setIsOpen] = useState(false);

  const guide = useMemo(() => resolveGuide(pathname), [pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!guide) return null;

  const Icon = guide.icon;

  return (
    <aside className="fixed right-4 top-24 z-[9989] hidden w-[min(390px,calc(100vw-2rem))] md:block">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="panel"
            initial={reducedMotion ? false : { opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: reducedMotion ? 0 : 0.28 }}
            className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/88 p-4 shadow-[0_28px_100px_rgba(7,17,31,0.18)] backdrop-blur-2xl"
          >
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--theme-primary)]/18 blur-3xl"
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[var(--theme-soft)] text-[var(--theme-primary)]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--theme-primary)]">
                      {guide.kicker}
                    </p>

                    <h2 className="mt-1 text-lg font-black leading-tight tracking-[-0.045em] text-[var(--theme-ink)]">
                      {guide.title}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] text-slate-500 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                  aria-label="Close experience copilot"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {guide.description}
              </p>

              <div className="mt-4 grid gap-2">
                {guide.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-2 rounded-[18px] bg-white/70 px-3 py-2 text-xs font-bold leading-5 text-slate-600 ring-1 ring-slate-200/70"
                  >
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--theme-primary)]" />
                    {bullet}
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-2">
                {guide.actions.map((action) => {
                  const className = cn(
                    "inline-flex h-11 items-center justify-center gap-2 rounded-[16px] px-4 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]",
                    action.emphasis
                      ? "bg-[var(--theme-primary)] text-white shadow-[0_16px_40px_rgba(15,118,110,0.20)] hover:bg-[var(--theme-primary-dark)]"
                      : "border border-slate-200 bg-white text-[var(--theme-ink)] hover:bg-[var(--theme-soft)]"
                  );

                  if (action.type === "auth") {
                    return (
                      <button
                        key={action.label}
                        type="button"
                        onClick={() => {
                          openAuthOverlay(action.intent);
                          setIsOpen(false);
                        }}
                        className={className}
                      >
                        {action.label}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={action.label}
                      href={action.href}
                      className={className}
                    >
                      {action.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="button"
            type="button"
            onClick={() => setIsOpen(true)}
            initial={reducedMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
            className="ml-auto flex h-12 items-center gap-2 rounded-full border border-white/80 bg-white/86 px-4 text-xs font-black text-[var(--theme-ink)] shadow-[0_18px_60px_rgba(7,17,31,0.15)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-[var(--theme-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
            aria-label="Open contextual experience guide"
          >
            <Sparkles className="h-4 w-4 text-[var(--theme-primary)]" />
            Guide
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  );
}
