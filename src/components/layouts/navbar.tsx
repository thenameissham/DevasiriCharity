"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Command,
  GraduationCap,
  Menu,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { SharedAuthTrigger } from "@/components/motion/shared-auth-trigger";
import { cn } from "@/lib/cn";

const navItems = [
  { label: "Scholarships", href: "/apply" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Impact", href: "/#impact" },
  { label: "Volunteer", href: "/#volunteer" }
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
      setIsScrolled(window.scrollY > 20);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-[9999] px-3 py-3 sm:px-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border px-3 py-2.5 transition duration-300 sm:px-5",
          isScrolled
            ? "border-white/80 bg-white/86 shadow-[0_22px_80px_rgba(15,23,42,0.15)] backdrop-blur-2xl"
            : "border-white/70 bg-white/72 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl"
        )}
      >
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label="Devasiri Charitable Trust home"
        >
          <div className="relative overflow-hidden rounded-[18px]">
            <Image
              src="/brand/devasiri-logo.png"
              alt="Devasiri Charitable Trust"
              width={220}
              height={70}
              priority
              className="h-10 w-auto object-contain transition duration-300 group-hover:scale-[1.02] sm:h-12 md:h-14"
            />
          </div>
        </Link>

        <div className="hidden items-center rounded-full border border-slate-200/70 bg-white/52 px-2 py-1.5 shadow-sm backdrop-blur-xl lg:flex">
          {navItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-blue-100",
                  active
                    ? "text-blue-700"
                    : "text-slate-700 hover:text-blue-700"
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="devasiri-navbar-active"
                    className="absolute inset-0 rounded-full bg-blue-50 ring-1 ring-blue-100"
                    transition={{
                      type: "spring",
                      stiffness: 360,
                      damping: 30
                    }}
                  />
                ) : null}

                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/64 px-3 py-2 text-xs font-black text-slate-500 shadow-sm xl:flex">
            <Command className="h-3.5 w-3.5" />
            Ctrl K
          </div>

          <SharedAuthTrigger
            intent="login"
            ariaLabel="Open secure portal login"
            className="h-11 rounded-[18px] bg-slate-950 px-4 text-sm shadow-[0_14px_40px_rgba(15,23,42,0.18)] hover:bg-blue-600"
          >
            <ShieldCheck className="h-4 w-4" />
            Portal Login
          </SharedAuthTrigger>

          <Link
            href="/apply"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[18px] bg-blue-600 px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Check Eligibility
            <GraduationCap className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100 lg:hidden"
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
              className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-[28px] border border-slate-200 bg-white/94 p-3 shadow-[0_30px_100px_rgba(15,23,42,0.18)] backdrop-blur-2xl lg:hidden"
            >
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[20px] px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3 sm:grid-cols-2">
                <SharedAuthTrigger
                  intent="login"
                  ariaLabel="Open portal login"
                  className="h-12 w-full rounded-[20px] bg-slate-950"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Portal Login
                </SharedAuthTrigger>

                <Link
                  href="/apply"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)] focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  Check Eligibility
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
