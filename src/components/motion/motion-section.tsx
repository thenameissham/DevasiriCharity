"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

interface MotionSectionProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
}

export function MotionSection({ children, className, id }: MotionSectionProps) {
  const { reducedMotion } = useMotionExperience();

  return (
    <motion.section
      id={id}
      className={cn(className)}
      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
