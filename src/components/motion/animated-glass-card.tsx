"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

interface AnimatedGlassCardProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function AnimatedGlassCard({
  children,
  className
}: AnimatedGlassCardProps) {
  const { reducedMotion } = useMotionExperience();

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-[30px] border border-white/70 bg-white/72 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl",
        className
      )}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -4,
              scale: 1.01
            }
      }
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.18),transparent_38%)] opacity-0 transition duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
