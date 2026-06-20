import { FileCheck2, MapPin, ShieldCheck, UserCheck } from "lucide-react";

const trustItems = [
  {
    label: "Karnataka-focused applications",
    icon: MapPin
  },
  {
    label: "Document-based verification",
    icon: FileCheck2
  },
  {
    label: "Volunteer review workflow",
    icon: UserCheck
  },
  {
    label: "Transparent donor reporting",
    icon: ShieldCheck
  }
] as const;

export function LiveTicker() {
  return (
    <section className="px-6 pb-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-[20px] bg-slate-50 px-4 py-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] bg-white text-blue-600 shadow-sm">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </div>

                <p className="text-sm font-bold leading-5 text-slate-700">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}