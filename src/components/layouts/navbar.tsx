"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, LockKeyhole, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Scholarships", href: "/apply" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Impact", href: "/#impact" },
  { label: "Volunteer", href: "/#volunteer" }
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 py-3 sm:px-4">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between rounded-[24px] border border-white/50 bg-white/90 px-3 py-2.5 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:px-5">
        <Link
          href="/"
          className="flex min-w-0 items-center"
          aria-label="Devasiri Charitable Trust home"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/brand/devasiri-logo.png"
            alt="Devasiri Charitable Trust"
            width={220}
            height={70}
            priority
            className="h-10 w-auto object-contain sm:h-12 md:h-14"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-[18px] border border-blue-100 bg-white px-4 text-sm font-black text-slate-800 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-[0_18px_45px_rgba(37,99,235,0.18)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-[12px] bg-slate-950 text-white transition group-hover:bg-blue-600">
              <LockKeyhole className="h-3.5 w-3.5" />
            </span>
            Portal Login
          </Link>

          <Button href="/apply" size="sm" className="h-11 rounded-[18px] px-5">
            Check Eligibility
            <GraduationCap className="h-4 w-4" />
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-[16px] border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {isOpen ? (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-[24px] border border-slate-200 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.16)] lg:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-[16px] px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3 sm:grid-cols-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[18px] border border-blue-100 bg-blue-50 px-4 text-sm font-black text-blue-700"
              >
                <LockKeyhole className="h-4 w-4" />
                Portal Login
              </Link>

              <Button href="/apply" size="sm">
                Check Eligibility
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}