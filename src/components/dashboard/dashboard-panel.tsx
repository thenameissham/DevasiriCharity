import { cn } from "@/lib/cn";

interface DashboardPanelProps {
  readonly title: string;
  readonly description?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function DashboardPanel({
  title,
  description,
  children,
  className
}: DashboardPanelProps) {
  return (
    <section
      className={cn(
        "rounded-[32px] border border-slate-200 bg-white/82 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl",
        className
      )}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-[-0.04em] text-slate-950">
          {title}
        </h2>

        {description ? (
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </section>
  );
}