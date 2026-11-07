import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { DashboardNavigation } from "@/components/layouts/dashboard-navigation";
import { DashboardSignOutButton } from "@/components/layouts/dashboard-signout-button";

type DashboardRole = "ADMIN" | "DONOR" | "VOLUNTEER" | "STUDENT";

interface DashboardShellProps {
  readonly role: DashboardRole;
  readonly title: string;
  readonly description: string;
  readonly userName: string;
  readonly children: React.ReactNode;
}

export function DashboardShell({
  role,
  title,
  description,
  userName,
  children,
}: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#1f2328]">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#d1d9e0] bg-white px-4 py-5 lg:flex lg:flex-col">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md px-2 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f883d]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1f2328] text-white">
              <HeartHandshake aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-semibold tracking-tight">Devasiri</span>
              <span className="mt-0.5 block text-xs text-[#59636e]">
                {role.toLowerCase()} portal
              </span>
            </span>
          </Link>

          <div className="my-4 border-t border-[#d8dee4]" />
          <DashboardNavigation role={role} />

          <div className="mt-auto border-t border-[#d8dee4] pt-4">
            <p className="px-2 text-xs font-medium text-[#59636e]">Signed in as</p>
            <p className="mt-1 truncate px-2 text-sm font-semibold" title={userName}>
              {userName}
            </p>
            <div className="mt-3 px-2">
              <DashboardSignOutButton />
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="border-b border-[#d1d9e0] bg-white px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#59636e]">
                    {role.toLowerCase()} workspace
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {title}
                  </h1>
                </div>
                <div className="lg:hidden">
                  <DashboardSignOutButton />
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#59636e] sm:text-base">
                {description}
              </p>
            </div>
          </header>

          <div className="border-b border-[#d1d9e0] bg-white px-3 py-2 lg:hidden">
            <div className="overflow-x-auto pb-1">
              <DashboardNavigation role={role} variant="mobile" />
            </div>
          </div>

          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mx-auto max-w-6xl">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
