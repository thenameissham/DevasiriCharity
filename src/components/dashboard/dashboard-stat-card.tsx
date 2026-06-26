import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface DashboardStatCardProps {
  readonly title: string;
  readonly value: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly tone?: "blue" | "emerald" | "amber" | "rose" | "slate";
}

const toneStyles = {
  blue: "bg-blue-50 text-blue-600 ring-blue-100",
  emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  amber: "bg-amber-50 text-amber-600 ring-amber-100",
  rose: "bg-rose-50 text-rose-600 ring-rose-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200"
} as const;

export function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "blue"
}: DashboardStatCardProps) {
  return (
    <article className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-3 text-4xl font-black tracking-[-0.06em] text-slate-950">
            {value}
          </p>
        </div>

        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] ring-1",
            toneStyles[tone]
          )}
        >
          <Icon aria-hidden="true" className="h-6 w-6" />
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}