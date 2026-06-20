import { cn } from "@/lib/cn";

interface SkeletonProps {
  readonly className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-[16px] bg-slate-200",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[skeleton-shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent",
        className
      )}
    />
  );
}