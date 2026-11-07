/** Shared, side-effect-free presentation helpers for public campaign UI. */

export function formatINRFromPaise(value: number): string {
  const amount = Number.isFinite(value) ? value : 0;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount / 100);
}

export function getCampaignProgress(
  raisedAmountPaise: number,
  goalAmountPaise: number,
): number {
  if (
    !Number.isFinite(raisedAmountPaise) ||
    !Number.isFinite(goalAmountPaise) ||
    goalAmountPaise <= 0
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(100, Math.round((raisedAmountPaise / goalAmountPaise) * 100)),
  );
}

export function formatSuccessfulDonationCount(count: number): string {
  const safeCount = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
  return `${safeCount.toLocaleString("en-IN")} ${safeCount === 1 ? "successful donation" : "successful donations"}`;
}

export function formatCampaignDate(
  value: Date | string | null | undefined,
  month: "short" | "long" = "short",
): string | null {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month,
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function getCampaignDateLabel(
  startDate: Date | string | null | undefined,
  endDate: Date | string | null | undefined,
  month: "short" | "long" = "short",
): string | null {
  const start = formatCampaignDate(startDate, month);
  const end = formatCampaignDate(endDate, month);

  if (start && end) return `Starts ${start} · Ends ${end}`;
  if (start) return `Starts ${start}`;
  if (end) return `Ends ${end}`;
  return null;
}
