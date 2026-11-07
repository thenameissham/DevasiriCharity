import assert from "node:assert/strict";
import test from "node:test";
import { parseStudentApplicationFormData } from "./student-application.schemas";

function makeValidForm(overrides: Record<string, string> = {}): FormData {
  const form = new FormData();
  const values: Record<string, string> = {
    fullName: "Asha Student",
    email: "asha@example.com",
    phone: "9876543210",
    district: "Bengaluru Urban",
    courseType: "B.E. / B.Tech",
    courseName: "Computer Science",
    collegeName: "Dr. Ambedkar Institute of Technology",
    currentYear: "2nd Year",
    annualFeeRupees: "100000",
    paidAmountRupees: "0",
    requestedAmountRupees: "50000",
    needStatement: "I need educational financial support to continue my studies.",
    consentAccepted: "on",
    ...overrides
  };

  for (const [key, value] of Object.entries(values)) form.set(key, value);
  return form;
}

test("blank optional family income is stored as undefined, not zero", () => {
  const data = parseStudentApplicationFormData(
    makeValidForm({ familyIncomeRupees: "" }),
  );
  assert.equal(data.familyIncomeRupees, undefined);
});

test("empty optional date of birth is accepted", () => {
  const data = parseStudentApplicationFormData(makeValidForm({ dateOfBirth: "" }));
  assert.equal(data.dateOfBirth, undefined);
});

test("malformed or impossible dates of birth are rejected", () => {
  assert.throws(() => parseStudentApplicationFormData(makeValidForm({ dateOfBirth: "2025-02-30" })));
  assert.throws(() => parseStudentApplicationFormData(makeValidForm({ dateOfBirth: "not-a-date" })));
});

test("future dates of birth are rejected", () => {
  assert.throws(() => parseStudentApplicationFormData(makeValidForm({ dateOfBirth: "2999-01-01" })));
});

test("document links must use HTTPS", () => {
  assert.throws(() => parseStudentApplicationFormData(makeValidForm({ admissionProofUrl: "http://example.com/document.pdf" })));
  const data = parseStudentApplicationFormData(makeValidForm({ admissionProofUrl: "https://example.com/document.pdf" }));
  assert.equal(data.admissionProofUrl, "https://example.com/document.pdf");
});

test("other-support details are required when other support is selected", () => {
  assert.throws(() => parseStudentApplicationFormData(makeValidForm({ receivesOtherSupport: "on" })));
  const data = parseStudentApplicationFormData(
    makeValidForm({ receivesOtherSupport: "on", otherSupportDetails: "University fee waiver." }),
  );
  assert.equal(data.receivesOtherSupport, true);
});
