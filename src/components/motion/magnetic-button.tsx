"use client";

import {
  useRef,
  type ButtonHTMLAttributes,
  type MouseEvent
} from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

interface MagneticButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly strength?: number;
}

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export function MagneticButton({
  children,
  className,
  strength = 0.18,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const frame = useRef<number | null>(null);
  const { reducedMotion } = useMotionExperience();

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    onMouseMove?.(event);

    if (reducedMotion || isTouchDevice()) return;

    const element = ref.current;
    if (!element) return;

    if (frame.current) {
      cancelAnimationFrame(frame.current);
    }

    frame.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      element.style.transform = `translate3d(${x * strength}px, ${
        y * strength
      }px, 0)`;
    });
  }

  function handleMouseLeave(event: MouseEvent<HTMLButtonElement>) {
    onMouseLeave?.(event);

    const element = ref.current;
    if (!element) return;

    element.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "transition-transform duration-200 will-change-transform focus:outline-none focus:ring-4 focus:ring-blue-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
