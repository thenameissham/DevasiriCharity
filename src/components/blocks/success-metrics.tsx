import {
  BookOpenCheck,
  GraduationCap,
  HeartHandshake,
  UsersRound
} from "lucide-react";
import {
  formatINRCompactFromPaise,
  getPlatformImpactSummary
} from "@/features/impact/impact.queries";

export async function SuccessMetrics() {
  const summary = await getPlatformImpactSummary();

  const metrics = [
    {
      label: "Raised through platform",
      value: formatINRCompactFromPaise(summary.totalRaisedPaise),
      helper: "Successful donation records",
      icon: HeartHandshake
    },
    {
      label: "Active campaigns",
      value: String(summary.activeCampaignCount),
      helper: "Open for verified support",
      icon: BookOpenCheck
    },
    {
      label: "Student records",
      value: String(summary.studentRecordCount),
      helper: "Scholarship support database",
      icon: GraduationCap
    },
    {
      label: "Volunteer records",
      value: String(summary.volunteerRecordCount),
      helper: "Verification and support network",
      icon: UsersRound
    }
  ] as const;

  return (
    <section id="impact" className="px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Live Trust Dashboard
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.055em] text-slate-950 sm:text-4xl">
            Clear records. Verified student support.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            These numbers are loaded from the platform database instead of
            static mock content.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.label}
                className="rounded-[28px] border border-slate-200 bg-white/82 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-blue-50 text-blue-600">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>

                <p className="mt-5 text-sm font-bold text-slate-500">
                  {metric.label}
                </p>

                <p className="mt-2 text-4xl font-black tracking-[-0.065em] text-slate-950">
                  {metric.value}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {metric.helper}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}