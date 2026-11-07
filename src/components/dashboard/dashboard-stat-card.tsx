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
  blue: "bg-[#ddf4ff] text-[#0969da]",
  emerald: "bg-[#dafbe1] text-[#1a7f37]",
  amber: "bg-[#fff8c5] text-[#9a6700]",
  rose: "bg-[#ffebe9] text-[#cf222e]",
  slate: "bg-[#f6f8fa] text-[#59636e]",
} as const;

export function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "blue",
}: DashboardStatCardProps) {
  return (
    <article className="min-w-0 rounded-lg border border-[#d1d9e0] bg-white p-5 transition-colors hover:border-[#afb8c1]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#59636e]">{title}</p>
          <p className="mt-2 break-words text-3xl font-semibold tracking-tight text-[#1f2328]">
            {value}
          </p>
        </div>
        <span
          className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-md", toneStyles[tone])}
        >
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-sm leading-5 text-[#59636e]">{description}</p>
    </article>
  );
}
