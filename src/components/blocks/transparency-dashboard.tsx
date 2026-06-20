import { FileText, PieChart, ShieldCheck, Users } from "lucide-react";
import { FloatingIllustration } from "@/components/ui/floating-illustration";

const items = [
  {
    label: "Verified records",
    description: "Applications and campaigns are reviewed before support.",
    icon: ShieldCheck
  },
  {
    label: "Clear reporting",
    description: "Donation and campaign records remain traceable.",
    icon: FileText
  },
  {
    label: "Impact visibility",
    description: "Support progress is shown through measurable outcomes.",
    icon: PieChart
  },
  {
    label: "Community trust",
    description: "Volunteers and admins help verify student needs.",
    icon: Users
  }
] as const;

export function TransparencyDashboard() {
  return (
    <section id="impact" className="relative overflow-hidden px-6 py-16 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-y-8 left-0 w-1/2 rounded-r-full bg-blue-100/35 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <FloatingIllustration
          src="/illustrations/impact-education-growth.png"
          alt="Education impact and transparency illustration"
          className="mx-auto max-w-[760px]"
        />

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Transparency & Impact
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.065em] text-slate-950 sm:text-5xl">
            Make every support journey visible and accountable.
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
            Devasiri is being built as a clean nonprofit platform where student
            support, campaign progress, donor trust, and admin verification are
            connected through reliable records.
          </p>

          <div className="mt-7 grid gap-3">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="rounded-[22px] border border-slate-200 bg-white/68 p-4 backdrop-blur-xl"
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-white text-blue-600 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-black tracking-[-0.03em] text-slate-950">
                        {item.label}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}