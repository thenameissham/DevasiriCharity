import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CampaignFormValues {
  readonly id?: string;
  readonly title?: string;
  readonly description?: string;
  readonly story?: string | null;
  readonly category?: string;
  readonly status?: string;
  readonly goalAmountPaise?: number;
  readonly raisedAmountPaise?: number;
  readonly coverImageUrl?: string | null;
  readonly videoUrl?: string | null;
  readonly startDate?: Date | null;
  readonly endDate?: Date | null;
  readonly isFeatured?: boolean;
}

interface CampaignFormProps {
  readonly mode: "create" | "edit";
  readonly action: (formData: FormData) => Promise<void>;
  readonly defaultValues?: CampaignFormValues;
  readonly errorMessage?: string;
}

const categories = [
  "EDUCATION",
  "HOSTEL",
  "SPONSORSHIP",
  "EMERGENCY",
  "VOLUNTEER",
  "GENERAL"
] as const;

const statuses = ["DRAFT", "ACTIVE", "PAUSED", "COMPLETED", "ARCHIVED"] as const;

function formatDateInput(date?: Date | null): string {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

function paiseToRupees(value?: number): number {
  return Math.round((value ?? 0) / 100);
}

export function CampaignForm({
  mode,
  action,
  defaultValues,
  errorMessage
}: CampaignFormProps) {
  return (
    <form action={action} className="grid gap-6">
      {defaultValues?.id ? (
        <input type="hidden" name="id" value={defaultValues.id} />
      ) : null}

      {errorMessage ? (
        <div className="rounded-[20px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div className="rounded-[32px] border border-slate-200 bg-white/82 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="grid gap-5">
          <label>
            <span className="text-sm font-bold text-slate-700">
              Campaign title
            </span>
            <input
              name="title"
              required
              minLength={3}
              maxLength={120}
              defaultValue={defaultValues?.title ?? ""}
              placeholder="Emergency Education Fee Support"
              className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">
              Short description
            </span>
            <textarea
              name="description"
              required
              minLength={20}
              maxLength={500}
              rows={4}
              defaultValue={defaultValues?.description ?? ""}
              placeholder="Explain what this campaign supports and why it matters."
              className="mt-2 w-full resize-none rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">
              Detailed story
            </span>
            <textarea
              name="story"
              maxLength={3000}
              rows={7}
              defaultValue={defaultValues?.story ?? ""}
              placeholder="Add a deeper campaign story for public trust and donor confidence."
              className="mt-2 w-full resize-none rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-sm font-medium leading-6 text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <span className="text-sm font-bold text-slate-700">Category</span>
              <select
                name="category"
                defaultValue={defaultValues?.category ?? "EDUCATION"}
                className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="text-sm font-bold text-slate-700">Status</span>
              <select
                name="status"
                defaultValue={defaultValues?.status ?? "DRAFT"}
                className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <span className="text-sm font-bold text-slate-700">
                Goal amount ₹
              </span>
              <input
                name="goalAmountRupees"
                type="number"
                required
                min={100}
                defaultValue={paiseToRupees(defaultValues?.goalAmountPaise)}
                className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label>
              <span className="text-sm font-bold text-slate-700">
                Raised amount ₹
              </span>
              <input
                name="raisedAmountRupees"
                type="number"
                required
                min={0}
                defaultValue={paiseToRupees(defaultValues?.raisedAmountPaise)}
                className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label>
              <span className="text-sm font-bold text-slate-700">
                Start date
              </span>
              <input
                name="startDate"
                type="date"
                defaultValue={formatDateInput(defaultValues?.startDate)}
                className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label>
              <span className="text-sm font-bold text-slate-700">End date</span>
              <input
                name="endDate"
                type="date"
                defaultValue={formatDateInput(defaultValues?.endDate)}
                className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>
          </div>

          <label>
            <span className="text-sm font-bold text-slate-700">
              Cover image URL
            </span>
            <input
              name="coverImageUrl"
              type="url"
              defaultValue={defaultValues?.coverImageUrl ?? ""}
              placeholder="https://..."
              className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label>
            <span className="text-sm font-bold text-slate-700">Video URL</span>
            <input
              name="videoUrl"
              type="url"
              defaultValue={defaultValues?.videoUrl ?? ""}
              placeholder="https://..."
              className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3">
            <input
              name="isFeatured"
              type="checkbox"
              defaultChecked={defaultValues?.isFeatured ?? false}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-bold text-slate-700">
              Feature this campaign on public homepage
            </span>
          </label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Link
          href="/admin/campaigns"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[16px] border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to campaigns
        </Link>

        <Button type="submit">
          <Save className="h-4 w-4" />
          {mode === "create" ? "Create campaign" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}