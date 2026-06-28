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
        "relative isolate min-h-screen overflow-hidden bg-[#fbf7ef]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,#fffaf2_0%,#f7fbf8_42%,#eaf7f4_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-420px] h-[860px] w-[1180px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.22),rgba(245,158,11,0.12)_42%,transparent_70%)] blur-[22px]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-52 top-16 h-[620px] w-[620px] rounded-full bg-teal-400/18 blur-[110px] devasiri-float-slow"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-260px] top-32 h-[760px] w-[760px] rounded-full bg-amber-300/20 blur-[120px] devasiri-float-medium"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-[-280px] left-1/2 h-[620px] w-[1180px] -translate-x-1/2 rounded-full bg-slate-950/[0.07] blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 devasiri-premium-grid opacity-65"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#fffaf2]/95 to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white/85 to-transparent"
      />

      <div className="relative z-10">{children}</div>
    </section>
  );
}
