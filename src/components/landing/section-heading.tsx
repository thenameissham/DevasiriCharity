import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: "left" | "center";
  readonly tone?: "light" | "dark";
  readonly className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.2em]",
          isDark
            ? "border-white/15 bg-white/[0.08] text-[#9ce5d8]"
            : "border-[var(--theme-border)] bg-white/75 text-[var(--theme-primary)] shadow-sm backdrop-blur-xl",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            isDark
              ? "bg-[#e3b45e]"
              : "bg-[var(--theme-accent)]",
          )}
        />

        {eyebrow}
      </div>

      <h2
        className={cn(
          "font-headline text-balance mt-5 text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-5xl lg:text-6xl",
          isDark
            ? "text-white"
            : "text-[var(--theme-ink)]",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-8 sm:text-lg",
            isDark
              ? "text-white/68"
              : "text-[#607071]",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
