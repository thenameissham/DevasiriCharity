"use client";

import { Activity, PauseCircle } from "lucide-react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

export function ReduceMotionToggle() {
  const { reducedMotion, setReducedMotion } = useMotionExperience();

  return (
    <button
      type="button"
      onClick={() => setReducedMotion(!reducedMotion)}
      className={cn(
        "fixed bottom-4 left-4 z-[9998] inline-flex h-11 items-center gap-2 rounded-full border px-4 text-xs font-black shadow-[0_18px_55px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition focus:outline-none focus:ring-4 focus:ring-blue-100",
        reducedMotion
          ? "border-slate-200 bg-white/90 text-slate-700"
          : "border-blue-100 bg-blue-600/90 text-white"
      )}
      aria-pressed={reducedMotion}
      aria-label={
        reducedMotion ? "Enable premium motion" : "Reduce premium motion"
      }
    >
      {reducedMotion ? (
        <PauseCircle className="h-4 w-4" />
      ) : (
        <Activity className="h-4 w-4" />
      )}
      {reducedMotion ? "Motion reduced" : "Motion on"}
    </button>
  );
}
