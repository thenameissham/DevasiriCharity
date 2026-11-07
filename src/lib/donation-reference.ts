import { randomBytes } from "node:crypto";

/**
 * Create a non-sequential, high-entropy public reference for a donation intent.
 * The reference is an identifier, not proof of payment or a tax receipt.
 */
export function createDonationReference(now: Date = new Date()): string {
  const year = now.getUTCFullYear();
  const token = randomBytes(16).toString("hex").toUpperCase();

  return `DSD-${year}-${token}`;
}
