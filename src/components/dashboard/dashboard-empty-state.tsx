import type { LucideIcon } from "lucide-react";

interface DashboardEmptyStateProps {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

export function DashboardEmptyState({
  title,
  description,
  icon: Icon
}: DashboardEmptyStateProps) {
  return (
    <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50/80 p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-slate-500 shadow-sm">
        <Icon aria-hidden="true" className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-base font-bold tracking-[-0.03em] text-slate-950">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}