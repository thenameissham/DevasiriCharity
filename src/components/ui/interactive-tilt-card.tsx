"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface InteractiveTiltCardProps {
  readonly children: ReactNode;
  readonly className?: string;
}

interface SpotlightStyle extends CSSProperties {
  "--mouse-x"?: string;
  "--mouse-y"?: string;
  "--rotate-x"?: string;
  "--rotate-y"?: string;
}

export function InteractiveTiltCard({
  children,
  className
}: InteractiveTiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 5;
    const rotateX = ((y / rect.height) - 0.5) * -5;

    element.style.setProperty("--mouse-x", `${x}px`);
    element.style.setProperty("--mouse-y", `${y}px`);
    element.style.setProperty("--rotate-x", `${rotateX}deg`);
    element.style.setProperty("--rotate-y", `${rotateY}deg`);
  }

  function handlePointerLeave() {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty("--rotate-x", "0deg");
    element.style.setProperty("--rotate-y", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          "--rotate-x": "0deg",
          "--rotate-y": "0deg"
        } as SpotlightStyle
      }
      className={cn(
        "group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/64 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition duration-300 will-change-transform",
        "hover:-translate-y-1 hover:shadow-[0_34px_90px_rgba(37,99,235,0.14)]",
        "[transform:perspective(900px)_rotateX(var(--rotate-x))_rotateY(var(--rotate-y))]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mouse-x) var(--mouse-y), rgba(37,99,235,0.16), transparent 42%)"
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
      />

      <div className="relative">{children}</div>
    </div>
  );
}
