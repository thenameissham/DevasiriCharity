export function formatCurrencyINR(amountInPaise: number): string {
  const amountInRupees = amountInPaise / 100;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amountInRupees);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0
  }).format(value);
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

export function calculatePercentage(current: number, target: number): number {
  if (target <= 0) return 0;

  return Math.min(100, Math.max(0, Math.round((current / target) * 100)));
}