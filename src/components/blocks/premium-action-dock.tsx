import Link from "next/link";
import { FileCheck2, HeartHandshake, ShieldCheck, UsersRound } from "lucide-react";

const actions = [
  {
    label: "Check Eligibility",
    href: "/apply",
    icon: FileCheck2,
    description: "Start student support"
  },
  {
    label: "Support Campaign",
    href: "/campaigns",
    icon: HeartHandshake,
    description: "Donate to education"
  },
  {
    label: "Volunteer",
    href: "/#volunteer",
    icon: UsersRound,
    description: "Help verification"
  },
  {
    label: "Portal Login",
    href: "/login",
    icon: ShieldCheck,
    description: "Secure access"
  }
] as const;

export function PremiumActionDock() {
  return (
    <section className="relative z-20 -mt-10 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-3 rounded-[30px] border border-white/70 bg-white/76 p-3 shadow-[0_28px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-[22px] border border-slate-200/80 bg-white/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/70 hover:shadow-[0_18px_45px_rgba(37,99,235,0.14)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-slate-950 text-white transition group-hover:bg-blue-600">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-black tracking-[-0.035em] text-slate-950">
                    {action.label}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
