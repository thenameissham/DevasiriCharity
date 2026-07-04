import { cn } from "@/lib/cn";

interface BrandBackgroundProps {
  readonly className?: string;
  readonly tone?: "light" | "dark";
  readonly grid?: boolean;
}

export function BrandBackground({
  className,
  tone = "light",
  grid = true,
}: BrandBackgroundProps) {
  const isDark = tone === "dark";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          isDark
            ? "bg-[linear-gradient(145deg,#061b1d_0%,#0a292b_48%,#071719_100%)]"
            : "bg-[linear-gradient(180deg,#fffdf8_0%,#f7fbf8_54%,#eef7f2_100%)]",
        )}
      />

      <div
        className={cn(
          "absolute -left-[22%] -top-[32%] h-[720px] w-[720px] rounded-full blur-[120px]",
          isDark ? "bg-emerald-500/18" : "bg-emerald-300/30",
        )}
      />

      <div
        className={cn(
          "absolute -right-[24%] -top-[22%] h-[680px] w-[680px] rounded-full blur-[120px]",
          isDark ? "bg-amber-400/12" : "bg-amber-200/35",
        )}
      />

      <div
        className={cn(
          "absolute bottom-[-260px] left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-[50%] blur-[90px]",
          isDark ? "bg-teal-500/10" : "bg-teal-200/25",
        )}
      />

      <div className="ambient-flow" />

      <div className="ambient-ribbon" />

      {grid ? (
        <div
          className={cn(
            "brand-grid absolute inset-0",
            isDark ? "opacity-20" : "opacity-70",
          )}
        />
      ) : null}

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t to-transparent",
          isDark ? "from-[#07191b]" : "from-[#f8faf7]",
        )}
      />
    </div>
  );
}
