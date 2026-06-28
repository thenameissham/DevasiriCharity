"use client";

import Link from "next/link";
import {
  ArrowRight,
  Command,
  FileCheck2,
  HeartHandshake,
  Home,
  LogIn,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X
} from "lucide-react";
import {
  AnimatePresence,
  motion
} from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

type CommandAction =
  | {
      readonly type: "link";
      readonly label: string;
      readonly description: string;
      readonly href: string;
      readonly icon: typeof Home;
      readonly keywords: readonly string[];
    }
  | {
      readonly type: "auth";
      readonly label: string;
      readonly description: string;
      readonly intent: "branch" | "login" | "signup";
      readonly icon: typeof Home;
      readonly keywords: readonly string[];
    };

const actions: readonly CommandAction[] = [
  {
    type: "link",
    label: "Go to Home",
    description: "Return to the Devasiri landing experience",
    href: "/",
    icon: Home,
    keywords: ["home", "landing", "main"]
  },
  {
    type: "auth",
    label: "Get Started",
    description: "Open the warm guided access and onboarding flow",
    intent: "branch",
    icon: Sparkles,
    keywords: ["start", "begin", "onboarding", "signup", "apply"]
  },
  {
    type: "auth",
    label: "Portal Login",
    description: "Open secure returning-user access",
    intent: "login",
    icon: LogIn,
    keywords: ["login", "portal", "admin", "donor", "student"]
  },
  {
    type: "link",
    label: "Student Application",
    description: "Start the scholarship eligibility journey",
    href: "/apply",
    icon: FileCheck2,
    keywords: ["apply", "student", "scholarship", "eligibility"]
  },
  {
    type: "link",
    label: "Campaign Hub",
    description: "Explore verified education support campaigns",
    href: "/campaigns",
    icon: HeartHandshake,
    keywords: ["campaign", "donate", "support", "donor"]
  },
  {
    type: "link",
    label: "Volunteer Path",
    description: "Jump to the volunteer support section",
    href: "/#volunteer",
    icon: UsersRound,
    keywords: ["volunteer", "help", "team"]
  },
  {
    type: "link",
    label: "Impact & Trust",
    description: "View impact, transparency, and trust sections",
    href: "/#impact",
    icon: ShieldCheck,
    keywords: ["impact", "trust", "transparency"]
  }
];

function getPlatformKeyLabel() {
  if (typeof navigator === "undefined") return "Ctrl";

  return /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "⌘" : "Ctrl";
}

export function ExperienceCommandCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);
  const { reducedMotion, openAuthOverlay } = useMotionExperience();

  const keyLabel = getPlatformKeyLabel();

  const filteredActions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return actions;

    return actions.filter((action) => {
      const haystack = [
        action.label,
        action.description,
        ...action.keywords
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isCommandShortcut =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";

      if (isCommandShortcut) {
        event.preventDefault();
        setIsOpen(true);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setTimeout(() => {
      searchRef.current?.focus();
    }, 40);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    setQuery("");
  }

  function runAuthAction(intent: "branch" | "login" | "signup") {
    close();
    window.setTimeout(() => {
      openAuthOverlay(intent);
    }, 90);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[9998] hidden h-12 items-center gap-2 rounded-full border border-white/70 bg-slate-950/90 px-4 text-xs font-black text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100 md:inline-flex"
        aria-label="Open Devasiri command center"
      >
        <Command className="h-4 w-4" />
        Command Center
        <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/70 ring-1 ring-white/10">
          {keyLabel} K
        </span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[10001] flex items-start justify-center px-4 py-20 sm:py-24"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close command center"
              className="absolute inset-0 cursor-default bg-slate-950/38 backdrop-blur-[18px]"
              onClick={close}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Devasiri command center"
              className="relative w-full max-w-3xl overflow-hidden rounded-[38px] border border-white/70 bg-white/88 shadow-[0_44px_150px_rgba(15,23,42,0.34)] outline-none backdrop-blur-2xl"
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 28,
                      scale: 0.96
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              exit={
                reducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 18,
                      scale: 0.97
                    }
              }
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 24
              }}
            >
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-300/24 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"
              />

              <div className="relative border-b border-slate-200/80 p-4 sm:p-5">
                <div className="flex items-center gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <Search className="h-5 w-5 shrink-0 text-slate-400" />

                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search actions, campaigns, login, application..."
                    className="h-9 flex-1 bg-transparent text-sm font-semibold text-slate-950 outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={close}
                    className="flex h-9 w-9 items-center justify-center rounded-[14px] text-slate-500 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    aria-label="Close command center"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative max-h-[58vh] overflow-y-auto p-3 sm:p-4">
                <div className="grid gap-2">
                  {filteredActions.length > 0 ? (
                    filteredActions.map((action) => {
                      const Icon = action.icon;

                      if (action.type === "link") {
                        return (
                          <Link
                            key={action.label}
                            href={action.href}
                            onClick={close}
                            className="group flex items-center gap-4 rounded-[26px] border border-transparent bg-white/48 p-4 transition hover:border-blue-100 hover:bg-blue-50/80 hover:shadow-[0_16px_45px_rgba(37,99,235,0.12)] focus:outline-none focus:ring-4 focus:ring-blue-100"
                          >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-slate-950 text-white transition group-hover:bg-blue-600">
                              <Icon className="h-5 w-5" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-base font-black tracking-[-0.04em] text-slate-950">
                                {action.label}
                              </p>

                              <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                                {action.description}
                              </p>
                            </div>

                            <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                          </Link>
                        );
                      }

                      return (
                        <button
                          key={action.label}
                          type="button"
                          onClick={() => runAuthAction(action.intent)}
                          className="group flex items-center gap-4 rounded-[26px] border border-transparent bg-white/48 p-4 text-left transition hover:border-blue-100 hover:bg-blue-50/80 hover:shadow-[0_16px_45px_rgba(37,99,235,0.12)] focus:outline-none focus:ring-4 focus:ring-blue-100"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-blue-600 text-white">
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-base font-black tracking-[-0.04em] text-slate-950">
                              {action.label}
                            </p>

                            <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                              {action.description}
                            </p>
                          </div>

                          <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                        </button>
                      );
                    })
                  ) : (
                    <div className="rounded-[28px] border border-slate-200 bg-white/70 p-8 text-center">
                      <p className="text-xl font-black tracking-[-0.05em] text-slate-950">
                        No matching action found
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Try searching for apply, campaign, login, volunteer, or
                        support.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative border-t border-slate-200/80 px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-500">
                  <span>Press Escape to close</span>
                  <span className="inline-flex items-center gap-1">
                    <Command className="h-3.5 w-3.5" />
                    {keyLabel} K
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
