import Image from "next/image";
import { cn } from "@/lib/cn";

interface EducationHeroArtworkProps {
  readonly src: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
  readonly priority?: boolean;
  readonly sizes?: string;
  readonly className?: string;
}

/**
 * A restrained, reusable frame for education-focused hero illustrations.
 * Keep explanatory labels in the page's content flow rather than overlaying
 * the artwork, so the visual remains clear at every responsive breakpoint.
 */
export function EducationHeroArtwork({
  src,
  alt,
  width = 900,
  height = 700,
  priority = false,
  sizes = "(min-width: 1024px) 46vw, (min-width: 640px) 80vw, 100vw",
  className,
}: EducationHeroArtworkProps) {
  return (
    <figure className={cn("mx-auto w-full max-w-[590px]", className)}>
      <div className="overflow-hidden rounded-2xl border border-[#d0d7de] bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/60 p-2 shadow-[0_4px_12px_rgba(31,35,40,0.045)] sm:rounded-3xl sm:p-3">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full rounded-xl object-contain"
        />
      </div>
    </figure>
  );
}
