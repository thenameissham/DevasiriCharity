import { strict as assert } from "node:assert";
import { test } from "node:test";
import { createDonationReference } from "./donation-reference";

test("creates a stable-format reference with a 128-bit random token", () => {
  const reference = createDonationReference(new Date("2026-02-03T10:00:00.000Z"));

  assert.match(reference, /^DSD-2026-[A-F0-9]{32}$/);
});

test("generates distinct references for independent donation intents", () => {
  const references = new Set(
    Array.from({ length: 100 }, () => createDonationReference()),
  );

  assert.equal(references.size, 100);
});
