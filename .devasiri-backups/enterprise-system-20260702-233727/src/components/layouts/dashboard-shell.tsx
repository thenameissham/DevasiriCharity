import Link from "next/link";
import {
  BarChart3,
  Bell,
  CalendarDays,
  FileText,
  HeartHandshake,
  Home,
  Settings,
  ShieldCheck,
  UserRound,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DashboardSignOutButton } from "@/components/layouts/dashboard-signout-button";
import { cn } from "@/lib/cn";

type DashboardRole = "ADMIN" | "DONOR" | "VOLUNTEER" | "STUDENT";

interface DashboardNavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: LucideIcon;
}

interface DashboardShellProps {
  readonly role: DashboardRole;
  readonly title: string;
  readonly description: string;
  readonly userName: string;
  readonly children: React.ReactNode;
}

const navItemsByRole: Record<DashboardRole, readonly DashboardNavItem[]> = {
  ADMIN: [
    { label: "Overview", href: "/admin", icon: BarChart3 },
    { label: "Applications", href: "/admin/applications", icon: FileText },
    { label: "Campaigns", href: "/admin/campaigns", icon: HeartHandshake },
    { label: "Donations", href: "/admin/donations", icon: FileText },
    { label: "Students", href: "/admin/students", icon: UserRound },
    { label: "Volunteers", href: "/admin/volunteers", icon: Users },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: ShieldCheck }
  ],
  DONOR: [
    { label: "Overview", href: "/donor", icon: BarChart3 },
    { label: "My Donations", href: "/donor/donations", icon: FileText },
    { label: "Receipts", href: "/donor/receipts", icon: ShieldCheck },
    { label: "Campaigns", href: "/campaigns", icon: HeartHandshake }
  ],
  VOLUNTEER: [
    { label: "Overview", href: "/volunteer", icon: BarChart3 },
    { label: "Events", href: "/volunteer/events", icon: CalendarDays },
    { label: "Assignments", href: "/volunteer/assignments", icon: FileText },
    { label: "Profile", href: "/volunteer/profile", icon: UserRound }
  ],
  STUDENT: [
    { label: "Overview", href: "/student", icon: BarChart3 },
    { label: "Application", href: "/student/application", icon: FileText },
    { label: "Scholarship", href: "/student/scholarship", icon: ShieldCheck },
    { label: "Hostel Support", href: "/student/hostel", icon: Home }
  ]
};

export function DashboardShell({
  role,
  title,
  description,
  userName,
  children
}: DashboardShellProps) {
  const navItems = navItemsByRole[role];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_8%_0%,rgba(37,99,235,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fafc_48%,#eef4ff_100%)]">
      <div className="grid min-h-screen lg:grid-cols-[292px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-white/78 px-4 py-5 backdrop-blur-2xl lg:block">
          <div className="flex h-full flex-col">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-[24px] px-3 py-3 transition hover:bg-slate-50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-slate-950 text-white shadow-[0_18px_45px_rgba(15,23,42,0.22)]">
                <HeartHandshake aria-hidden="true" className="h-5 w-5" />
              </div>

              <div>
                <p className="text-lg font-black tracking-[-0.055em] text-slate-950">
                  Devasiri
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  {role.toLowerCase()} portal
                </p>
              </div>
            </Link>

            <nav aria-label={`${role} dashboard navigation`} className="mt-8 grid gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === `/${role.toLowerCase()}`;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-semibold transition duration-200",
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    )}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto rounded-[24px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Signed in as
              </p>
              <p className="mt-2 truncate text-sm font-bold text-slate-950">
                {userName}
              </p>

              <div className="mt-4 border-t border-slate-200 pt-3">
                <DashboardSignOutButton />
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/78 px-6 py-4 backdrop-blur-2xl sm:px-8 lg:px-10">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  {role} Dashboard
                </p>
                <h1 className="mt-1 text-2xl font-black tracking-[-0.055em] text-slate-950 sm:text-3xl">
                  {title}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-blue-600"
                >
                  <Bell aria-hidden="true" className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  aria-label="Settings"
                  className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-blue-600"
                >
                  <Settings aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              {description}
            </p>
          </header>

          <div className="px-6 py-8 sm:px-8 lg:px-10">{children}</div>
        </section>
      </div>
    </main>
  );
}