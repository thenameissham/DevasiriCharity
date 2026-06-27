import { cn } from "@/lib/cn";

interface HeroVideoBackgroundProps {
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function HeroVideoBackground({
  className,
  children
}: HeroVideoBackgroundProps) {
  return (
    <section
      className={cn(
        "relative isolate min-h-screen overflow-hidden bg-[#f7fbff]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_42%,#edf6ff_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-blue-300/28 blur-[90px] devasiri-float-slow"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-180px] top-20 h-[620px] w-[620px] rounded-full bg-cyan-300/28 blur-[100px] devasiri-float-medium"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-[-220px] left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-slate-900/[0.055] blur-[90px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.64)_72%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 devasiri-grid-mask opacity-55"
      />

      <div
        aria-hidden="true"
        className="absolute left-[8%] top-[28%] h-24 w-24 rounded-[32px] border border-blue-200/50 bg-white/34 shadow-[0_24px_70px_rgba(37,99,235,0.12)] backdrop-blur-xl devasiri-float-medium"
      />

      <div
        aria-hidden="true"
        className="absolute right-[9%] top-[24%] h-20 w-20 rotate-12 rounded-full border border-cyan-200/50 bg-white/34 shadow-[0_24px_70px_rgba(6,182,212,0.12)] backdrop-blur-xl devasiri-float-slow"
      />

      <div
        aria-hidden="true"
        className="absolute right-[20%] bottom-[18%] h-28 w-28 rounded-[36px] border border-emerald-200/50 bg-white/30 shadow-[0_24px_70px_rgba(16,185,129,0.1)] backdrop-blur-xl devasiri-float-medium"
      />

      <div className="relative z-10">{children}</div>
    </section>
  );
}
