import Image from "next/image";
import { cn } from "@/lib/cn";

interface FloatingIllustrationProps {
  readonly src: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
  readonly className?: string;
  readonly priority?: boolean;
}

export function FloatingIllustration({
  src,
  alt,
  width = 900,
  height = 675,
  className,
  priority = false
}: FloatingIllustrationProps) {
  return (
    <div className={cn("relative pointer-events-none select-none", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-x-8 bottom-4 h-20 rounded-full bg-slate-900/5 blur-3xl"
      />

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="relative h-auto w-full object-contain drop-shadow-[0_34px_48px_rgba(15,23,42,0.08)]"
      />
    </div>
  );
}