import { cn } from "@/lib/cn";

interface HeroVideoBackgroundProps {
  readonly videoSrc?: string;
  readonly posterSrc?: string;
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function HeroVideoBackground({
  videoSrc = "/media/devasiri-education-bg.mp4",
  posterSrc,
  className,
  children
}: HeroVideoBackgroundProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#f8fbff]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_8%_8%,rgba(37,99,235,0.18),transparent_30%),radial-gradient(circle_at_88%_10%,rgba(6,182,212,0.16),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fbff_48%,#eef5ff_100%)]"
      />

      <video
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.18] mix-blend-multiply"
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.86)_42%,rgba(255,255,255,0.55)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 devasiri-grid-mask opacity-70"
      />

      <div
        aria-hidden="true"
        className="absolute -left-28 top-28 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl devasiri-float-slow"
      />

      <div
        aria-hidden="true"
        className="absolute -right-24 top-36 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl devasiri-float-medium"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 h-56 w-[70vw] -translate-x-1/2 rounded-full bg-slate-900/[0.045] blur-3xl"
      />

      <div className="relative z-10">{children}</div>
    </section>
  );
}
