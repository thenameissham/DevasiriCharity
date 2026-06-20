"use client";

import { useEffect, useState } from "react";

interface DataNodeProps {
  readonly label: string;
  readonly value: number;
  readonly suffix?: string;
  readonly prefix?: string;
}

export function DataNode({ label, value, suffix = "", prefix = "" }: DataNodeProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <div className="glass-card rounded-[24px] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-[-0.04em] text-slate-950">
        {prefix}
        {displayValue.toLocaleString("en-IN")}
        {suffix}
      </p>
    </div>
  );
}