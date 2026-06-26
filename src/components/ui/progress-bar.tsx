import { cn } from "@/lib/cn";

interface ProgressBarProps {
  readonly value: number;
  readonly label: string;
  readonly helperText?: string;
  readonly className?: string;
}

export function ProgressBar({
  value,
  label,
  helperText,
  className
}: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="text-sm font-bold text-blue-600">{safeValue}%</p>
      </div>

      <div
        aria-label={label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={safeValue}
        role="progressbar"
        className="h-3 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>

      {helperText ? (
        <p className="mt-2 text-xs font-medium text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}