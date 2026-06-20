import { cn } from "@/lib/cn";

interface SectionShellProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly children: React.ReactNode;
  readonly id?: string;
  readonly className?: string;
  readonly contentClassName?: string;
  readonly dark?: boolean;
}

export function SectionShell({
  eyebrow,
  title,
  description,
  children,
  id,
  className,
  contentClassName,
  dark = false
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden px-6 py-20 sm:px-8 lg:px-12",
        dark ? "bg-slate-950 text-white" : "text-slate-950",
        className
      )}
    >
      {dark ? (
        <>
          <div aria-hidden="true" className="kaggle-grid absolute inset-0 opacity-20" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(37,99,235,0.32),transparent_28%),radial-gradient(circle_at_88%_16%,rgba(6,182,212,0.24),transparent_26%)]"
          />
        </>
      ) : null}

      <div className={cn("relative mx-auto max-w-7xl", contentClassName)}>
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            {eyebrow ? (
              <p
                className={cn(
                  "text-sm font-bold uppercase tracking-[0.18em]",
                  dark ? "text-cyan-300" : "text-blue-600"
                )}
              >
                {eyebrow}
              </p>
            ) : null}

            <h2
              className={cn(
                "mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl",
                dark ? "text-white" : "text-slate-950"
              )}
            >
              {title}
            </h2>
          </div>

          {description ? (
            <p
              className={cn(
                "max-w-xl text-sm leading-6",
                dark ? "text-white/64" : "text-slate-600"
              )}
            >
              {description}
            </p>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}