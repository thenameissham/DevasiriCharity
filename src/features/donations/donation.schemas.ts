import { z } from "zod";
import { stripUnsafeText } from "@/lib/slug";

const amountSchema = z.coerce
  .number()
  .finite()
  .min(100, "Minimum donation amount is ₹100.")
  .max(10000000, "Donation amount is too high.");

const optionalText = z
  .string()
  .optional()
  .transform((value) => {
    const clean = stripUnsafeText(value ?? "");
    return clean.length > 0 ? clean : undefined;
  });

export const donationIntentSchema = z.object({
  campaignId: z.string().uuid(),
  donorName: z.string().min(2).max(120).transform(stripUnsafeText),
  donorEmail: z.string().email().transform((value) => value.toLowerCase().trim()),
  donorPhone: z.string().min(10).max(15).transform(stripUnsafeText),
  amountRupees: amountSchema,
  message: optionalText,
  isAnonymous: z.string().optional().transform((value) => value === "on")
});

export type DonationIntentInput = z.infer<typeof donationIntentSchema>;

export function parseDonationIntentFormData(
  formData: FormData
): DonationIntentInput {
  return donationIntentSchema.parse(Object.fromEntries(formData.entries()));
}