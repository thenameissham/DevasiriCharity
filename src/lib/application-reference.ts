import { randomBytes } from "node:crypto";

/**
 * Creates a non-sequential, high-entropy reference suitable for displaying to
 * applicants. This reference is an identifier, not an authorization token.
 */
export function createStudentApplicationReference(
  year = new Date().getFullYear(),
): string {
  if (!Number.isInteger(year) || year < 2000 || year > 9999) {
    throw new RangeError("Application reference year must be a four-digit year.");
  }

  return `DSA-${year}-${randomBytes(12).toString("hex").toUpperCase()}`;
}
