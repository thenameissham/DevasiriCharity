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
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 18);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary navigation"
        className={cn(
          "relative mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border px-3 py-2.5 transition duration-300 sm:px-5",
          isScrolled
            ? "border-white/80 bg-[#fffdf8]/92 shadow-[0_24px_90px_rgba(8,26,28,0.14)] backdrop-blur-2xl"
            : "border-white/70 bg-[#fffdf8]/78 shadow-[0_18px_60px_rgba(8,26,28,0.1)] backdrop-blur-2xl",
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

        <div className="hidden items-center rounded-full border border-[var(--theme-border)] bg-white/65 p-1.5 shadow-sm backdrop-blur-xl lg:flex">
          {navItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-extrabold transition duration-200",
                  active
                    ? "text-[var(--theme-primary)]"
                    : "text-[#304547] hover:text-[var(--theme-primary)]",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="devasiri-navbar-active"
                    className="absolute inset-0 rounded-full bg-[var(--theme-soft)] ring-1 ring-[var(--theme-ring)]"
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
            intent="login"
            ariaLabel="Open secure portal login"
            className="group relative inline-flex h-11 overflow-hidden rounded-full border border-[#12383a] bg-[linear-gradient(180deg,#163b3e,#0a1f21)] px-5 text-sm font-extrabold text-white shadow-[0_14px_38px_rgba(8,26,28,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_46px_rgba(8,26,28,0.28)]"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)]" />
            <span className="relative inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#9ce5d8]" />
              Portal login
            </span>
          </SharedAuthTrigger>

          <Link
            href="/apply"
            className="group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full border border-emerald-700 bg-[linear-gradient(135deg,#0f766e,#0d8b77_48%,#0b5f59)] px-5 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(15,118,110,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,118,110,0.34)]"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_42%)]" />
            <span className="absolute -left-10 top-0 h-full w-10 rotate-[16deg] bg-white/20 blur-md transition-all duration-700 group-hover:left-[120%]" />
            <span className="relative inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[#fff3d0]" />
              Check eligibility
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-[var(--theme-border)] bg-white text-[var(--theme-ink)] shadow-sm transition hover:bg-[var(--theme-soft)] lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-x-0 top-[calc(100%+10px)] overflow-hidden rounded-[28px] border border-[var(--theme-border)] bg-[#fffdf8]/96 p-3 shadow-[0_30px_100px_rgba(8,26,28,0.18)] backdrop-blur-2xl lg:hidden"
            >
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-[18px] px-4 py-3 text-sm font-extrabold text-[var(--theme-ink)] transition hover:bg-[var(--theme-soft)] hover:text-[var(--theme-primary)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-3 grid gap-2 border-t border-[var(--theme-border)] pt-3 sm:grid-cols-2">
                <SharedAuthTrigger
                  intent="login"
                  ariaLabel="Open secure portal login"
                  className="h-12 w-full rounded-[18px] bg-[linear-gradient(180deg,#163b3e,#0a1f21)] text-white"
                >
                  <ShieldCheck className="h-4 w-4 text-[#9ce5d8]" />
                  Portal login
                </SharedAuthTrigger>

                <Link
                  href="/apply"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-[linear-gradient(135deg,#0f766e,#0d8b77_48%,#0b5f59)] px-5 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(15,118,110,0.24)]"
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
