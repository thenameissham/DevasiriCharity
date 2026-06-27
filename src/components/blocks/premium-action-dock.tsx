import Link from "next/link";
import {
  ArrowRight,
  FileCheck2,
  HeartHandshake,
  ShieldCheck,
  UsersRound
} from "lucide-react";

const actions = [
  {
    label: "Check Eligibility",
    href: "/apply",
    icon: FileCheck2,
    description: "For students needing support"
  },
  {
    label: "Support Campaign",
    href: "/campaigns",
    icon: HeartHandshake,
    description: "For donors and sponsors"
  },
  {
    label: "Volunteer",
    href: "/#volunteer",
    icon: UsersRound,
    description: "Help verify and guide"
  },
  {
    label: "Portal Login",
    href: "/login",
    icon: ShieldCheck,
    description: "Secure role-based access"
  }
] as const;

export function PremiumActionDock() {
  return (
    <section className="relative z-30 -mt-16 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-3 rounded-[34px] border border-white/80 bg-white/78 p-3 shadow-[0_32px_100px_rgba(15,23,42,0.15)] backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/74 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/80 hover:shadow-[0_22px_55px_rgba(37,99,235,0.16)]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.16),transparent_38%)] opacity-0 transition group-hover:opacity-100"
              />

              <div className="relative flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-slate-950 text-white transition group-hover:bg-blue-600">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-black tracking-[-0.035em] text-slate-950">
                    {action.label}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {action.description}
                  </p>
                </div>

                <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
