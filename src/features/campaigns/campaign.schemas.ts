import { z } from "zod";
import { stripUnsafeText } from "@/lib/slug";

export const campaignCategorySchema = z.enum([
  "EDUCATION",
  "HOSTEL",
  "SPONSORSHIP",
  "EMERGENCY",
  "VOLUNTEER",
  "GENERAL"
]);

export const campaignStatusSchema = z.enum([
  "DRAFT",
  "ACTIVE",
  "PAUSED",
  "COMPLETED",
  "ARCHIVED"
]);

const moneyRupeesSchema = z.coerce
  .number()
  .finite()
  .min(0)
  .max(100000000);

export const campaignFormSchema = z.object({
  id: z.string().uuid().optional(),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(120, "Title must be below 120 characters.")
    .transform(stripUnsafeText),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(500, "Description must be below 500 characters.")
    .transform(stripUnsafeText),

  story: z
    .string()
    .max(3000, "Story must be below 3000 characters.")
    .optional()
    .transform((value) => {
      const clean = stripUnsafeText(value ?? "");
      return clean.length > 0 ? clean : undefined;
    }),

  category: campaignCategorySchema,

  status: campaignStatusSchema,

  goalAmountRupees: moneyRupeesSchema.min(100, "Goal must be at least ₹100."),

  raisedAmountRupees: moneyRupeesSchema,

  coverImageUrl: z
    .string()
    .url("Cover image must be a valid URL.")
    .optional()
    .or(z.literal(""))
    .transform((value) => {
      const clean = stripUnsafeText(value ?? "");
      return clean.length > 0 ? clean : undefined;
    }),

  videoUrl: z
    .string()
    .url("Video URL must be valid.")
    .optional()
    .or(z.literal(""))
    .transform((value) => {
      const clean = stripUnsafeText(value ?? "");
      return clean.length > 0 ? clean : undefined;
    }),

  startDate: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;

      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? undefined : date;
    }),

  endDate: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;

      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? undefined : date;
    }),

  isFeatured: z
    .string()
    .optional()
    .transform((value) => value === "on")
});

export type CampaignFormInput = z.infer<typeof campaignFormSchema>;

export function parseCampaignFormData(formData: FormData): CampaignFormInput {
  const raw = Object.fromEntries(formData.entries());
  return campaignFormSchema.parse(raw);
}