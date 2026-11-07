"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  HeartHandshake,
  LayoutDashboard,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type DashboardRole = "ADMIN" | "DONOR" | "VOLUNTEER" | "STUDENT";
type NavigationItem = {
  readonly label: string;
  readonly href: string;
  readonly icon: LucideIcon;
};

const navigationByRole: Record<DashboardRole, readonly NavigationItem[]> = {
  ADMIN: [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Applications", href: "/admin/applications", icon: FileText },
    { label: "Campaigns", href: "/admin/campaigns", icon: HeartHandshake },
    { label: "Donations", href: "/admin/donations", icon: BarChart3 },
  ],
  DONOR: [
    { label: "Overview", href: "/donor", icon: LayoutDashboard },
    { label: "Campaigns", href: "/campaigns", icon: HeartHandshake },
  ],
  VOLUNTEER: [
    { label: "Overview", href: "/volunteer", icon: LayoutDashboard },
    { label: "Campaigns", href: "/campaigns", icon: HeartHandshake },
  ],
  STUDENT: [
    { label: "Overview", href: "/student", icon: LayoutDashboard },
    { label: "Support options", href: "/apply", icon: UserRound },
    { label: "Campaigns", href: "/campaigns", icon: HeartHandshake },
  ],
};

interface DashboardNavigationProps {
  readonly role: DashboardRole;
  readonly variant?: "sidebar" | "mobile";
}

export function DashboardNavigation({
  role,
  variant = "sidebar",
}: DashboardNavigationProps) {
  const pathname = usePathname();
  const items = navigationByRole[role];
  const isMobile = variant === "mobile";

  return (
    <nav
      aria-label={`${role.toLowerCase()} dashboard navigation`}
      className={
        isMobile
          ? "flex min-w-max items-center gap-1"
          : "grid gap-1.5"
      }
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== `/${role.toLowerCase()}` &&
            pathname.startsWith(`${item.href}/`));

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={[
              "inline-flex items-center gap-2.5 rounded-md border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f883d]",
              isMobile ? "min-h-11 shrink-0" : "w-full",
              isActive
                ? "border-[#d1d9e0] bg-[#f6f8fa] text-[#1f2328]"
                : "border-transparent text-[#59636e] hover:bg-[#f6f8fa] hover:text-[#1f2328]",
            ].join(" ")}
          >
            <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
