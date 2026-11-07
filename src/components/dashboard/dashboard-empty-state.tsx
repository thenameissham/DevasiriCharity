import type { LucideIcon } from "lucide-react";

interface DashboardEmptyStateProps {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
}

export function DashboardEmptyState({
  title,
  description,
  icon: Icon,
}: DashboardEmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-[#afb8c1] bg-[#f6f8fa] p-6 text-center sm:p-8">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg border border-[#d1d9e0] bg-white text-[#59636e]">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-[#1f2328]">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#59636e]">
        {description}
      </p>
    </div>
  );
}
