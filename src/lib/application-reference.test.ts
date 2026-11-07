import assert from "node:assert/strict";
import test from "node:test";
import { createStudentApplicationReference } from "./application-reference";

test("student application references use the expected public format", () => {
  const reference = createStudentApplicationReference(2026);
  assert.match(reference, /^DSA-2026-[A-F0-9]{24}$/);
});

test("student application references are unique across a sample", () => {
  const references = new Set(
    Array.from({ length: 250 }, () => createStudentApplicationReference(2026)),
  );

  assert.equal(references.size, 250);
});

test("application references reject invalid years", () => {
  assert.throws(() => createStudentApplicationReference(99), RangeError);
});
