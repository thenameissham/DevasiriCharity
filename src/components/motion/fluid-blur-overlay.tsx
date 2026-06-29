"use client";

import { motion } from "framer-motion";
import { useMotionExperience } from "@/components/motion/motion-provider";

interface FluidBlurOverlayProps {
  readonly isVisible: boolean;
}

export function FluidBlurOverlay({ isVisible }: FluidBlurOverlayProps) {
  const { reducedMotion } = useMotionExperience();

  if (!isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[9997] bg-slate-950/24 backdrop-blur-[18px]"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
    />
  );
}
