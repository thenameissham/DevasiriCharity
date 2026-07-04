import { cn } from "@/lib/cn";

interface GlassPanelProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly interactive?: boolean;
  readonly dark?: boolean;
}

export function GlassPanel({
  children,
  className,
  interactive = false,
  dark = false
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-[32px] border backdrop-blur-2xl",
        dark
          ? "border-white/10 bg-white/10 shadow-[0_32px_90px_rgba(0,0,0,0.32)]"
          : "border-slate-200/80 bg-white/76 shadow-[0_24px_80px_rgba(15,23,42,0.1)]",
        interactive &&
          "transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(15,23,42,0.14)]",
        className
      )}
    >
      {children}
    </div>
  );
}