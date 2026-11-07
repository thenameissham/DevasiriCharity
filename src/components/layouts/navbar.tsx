"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SharedAuthTrigger } from "@/components/motion/shared-auth-trigger";
import { cn } from "@/lib/cn";
import { useMotionExperience } from "@/components/motion/motion-provider";

const navItems = [
  { label: "Who we are", href: "/#about" },
  { label: "What we do", href: "/#programs" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Impact", href: "/#impact" },
] as const;

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const { reducedMotion } = useMotionExperience();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] px-3 py-3 sm:px-5">
      <motion.nav
        initial={reducedMotion ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: reducedMotion ? 0 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        aria-label="Primary navigation"
        className={cn(
          "relative mx-auto flex max-w-7xl items-center justify-between rounded-xl border px-3 py-2.5 transition duration-200 sm:px-5",
          "border-[#d0d7de] bg-white shadow-sm",
        )}
      >
        <Link
          href="/"
          className="group flex min-w-0 items-center"
          aria-label="Devasiri Charitable Trust home"
        >
          <Image
            src="/brand/devasiri-logo.png"
            alt="Devasiri Charitable Trust"
            width={220}
            height={70}
            priority
            className="h-10 w-auto object-contain transition duration-300 group-hover:scale-[1.015] sm:h-12"
          />
        </Link>

        <div className="hidden items-center rounded-lg border border-[var(--theme-border)] bg-white p-1 lg:flex">
          {navItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-semibold transition duration-150",
                  active
                    ? "text-[var(--theme-primary)]"
                    : "text-[#304547] hover:text-[var(--theme-primary)]",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="devasiri-navbar-active"
                    className="absolute inset-0 rounded-md bg-[var(--theme-soft)] ring-1 ring-[var(--theme-ring)]"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <SharedAuthTrigger
            intent="branch"
            ariaLabel="Open secure portal login"
            className="group relative inline-flex h-11 overflow-hidden rounded-lg border border-[#d0d7de] bg-white px-4 text-sm font-semibold text-[#24292f] transition hover:bg-[#f6f8fa]"
          >
            <span className="relative inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#1f883d]" />
              Portal login
            </span>
          </SharedAuthTrigger>

          <Link
            href="/apply"
            className="group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-lg border border-[#1a7f37] bg-[#1f883d] px-4 text-sm font-semibold text-white transition hover:bg-[#1a7f37]"
          >
            <span className="relative inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[#fff3d0]" />
              Check eligibility
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="devasiri-mobile-nav"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--theme-border)] bg-white text-[var(--theme-ink)] transition hover:bg-[var(--theme-soft)] lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              id="devasiri-mobile-nav"
              role="region"
              aria-label="Mobile navigation menu"
              initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
              className="absolute inset-x-0 top-[calc(100%+10px)] overflow-hidden rounded-xl border border-[var(--theme-border)] bg-white p-3 shadow-lg lg:hidden"
            >
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-semibold text-[var(--theme-ink)] transition hover:bg-[var(--theme-soft)] hover:text-[var(--theme-primary)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-3 grid gap-2 border-t border-[var(--theme-border)] pt-3 sm:grid-cols-2">
                <SharedAuthTrigger
                  intent="branch"
                  ariaLabel="Open secure portal login"
                  className="h-12 w-full rounded-lg border border-[#d0d7de] bg-white text-[#24292f]"
                >
                  <ShieldCheck className="h-4 w-4 text-[#1f883d]" />
                  Portal login
                </SharedAuthTrigger>

                <Link
                  href="/apply"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1f883d] px-5 text-sm font-semibold text-white"
                >
                  Check eligibility
                  <Sparkles className="h-4 w-4 text-[#fff3d0]" />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
