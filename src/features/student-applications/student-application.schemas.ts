import { z } from "zod";
import { stripUnsafeText } from "@/lib/slug";

export const applicationStatusSchema = z.enum([
  "SUBMITTED",
  "UNDER_REVIEW",
  "DOCUMENTS_PENDING",
  "VERIFIED",
  "APPROVED",
  "REJECTED",
  "FUNDED",
  "DISBURSED"
]);

const rupeesSchema = z.coerce.number().finite().min(0).max(10_000_000);

const optionalRupeesSchema = z.preprocess(
  (value) => (value === "" || value === null || value === undefined ? undefined : value),
  rupeesSchema.optional(),
);

const optionalText = z
  .string()
  .optional()
  .transform((value) => {
    const clean = stripUnsafeText(value ?? "");
    return clean.length > 0 ? clean : undefined;
  });

const optionalUrl = z.preprocess(
  (value) => (value === "" || value === null || value === undefined ? undefined : value),
  z
    .string()
    .trim()
    .url("Document link must be a valid URL.")
    .refine((value) => {
      try {
        return new URL(value).protocol === "https:";
      } catch {
        return false;
      }
    }, "Document links must use HTTPS.")
    .optional(),
);

function isCalendarDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

const optionalDateOfBirth = z.preprocess(
  (value) => (value === "" || value === null || value === undefined ? undefined : value),
  z
    .string()
    .refine(isCalendarDate, "Enter a valid date of birth.")
    .refine((value) => value <= new Date().toISOString().slice(0, 10), {
      message: "Date of birth cannot be in the future."
    })
    .transform((value) => new Date(`${value}T00:00:00.000Z`))
    .optional(),
);

export const studentApplicationFormSchema = z
  .object({
    fullName: z.string().trim().min(3).max(120).transform(stripUnsafeText),
    email: z.string().email().transform((value) => value.toLowerCase().trim()),
    phone: z.string().trim().min(10).max(15).transform(stripUnsafeText),

    dateOfBirth: optionalDateOfBirth,
    gender: optionalText,

    district: z.string().trim().min(2).max(80).transform(stripUnsafeText),
    taluk: optionalText,
    address: optionalText,

    courseType: z.string().trim().min(2).max(80).transform(stripUnsafeText),
    courseName: z.string().trim().min(2).max(120).transform(stripUnsafeText),
    collegeName: z.string().trim().min(3).max(180).transform(stripUnsafeText),
    university: optionalText,
    currentYear: z.string().trim().min(1).max(40).transform(stripUnsafeText),
    currentSemester: optionalText,
    admissionNumber: optionalText,
    usn: optionalText,

    entranceExam: optionalText,
    entranceRank: optionalText,
    previousPercentage: optionalText,

    annualFeeRupees: rupeesSchema.min(1000),
    paidAmountRupees: rupeesSchema,
    requestedAmountRupees: rupeesSchema.min(500),

    familyIncomeRupees: optionalRupeesSchema,
    incomeCertificateNo: optionalText,

    receivesSsp: z.string().optional().transform((value) => value === "on"),
    receivesVidyasiri: z.string().optional().transform((value) => value === "on"),
    receivesOtherSupport: z.string().optional().transform((value) => value === "on"),
    otherSupportDetails: optionalText,

    aadhaarLast4: z
      .string()
      .optional()
      .transform((value) => {
        const clean = stripUnsafeText(value ?? "");
        return clean.length > 0 ? clean : undefined;
      })
      .refine((value) => !value || /^[0-9]{4}$/.test(value), {
        message: "Enter only last 4 digits of Aadhaar."
      }),

    admissionProofUrl: optionalUrl,
    feeStructureUrl: optionalUrl,
    incomeCertificateUrl: optionalUrl,
    marksCardUrl: optionalUrl,

    needStatement: z.string().trim().min(30).max(2000).transform(stripUnsafeText),

    consentAccepted: z
      .string()
      .optional()
      .transform((value) => value === "on")
      .refine((value) => value, {
        message: "Consent is required before submitting."
      })
  })
  .superRefine((data, context) => {
    if (data.receivesOtherSupport && !data.otherSupportDetails) {
      context.addIssue({
        code: "custom",
        path: ["otherSupportDetails"],
        message: "Please describe the other support you receive."
      });
    }
  });

export const applicationStatusUpdateSchema = z.object({
  applicationId: z.string().uuid(),
  currentStatus: applicationStatusSchema,
  status: applicationStatusSchema,
  adminNotes: optionalText
});

export type StudentApplicationFormInput = z.infer<
  typeof studentApplicationFormSchema
>;

export function parseStudentApplicationFormData(
  formData: FormData
): StudentApplicationFormInput {
  return studentApplicationFormSchema.parse(Object.fromEntries(formData.entries()));
}
