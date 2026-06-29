"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

type ReadinessStep = {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly icon: LucideIcon;
};

type ReadinessState = ReadinessStep & {
  readonly complete: boolean;
};

const readinessSteps: readonly ReadinessStep[] = [
  {
    id: "identity",
    label: "Identity",
    description: "Student or applicant name details",
    keywords: ["name", "fullname", "full name", "student", "applicant"],
    icon: GraduationCap
  },
  {
    id: "contact",
    label: "Contact",
    description: "Email and mobile reachability",
    keywords: ["email", "phone", "mobile", "contact"],
    icon: ClipboardCheck
  },
  {
    id: "education",
    label: "Education",
    description: "College, course, branch, semester, university",
    keywords: ["college", "course", "branch", "semester", "university", "education"],
    icon: FileCheck2
  },
  {
    id: "support",
    label: "Support Need",
    description: "Reason, category, message, or support request",
    keywords: ["support", "need", "reason", "message", "description", "category"],
    icon: ShieldCheck
  },
  {
    id: "documents",
    label: "Documents",
    description: "Uploaded proof or document fields",
    keywords: ["document", "file", "proof", "upload", "certificate"],
    icon: BadgeCheck
  }
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getFieldText(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  return normalize(
    [
      field.name,
      field.id,
      field.getAttribute("placeholder") ?? "",
      field.getAttribute("aria-label") ?? "",
      field.closest("label")?.textContent ?? ""
    ].join(" ")
  );
}

function hasFieldValue(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  if (field instanceof HTMLInputElement && field.type === "file") {
    return Boolean(field.files && field.files.length > 0);
  }

  if (field instanceof HTMLInputElement) {
    if (field.type === "checkbox" || field.type === "radio") {
      return field.checked;
    }
  }

  return Boolean(field.value.trim());
}

function collectReadiness(): readonly ReadinessState[] {
  if (typeof document === "undefined") {
    return readinessSteps.map((step) => ({
      ...step,
      complete: false
    }));
  }

  const fields = Array.from(
    document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      "input, textarea, select"
    )
  ).filter((field) => {
    if (field instanceof HTMLInputElement) {
      return !["hidden", "submit", "button", "reset"].includes(field.type);
    }

    return true;
  });

  return readinessSteps.map((step) => {
    const complete = fields.some((field) => {
      const fieldText = getFieldText(field);
      const keywordMatched = step.keywords.some((keyword) =>
        fieldText.includes(normalize(keyword))
      );

      if (!keywordMatched) return false;

      return hasFieldValue(field);
    });

    return {
      ...step,
      complete
    };
  });
}

