"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowUp,
  BookOpenCheck,
  Compass,
  HeartHandshake,
  Layers3,
  LineChart,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

const journeySections = [
  {
    id: "home",
    label: "Home",
    shortLabel: "01",
    icon: Sparkles
  },
  {
    id: "platform-experience",
    label: "Platform",
    shortLabel: "02",
    icon: Layers3
  },
  {
    id: "mission-flow",
    label: "Mission",
    shortLabel: "03",
    icon: BookOpenCheck
  },
  {
    id: "impact",
    label: "Impact",
    shortLabel: "04",
    icon: LineChart
  },
  {
    id: "volunteer",
    label: "Volunteer",
    shortLabel: "05",
    icon: UsersRound
  },
  {
    id: "transparency",
    label: "Trust",
    shortLabel: "06",
    icon: ShieldCheck
  }
] as const;

export function CinematicJourneyNavigator() {
  const pathname = usePathname();
  const { reducedMotion } = useMotionExperience();
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  const shouldShow = pathname === "/";

  const visibleSections = useMemo(() => journeySections, []);

  useEffect(() => {
    if (!shouldShow) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      setScrollProgress(Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100)));
    }

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [shouldShow]);

  useEffect(() => {
    if (!shouldShow) return;

    const elements = visibleSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.12, 0.24, 0.36, 0.48, 0.6]
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [shouldShow, visibleSections]);

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);

    if (!element) {
      if (sectionId === "home") {
        window.scrollTo({
          top: 0,
          behavior: reducedMotion ? "auto" : "smooth"
        });
      }

      return;
    }

    const y = element.getBoundingClientRect().top + window.scrollY - 96;

    window.scrollTo({
      top: Math.max(0, y),
      behavior: reducedMotion ? "auto" : "smooth"
    });
  }

  if (!shouldShow) return null;

  return (
    <>
      <motion.aside
        initial={reducedMotion ? false : { opacity: 0, x: -20 }}
        animate={{
          opacity: hidden ? 0 : 1,
          x: hidden ? -20 : 0
        }}
        transition={{ duration: reducedMotion ? 0 : 0.45 }}
        className={cn(
          "fixed left-4 top-1/2 z-[9987] hidden -translate-y-1/2 xl:block",
          hidden && "pointer-events-none"
        )}
      >
        <div className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white/78 p-3 shadow-[0_24px_90px_rgba(7,17,31,0.14)] backdrop-blur-2xl">
          <div
            aria-hidden="true"
            className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[var(--theme-primary)]/16 blur-3xl"
          />

          <div className="relative">
            <div className="mb-3 flex items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--theme-primary)]">
                <Compass className="h-4 w-4" />
                Journey
              </div>

              <button
                type="button"
                onClick={() => setHidden(true)}
                className="rounded-full px-2 py-1 text-[10px] font-black text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
              >
                Hide
              </button>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-4 left-[23px] top-4 w-px bg-slate-200"
              />

              <motion.div
                aria-hidden="true"
                className="absolute left-[23px] top-4 w-px bg-gradient-to-b from-[var(--theme-primary)] to-[var(--theme-accent)]"
                style={{ height: `${Math.max(8, scrollProgress * 0.72)}%` }}
              />

              <div className="grid gap-2">
                {visibleSections.map((section) => {
                  const Icon = section.icon;
                  const active = activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "group relative grid grid-cols-[46px_1fr] items-center gap-3 rounded-[22px] p-2 pr-4 text-left transition focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]",
                        active
                          ? "bg-[var(--theme-soft)] text-[var(--theme-ink)]"
                          : "text-slate-500 hover:bg-white hover:text-[var(--theme-ink)]"
                      )}
                    >
                      <div
                        className={cn(
                          "relative z-10 flex h-10 w-10 items-center justify-center rounded-[16px] border transition",
                          active
                            ? "border-[var(--theme-primary)] bg-[var(--theme-primary)] text-white shadow-[0_14px_35px_rgba(15,118,110,0.22)]"
                            : "border-slate-200 bg-white text-slate-500 group-hover:text-[var(--theme-primary)]"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                          {section.shortLabel}
                        </p>

                        <p className="text-sm font-black tracking-[-0.03em]">
                          {section.label}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 rounded-[22px] bg-[var(--theme-ink)] p-3 text-white">
              <div className="flex items-center justify-between text-xs font-black">
                <span>Page flow</span>
                <span>{Math.round(scrollProgress)}%</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)]"
                  animate={{ width: `${scrollProgress}%` }}
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {hidden ? (
        <button
          type="button"
          onClick={() => setHidden(false)}
          className="fixed left-4 top-1/2 z-[9987] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/86 text-[var(--theme-primary)] shadow-[0_18px_55px_rgba(7,17,31,0.15)] backdrop-blur-2xl transition hover:-translate-y-[calc(50%+2px)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)] xl:flex"
          aria-label="Show journey navigator"
        >
          <Compass className="h-5 w-5" />
        </button>
      ) : null}

      <div className="fixed bottom-4 left-1/2 z-[9986] hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/80 bg-white/82 px-3 py-2 shadow-[0_18px_65px_rgba(7,17,31,0.12)] backdrop-blur-2xl lg:flex">
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--theme-ink)] text-white transition hover:bg-[var(--theme-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>

        <div className="h-9 w-px bg-slate-200" />

        <Link
          href="/apply"
          className="inline-flex h-9 items-center gap-2 rounded-full bg-[var(--theme-primary)] px-4 text-xs font-black text-white transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
        >
          Start Journey
        </Link>

        <Link
          href="/campaigns"
          className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-black text-[var(--theme-ink)] transition hover:bg-[var(--theme-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
        >
          <HeartHandshake className="h-4 w-4" />
          Campaigns
        </Link>
      </div>
    </>
  );
}
