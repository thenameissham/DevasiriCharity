"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

const applicationSteps = [
  {
    id: "identity",
    label: "Identity",
    description: "Student and applicant basics"
  },
  {
    id: "contact",
    label: "Contact",
    description: "Reachable email and mobile"
  },
  {
    id: "education",
    label: "Education",
    description: "College, course, and academic details"
  },
  {
    id: "support",
    label: "Support Need",
    description: "Fee, hostel, sponsorship, or emergency need"
  },
  {
    id: "documents",
    label: "Documents",
    description: "Proofs for review and verification"
  },
  {
    id: "review",
    label: "Review",
    description: "Confirm details before submission"
  },
  {
    id: "submitted",
    label: "Submitted",
    description: "Application received by the team"
  }
] as const;

function getCurrentStepFromPath(pathname: string): string {
  if (pathname.includes("/success")) return "submitted";
  if (pathname.includes("/start")) return "education";
  if (pathname.includes("/apply")) return "identity";

  return "identity";
}

export function ApplicationJourneyAssistant() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const { reducedMotion } = useMotionExperience();

  const shouldShow = pathname === "/apply" || pathname.startsWith("/apply/");
  const currentStepId = useMemo(() => getCurrentStepFromPath(pathname), [pathname]);

  const currentIndex = Math.max(
    applicationSteps.findIndex((step) => step.id === currentStepId),
    0
  );

  const progress =
    applicationSteps.length <= 1
      ? 100
      : Math.round((currentIndex / (applicationSteps.length - 1)) * 100);

  if (!shouldShow) return null;

  return (
    <aside className="fixed bottom-5 right-4 z-[9990] w-[min(430px,calc(100vw-2rem))] lg:right-6">
      <motion.div
        initial={false}
        animate={
          isOpen
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 18, scale: 0.96 }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 220, damping: 24 }
        }
        className={cn(!isOpen && "pointer-events-none")}
      >
        <div className="relative overflow-hidden rounded-[36px] border border-white/80 bg-slate-950/92 p-5 text-white shadow-[0_38px_120px_rgba(15,23,42,0.28)] backdrop-blur-2xl">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
          />

          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black text-cyan-100 ring-1 ring-white/10">
                  <Sparkles className="h-3.5 w-3.5" />
                  Application mission
                </div>

                <h2 className="mt-3 text-2xl font-black tracking-[-0.065em]">
                  Student journey console
                </h2>

                <p className="mt-1 text-xs leading-5 text-white/58">
                  Step {currentIndex + 1} of {applicationSteps.length} • {progress}% complete
                </p>
              </div>

              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/10">
                <svg className="absolute inset-0 h-16 w-16 -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="27"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="27"
                    stroke="rgb(103,232,249)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={169.65}
                    initial={false}
                    animate={{
                      strokeDashoffset: 169.65 - (169.65 * progress) / 100
                    }}
                    transition={{ duration: reducedMotion ? 0 : 0.6 }}
                  />
                </svg>

                <span className="relative text-sm font-black text-cyan-100">
                  {progress}%
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {applicationSteps.map((step, index) => {
                const completed = index < currentIndex;
                const active = index === currentIndex;

                return (
                  <div key={step.id} className="relative grid grid-cols-[34px_1fr] gap-3">
                    {index < applicationSteps.length - 1 ? (
                      <div
                        aria-hidden="true"
                        className="absolute left-[16px] top-9 h-[calc(100%+0.75rem)] w-px bg-white/10"
                      >
                        <motion.div
                          className="w-px bg-gradient-to-b from-cyan-300 to-emerald-300"
                          initial={false}
                          animate={{ height: completed ? "100%" : active ? "48%" : "0%" }}
                          transition={{ duration: reducedMotion ? 0 : 0.55 }}
                        />
                      </div>
                    ) : null}

                    <div
                      className={cn(
                        "relative z-10 flex h-8 w-8 items-center justify-center rounded-[13px] border",
                        completed && "border-emerald-300/40 bg-emerald-300/20 text-emerald-200",
                        active && "border-cyan-300/50 bg-cyan-300/20 text-cyan-100 shadow-[0_0_32px_rgba(103,232,249,0.24)]",
                        !completed && !active && "border-white/10 bg-white/6 text-white/35"
                      )}
                      aria-current={active ? "step" : undefined}
                    >
                      {completed ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : active ? (
                        <Sparkles className="h-4 w-4" />
                      ) : (
                        <span className="text-[11px] font-black">{index + 1}</span>
                      )}
                    </div>

                    <div
                      className={cn(
                        "rounded-[18px] px-3 py-2 ring-1 transition",
                        active && "bg-white/10 ring-cyan-300/20",
                        completed && "bg-emerald-300/8 ring-emerald-300/15",
                        !active && !completed && "bg-white/[0.035] ring-white/8"
                      )}
                    >
                      <p
                        className={cn(
                          "text-sm font-black tracking-[-0.025em]",
                          active ? "text-white" : completed ? "text-emerald-50" : "text-white/45"
                        )}
                      >
                        {step.label}
                      </p>

                      <p
                        className={cn(
                          "mt-0.5 text-xs leading-5",
                          active ? "text-cyan-50/70" : completed ? "text-emerald-50/55" : "text-white/32"
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[20px] border border-white/70 bg-white/88 px-5 text-sm font-black text-slate-800 shadow-[0_18px_55px_rgba(15,23,42,0.13)] backdrop-blur-2xl transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Hide student journey console" : "Show student journey console"}
      >
        {isOpen ? (
          <>
            <X className="h-4 w-4" />
            Hide journey console
          </>
        ) : (
          <>
            <GraduationCap className="h-4 w-4 text-blue-600" />
            Show journey console
            <ChevronDown className="h-4 w-4 rotate-180" />
          </>
        )}
      </button>
    </aside>
  );
}
