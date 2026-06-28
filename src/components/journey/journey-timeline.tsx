"use client";

import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import {
  useJourneyProgress,
  type JourneyStep
} from "@/components/journey/journey-progress-provider";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

interface JourneyTimelineProps {
  readonly className?: string;
}

function JourneyConnector({
  completed,
  active
}: {
  readonly completed: boolean;
  readonly active: boolean;
}) {
  const { reducedMotion } = useMotionExperience();

  return (
    <div className="relative ml-[17px] h-8 w-px overflow-hidden bg-slate-200">
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 w-px bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-400",
          completed ? "h-full" : active ? "h-1/2" : "h-0"
        )}
        initial={reducedMotion ? false : { height: 0 }}
        animate={{
          height: completed ? "100%" : active ? "50%" : "0%"
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function JourneyNode({
  step,
  index
}: {
  readonly step: JourneyStep;
  readonly index: number;
}) {
  const { isCompleted, isActive } = useJourneyProgress();
  const { reducedMotion } = useMotionExperience();

  const completed = isCompleted(step.id);
  const active = isActive(step.id);

  return (
    <motion.li
      className="relative"
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
    >
      <div
        className={cn(
          "grid grid-cols-[36px_1fr] gap-3 rounded-[20px] p-3 transition",
          active && "bg-blue-50/80 ring-1 ring-blue-100",
          completed && "bg-emerald-50/70 ring-1 ring-emerald-100"
        )}
      >
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-[15px] border shadow-sm transition",
            completed &&
              "border-emerald-200 bg-emerald-500 text-white shadow-[0_12px_30px_rgba(16,185,129,0.22)]",
            active &&
              "border-blue-200 bg-blue-600 text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)]",
            !completed &&
              !active &&
              "border-slate-200 bg-white text-slate-400"
          )}
          aria-current={active ? "step" : undefined}
        >
          {completed ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : active ? (
            <Sparkles className="h-4 w-4" />
          ) : (
            <Circle className="h-4 w-4" />
          )}
        </div>

        <div>
          <p
            className={cn(
              "text-sm font-black tracking-[-0.025em]",
              active || completed ? "text-slate-950" : "text-slate-500"
            )}
          >
            {step.label}
          </p>

          <p
            className={cn(
              "mt-1 text-xs leading-5",
              active || completed ? "text-slate-600" : "text-slate-400"
            )}
          >
            {step.description}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

export function JourneyTimeline({ className }: JourneyTimelineProps) {
  const { steps, currentIndex, progressPercent } = useJourneyProgress();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[30px] border border-white/70 bg-white/78 p-4 shadow-[0_26px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-300/20 blur-3xl"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
              Application Journey
            </p>

            <h2 className="mt-2 text-xl font-black tracking-[-0.055em] text-slate-950">
              Step {currentIndex + 1} of {steps.length}
            </h2>
          </div>

          <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 ring-1 ring-blue-100">
            {progressPercent}%
          </div>
        </div>

        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200"
          aria-hidden="true"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <ol className="mt-5">
          {steps.map((step, index) => (
            <div key={step.id}>
              <JourneyNode step={step} index={index} />
              {index < steps.length - 1 ? (
                <JourneyConnector
                  completed={index < currentIndex}
                  active={index === currentIndex}
                />
              ) : null}
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
}
