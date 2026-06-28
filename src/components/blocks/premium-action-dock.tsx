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
    label: "Student Support",
    href: "/apply",
    icon: FileCheck2,
    description: "Check eligibility and start the guided journey"
  },
  {
    label: "Campaign Hub",
    href: "/campaigns",
    icon: HeartHandshake,
    description: "Explore verified education support needs"
  },
  {
    label: "Volunteer Desk",
    href: "/#volunteer",
    icon: UsersRound,
    description: "Join verification and student support work"
  },
  {
    label: "Secure Portal",
    href: "/login",
    icon: ShieldCheck,
    description: "Role-based access for the Devasiri team"
  }
] as const;

export function PremiumActionDock() {
  return (
    <section className="relative z-30 -mt-20 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[38px] border border-white/80 bg-white/72 p-3 shadow-[0_34px_110px_rgba(15,23,42,0.16)] backdrop-blur-2xl">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group relative min-h-[128px] overflow-hidden rounded-[30px] border border-slate-200/80 bg-white/74 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/80 hover:shadow-[0_24px_70px_rgba(37,99,235,0.18)]"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-300/0 blur-3xl transition group-hover:bg-blue-300/24"
                  />

                  <div className="relative flex h-full items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[22px] bg-slate-950 text-white shadow-[0_18px_45px_rgba(15,23,42,0.2)] transition group-hover:bg-blue-600">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-black tracking-[-0.045em] text-slate-950">
                          {action.label}
                        </h3>
                        <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                      </div>

                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
