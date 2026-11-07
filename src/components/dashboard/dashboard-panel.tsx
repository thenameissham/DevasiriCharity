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
  className,
}: DashboardPanelProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-[#d1d9e0] bg-white p-5 sm:p-6",
        className,
      )}
    >
      <div className="mb-5 border-b border-[#d8dee4] pb-4">
        <h2 className="text-lg font-semibold tracking-tight text-[#1f2328]">
          {title}
        </h2>
        {description ? (
          <p className="mt-1.5 text-sm leading-6 text-[#59636e]">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
