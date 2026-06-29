"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { cn } from "@/lib/cn";

interface SharedAuthTriggerProps {
  readonly children: ReactNode;
  readonly intent?: "branch" | "login" | "signup";
  readonly className?: string;
  readonly ariaLabel?: string;
}

export function SharedAuthTrigger({
  children,
  intent = "branch",
  className,
  ariaLabel
}: SharedAuthTriggerProps) {
  const { openAuthOverlay } = useMotionExperience();

  return (
    <motion.div layoutId="devasiri-shared-auth" className="inline-flex">
      <MagneticButton
        type="button"
        aria-label={ariaLabel}
        onClick={() => openAuthOverlay(intent)}
        className={cn(
          "inline-flex h-13 items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-7 text-sm font-black text-white shadow-[0_20px_55px_rgba(37,99,235,0.26)] transition hover:bg-blue-700",
          className
        )}
      >
        {children}
      </MagneticButton>
    </motion.div>
  );
}
