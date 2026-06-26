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

const rupeesSchema = z.coerce.number().finite().min(0).max(10000000);

const optionalText = z
  .string()
  .optional()
  .transform((value) => {
    const clean = stripUnsafeText(value ?? "");
    return clean.length > 0 ? clean : undefined;
  });

const optionalUrl = z
  .string()
  .url("Document link must be a valid URL.")
  .optional()
  .or(z.literal(""))
  .transform((value) => {
    const clean = stripUnsafeText(value ?? "");
    return clean.length > 0 ? clean : undefined;
  });

export const studentApplicationFormSchema = z.object({
  fullName: z.string().min(3).max(120).transform(stripUnsafeText),
  email: z.string().email().transform((value) => value.toLowerCase().trim()),
  phone: z.string().min(10).max(15).transform(stripUnsafeText),

  dateOfBirth: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? undefined : date;
    }),

  gender: optionalText,

  district: z.string().min(2).max(80).transform(stripUnsafeText),
  taluk: optionalText,
  address: optionalText,

  courseType: z.string().min(2).max(80).transform(stripUnsafeText),
  courseName: z.string().min(2).max(120).transform(stripUnsafeText),
  collegeName: z.string().min(3).max(180).transform(stripUnsafeText),
  university: optionalText,
  currentYear: z.string().min(1).max(40).transform(stripUnsafeText),
  currentSemester: optionalText,
  admissionNumber: optionalText,
  usn: optionalText,

  entranceExam: optionalText,
  entranceRank: optionalText,
  previousPercentage: optionalText,

  annualFeeRupees: rupeesSchema.min(1000),
  paidAmountRupees: rupeesSchema,
  requestedAmountRupees: rupeesSchema.min(500),

  familyIncomeRupees: rupeesSchema.optional(),
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

  needStatement: z.string().min(30).max(2000).transform(stripUnsafeText),

  consentAccepted: z
    .string()
    .optional()
    .transform((value) => value === "on")
    .refine((value) => value, {
      message: "Consent is required before submitting."
    })
});

export const applicationStatusUpdateSchema = z.object({
  applicationId: z.string().uuid(),
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