export function StudentApplicationCommandCompanion() {
  const pathname = usePathname();
  const { reducedMotion } = useMotionExperience();

  const [isOpen, setIsOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [readiness, setReadiness] = useState<readonly ReadinessState[]>(() =>
    readinessSteps.map((step) => ({ ...step, complete: false }))
  );

  const shouldShow = pathname === "/apply" || pathname.startsWith("/apply/");
  const isSuccess = pathname.startsWith("/apply/success");

  useEffect(() => {
    if (!shouldShow) return;

    function updateReadiness() {
      setReadiness(collectReadiness());
    }

    updateReadiness();

    const timer = window.setTimeout(updateReadiness, 350);

    document.addEventListener("input", updateReadiness, true);
    document.addEventListener("change", updateReadiness, true);

    const observer = new MutationObserver(updateReadiness);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["value", "checked", "aria-label", "placeholder"]
    });

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("input", updateReadiness, true);
      document.removeEventListener("change", updateReadiness, true);
      observer.disconnect();
    };
  }, [shouldShow, pathname]);

  useEffect(() => {
    if (!shouldShow) {
      document.documentElement.removeAttribute("data-devasiri-application-focus");
      return;
    }

    if (focusMode) {
      document.documentElement.dataset.devasiriApplicationFocus = "true";
    } else {
      document.documentElement.removeAttribute("data-devasiri-application-focus");
    }

    return () => {
      document.documentElement.removeAttribute("data-devasiri-application-focus");
    };
  }, [focusMode, shouldShow]);

  const completedCount = isSuccess
    ? readinessSteps.length
    : readiness.filter((item) => item.complete).length;

  const progress = Math.round((completedCount / readinessSteps.length) * 100);

  const nextMissing = useMemo(() => {
    if (isSuccess) return null;

    return readiness.find((item) => !item.complete) ?? null;
  }, [isSuccess, readiness]);

  if (!shouldShow) return null;

  return (
    <aside className="fixed left-4 top-28 z-[9989] hidden w-[min(390px,calc(100vw-2rem))] xl:block">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="panel"
            initial={reducedMotion ? false : { opacity: 0, x: -18, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -12, scale: 0.96 }}
            transition={{ duration: reducedMotion ? 0 : 0.28 }}
            className="relative overflow-hidden rounded-[34px] border border-white/80 bg-white/88 p-4 shadow-[0_30px_110px_rgba(7,17,31,0.18)] backdrop-blur-2xl"
          >
            <div
              aria-hidden="true"
              className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[var(--theme-primary)]/18 blur-3xl"
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--theme-soft)] text-[var(--theme-primary)]">
                    <svg className="absolute inset-0 h-16 w-16 -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="27"
                        stroke="rgba(15,23,42,0.10)"
                        strokeWidth="6"
                        fill="none"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="27"
                        stroke="var(--theme-primary)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={169.65}
                        animate={{
                          strokeDashoffset: 169.65 - (169.65 * progress) / 100
                        }}
                        transition={{ duration: reducedMotion ? 0 : 0.45 }}
                      />
                    </svg>
                    <span className="relative text-sm font-black">{progress}%</span>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--theme-primary)]">
                      Application Companion
                    </p>

                    <h2 className="mt-1 text-lg font-black leading-tight tracking-[-0.045em] text-[var(--theme-ink)]">
                      {isSuccess
                        ? "Application submitted."
                        : "Build a cleaner student support request."}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] text-slate-500 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                  aria-label="Close application companion"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {isSuccess
                  ? "The student journey has reached submission. The existing backend flow remains untouched."
                  : nextMissing
                    ? `Next helpful area: ${nextMissing.label}. ${nextMissing.description}.`
                    : "All visible readiness areas look complete. Review once before submitting."}
              </p>

              <div className="mt-4 grid gap-2">
                {readiness.map((item) => {
                  const Icon = item.icon;
                  const complete = isSuccess || item.complete;

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-start gap-3 rounded-[20px] px-3 py-3 ring-1",
                        complete
                          ? "bg-[var(--theme-soft)] text-[var(--theme-ink)] ring-[var(--theme-border)]"
                          : "bg-white/72 text-slate-600 ring-slate-200/80"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px]",
                          complete
                            ? "bg-[var(--theme-primary)] text-white"
                            : "bg-slate-100 text-slate-500"
                        )}
                      >
                        {complete ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </div>

                      <div>
                        <p className="text-sm font-black tracking-[-0.025em]">
                          {item.label}
                        </p>

                        <p className="mt-0.5 text-xs leading-5 opacity-70">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!isSuccess ? (
                <div className="mt-4 grid gap-2">
                  <button
                    type="button"
                    onClick={() => setFocusMode((value) => !value)}
                    className={cn(
                      "inline-flex h-11 items-center justify-center gap-2 rounded-[16px] px-4 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]",
                      focusMode
                        ? "bg-[var(--theme-primary)] text-white"
                        : "border border-slate-200 bg-white text-[var(--theme-ink)] hover:bg-[var(--theme-soft)]"
                    )}
                  >
                    <Sparkles className="h-4 w-4" />
                    {focusMode ? "Focus mode on" : "Turn on focus mode"}
                  </button>

                  <Link
                    href="/campaigns"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[16px] border border-slate-200 bg-white px-4 text-sm font-black text-[var(--theme-ink)] transition hover:bg-[var(--theme-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                  >
                    See support campaigns
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <Link
                  href="/campaigns"
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[16px] bg-[var(--theme-primary)] px-4 text-sm font-black text-white transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                >
                  View Campaigns
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="button"
            type="button"
            onClick={() => setIsOpen(true)}
            initial={reducedMotion ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -12 }}
            className="flex h-12 items-center gap-2 rounded-full border border-white/80 bg-white/88 px-4 text-xs font-black text-[var(--theme-ink)] shadow-[0_18px_60px_rgba(7,17,31,0.15)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-[var(--theme-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
            aria-label="Open student application companion"
          >
            <GraduationCap className="h-4 w-4 text-[var(--theme-primary)]" />
            Application
            <span className="rounded-full bg-[var(--theme-soft)] px-2 py-1 text-[10px] text-[var(--theme-primary)]">
              {progress}%
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  );
}
