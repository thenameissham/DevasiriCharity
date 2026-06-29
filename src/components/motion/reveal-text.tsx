"use client";

import { motion } from "framer-motion";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

interface RevealTextProps {
  readonly text: string;
  readonly className?: string;
  readonly as?: "h1" | "h2" | "h3" | "p";
}

export function RevealText({
  text,
  className,
  as: Tag = "h2"
}: RevealTextProps) {
  const { reducedMotion } = useMotionExperience();
  const words = text.split(" ");

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn("overflow-hidden", className)}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block pr-[0.22em]"
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: Math.min(index * 0.045, 0.65),
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
