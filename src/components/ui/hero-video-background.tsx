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
        className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_38%,#edf6ff_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-48 top-0 h-[640px] w-[640px] rounded-full bg-blue-400/24 blur-[110px] devasiri-float-slow"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-220px] top-20 h-[700px] w-[700px] rounded-full bg-cyan-300/26 blur-[115px] devasiri-float-medium"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-[-260px] left-1/2 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-slate-950/[0.07] blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 devasiri-grid-mask opacity-55"
      />

      <div
        aria-hidden="true"
        className="absolute left-[6%] top-[30%] h-28 w-28 rotate-6 rounded-[34px] border border-blue-200/60 bg-white/34 shadow-[0_24px_80px_rgba(37,99,235,0.14)] backdrop-blur-xl devasiri-float-medium"
      />

      <div
        aria-hidden="true"
        className="absolute right-[7%] top-[25%] h-24 w-24 rounded-full border border-cyan-200/60 bg-white/32 shadow-[0_24px_80px_rgba(6,182,212,0.14)] backdrop-blur-xl devasiri-float-slow"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-[16%] right-[18%] h-32 w-32 -rotate-6 rounded-[40px] border border-emerald-200/60 bg-white/30 shadow-[0_24px_80px_rgba(16,185,129,0.12)] backdrop-blur-xl devasiri-float-medium"
      />

      <div className="relative z-10">{children}</div>
    </section>
  );
}
