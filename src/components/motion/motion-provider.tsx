"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LogIn,
  Sparkles,
  UserPlus,
  X
} from "lucide-react";
import { ReduceMotionToggle } from "@/components/motion/reduce-motion-toggle";
import { ExperienceCommandCenter } from "@/components/experience/experience-command-center";
import { ApplicationJourneyAssistant } from "@/components/blocks/application-journey-assistant";
import { cn } from "@/lib/cn";

const InteractiveConstellationBackground = dynamic(
  () =>
    import("@/components/motion/interactive-constellation-background").then(
      (module) => module.InteractiveConstellationBackground
    ),
  {
    ssr: false
  }
);

type AuthIntent = "branch" | "login" | "signup";

interface MotionExperienceContextValue {
  readonly reducedMotion: boolean;
  readonly setReducedMotion: (value: boolean) => void;
  readonly openAuthOverlay: (intent?: AuthIntent) => void;
  readonly closeAuthOverlay: () => void;
}

const MotionExperienceContext =
  createContext<MotionExperienceContextValue | null>(null);

const signupSteps = [
  {
    id: "fullName",
    label: "Your full name",
    placeholder: "Enter your full name",
    type: "text"
  },
  {
    id: "email",
    label: "Email address",
    placeholder: "you@example.com",
    type: "email"
  },
  {
    id: "phone",
    label: "Mobile number",
    placeholder: "10-digit mobile number",
    type: "tel"
  },
  {
    id: "supportNeed",
    label: "What support are you looking for?",
    placeholder: "Fee support, hostel support, sponsorship...",
    type: "text"
  }
] as const;

type SignupStepId = (typeof signupSteps)[number]["id"];
type SignupDraft = Partial<Record<SignupStepId, string>>;

export function useMotionExperience() {
  const context = useContext(MotionExperienceContext);

  if (!context) {
    throw new Error(
      "useMotionExperience must be used inside MotionProvider."
    );
  }

  return context;
}

function PremiumAuthOverlay({
  isOpen,
  initialIntent,
  reducedMotion,
  onClose
}: {
  readonly isOpen: boolean;
  readonly initialIntent: AuthIntent;
  readonly reducedMotion: boolean;
  readonly onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [view, setView] = useState<AuthIntent>(initialIntent);
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<SignupDraft>({});
  const [resumed, setResumed] = useState(false);

  const currentStep = signupSteps[stepIndex];
  const currentValue = currentStep ? draft[currentStep.id] ?? "" : "";

  useEffect(() => {
    if (!isOpen) return;

    setView(initialIntent);

    const saved = sessionStorage.getItem("devasiri-progressive-signup");

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as {
          stepIndex?: number;
          draft?: SignupDraft;
        };

        setDraft(parsed.draft ?? {});
        setStepIndex(
          Math.min(
            Math.max(parsed.stepIndex ?? 0, 0),
            signupSteps.length - 1
          )
        );
        setResumed(true);
      } catch {
        sessionStorage.removeItem("devasiri-progressive-signup");
      }
    }

    window.setTimeout(() => dialogRef.current?.focus(), 30);
  }, [initialIntent, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || view !== "signup") return;

    sessionStorage.setItem(
      "devasiri-progressive-signup",
      JSON.stringify({
        stepIndex,
        draft
      })
    );
  }, [draft, isOpen, stepIndex, view]);

  function updateCurrentValue(value: string) {
    if (!currentStep) return;

    setDraft((previous) => ({
      ...previous,
      [currentStep.id]: value
    }));
  }

  function goNext() {
    if (!currentStep) return;

    const value = (draft[currentStep.id] ?? "").trim();

    if (!value) return;

    if (stepIndex < signupSteps.length - 1) {
      setStepIndex((value) => value + 1);
      return;
    }

    sessionStorage.setItem(
      "devasiri-onboarding-prefill",
      JSON.stringify(draft)
    );

    sessionStorage.removeItem("devasiri-progressive-signup");
    window.location.href = "/apply";
  }

  function goBack() {
    if (stepIndex > 0) {
      setStepIndex((value) => value - 1);
      return;
    }

    setView("branch");
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          aria-hidden={false}
          className="fixed inset-0 z-[10000] flex items-center justify-center px-4 py-8"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-slate-950/32 backdrop-blur-[18px]"
            onClick={onClose}
          />

          <div className="absolute inset-0">
            <InteractiveConstellationBackground />
          </div>

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Devasiri access and onboarding"
            tabIndex={-1}
            layoutId="devasiri-shared-auth"
            className="relative w-full max-w-2xl overflow-hidden rounded-[38px] border border-white/70 bg-white/82 p-5 shadow-[0_40px_140px_rgba(15,23,42,0.28)] outline-none backdrop-blur-2xl sm:p-7"
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.94,
                    y: 24
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={
              reducedMotion
                ? undefined
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 18
                  }
            }
            transition={{
              type: "spring",
              stiffness: 210,
              damping: 24
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-blue-300/24 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-2 text-sm font-black text-blue-700">
                  <Sparkles className="h-4 w-4" />
                  Devasiri access
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-[16px] border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  aria-label="Close access dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-7">
                <AnimatePresence mode="wait">
                  {view === "branch" ? (
                    <motion.div
                      key="branch"
                      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                    >
                      <h2 className="text-4xl font-black tracking-[-0.075em] text-slate-950 sm:text-5xl">
                        Welcome. Glad you’re here today.
                      </h2>

                      <p className="mt-4 text-base leading-7 text-slate-600">
                        Are you visiting us again, or is this your first time?
                      </p>

                      <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => setView("login")}
                          className="group rounded-[28px] border border-slate-200 bg-white/80 p-5 text-left shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/80 focus:outline-none focus:ring-4 focus:ring-blue-100"
                        >
                          <div className="flex h-13 w-13 items-center justify-center rounded-[20px] bg-slate-950 text-white transition group-hover:bg-blue-600">
                            <LogIn className="h-6 w-6" />
                          </div>
                          <h3 className="mt-5 text-2xl font-black tracking-[-0.055em] text-slate-950">
                            I’m visiting again
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            Continue with the existing secure login flow.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setView("signup")}
                          className="group rounded-[28px] border border-slate-200 bg-white/80 p-5 text-left shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/80 focus:outline-none focus:ring-4 focus:ring-blue-100"
                        >
                          <div className="flex h-13 w-13 items-center justify-center rounded-[20px] bg-blue-600 text-white">
                            <UserPlus className="h-6 w-6" />
                          </div>
                          <h3 className="mt-5 text-2xl font-black tracking-[-0.055em] text-slate-950">
                            This is my first time
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            Start a guided scholarship support journey.
                          </p>
                        </button>
                      </div>
                    </motion.div>
                  ) : null}

                  {view === "login" ? (
                    <motion.div
                      key="login"
                      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                    >
                      <button
                        type="button"
                        onClick={() => setView("branch")}
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>

                      <h2 className="mt-5 text-4xl font-black tracking-[-0.075em] text-slate-950 sm:text-5xl">
                        Welcome back.
                      </h2>

                      <p className="mt-4 text-base leading-7 text-slate-600">
                        We’ll keep the existing login route untouched so your
                        providers, sessions, callbacks, roles, and backend logic
                        continue working exactly as before.
                      </p>

                      <div className="mt-8 rounded-[28px] border border-blue-100 bg-blue-50/70 p-5">
                        <div className="flex gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                          <p className="text-sm leading-6 text-blue-950/80">
                            This premium overlay is only the entry experience.
                            Actual login still happens through your existing
                            authenticated page.
                          </p>
                        </div>
                      </div>

                      <Link
                        href="/login"
                        className="mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-[20px] bg-blue-600 px-6 text-sm font-black text-white shadow-[0_20px_55px_rgba(37,99,235,0.26)] transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        Continue to secure login
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </motion.div>
                  ) : null}

                  {view === "signup" ? (
                    <motion.div
                      key="signup"
                      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                    >
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>

                      <h2 className="mt-5 text-4xl font-black tracking-[-0.075em] text-slate-950 sm:text-5xl">
                        {resumed
                          ? "Welcome back, picking up where you left off."
                          : "Let’s begin gently."}
                      </h2>

                      <p className="mt-4 text-base leading-7 text-slate-600">
                        One step at a time. Press Enter to continue.
                      </p>

                      <div className="mt-7 grid gap-3">
                        {signupSteps.slice(0, stepIndex).map((step) => (
                          <div
                            key={step.id}
                            className="flex items-center justify-between rounded-[18px] border border-emerald-100 bg-emerald-50/70 px-4 py-3"
                          >
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                                {step.label}
                              </p>
                              <p className="mt-1 text-sm font-black text-emerald-950">
                                {draft[step.id]}
                              </p>
                            </div>
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          </div>
                        ))}
                      </div>

                      {currentStep ? (
                        <div className="mt-6">
                          <label
                            htmlFor={`progressive-${currentStep.id}`}
                            className="text-sm font-black text-slate-700"
                          >
                            {currentStep.label}
                          </label>

                          <input
                            id={`progressive-${currentStep.id}`}
                            type={currentStep.type}
                            value={currentValue}
                            onChange={(event) =>
                              updateCurrentValue(event.target.value)
                            }
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                goNext();
                              }
                            }}
                            placeholder={currentStep.placeholder}
                            autoFocus
                            className="mt-3 h-14 w-full rounded-[22px] border border-slate-200 bg-white px-5 text-base font-semibold text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                          />
                        </div>
                      ) : null}

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={goBack}
                          className={cn(
                            "inline-flex h-12 items-center justify-center rounded-[18px] border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100",
                            stepIndex === 0 && "sm:w-auto"
                          )}
                        >
                          Back
                        </button>

                        <button
                          type="button"
                          onClick={goNext}
                          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-[18px] bg-blue-600 px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(37,99,235,0.24)] transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                        >
                          {stepIndex === signupSteps.length - 1
                            ? "Continue to application"
                            : "Continue"}
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-5 text-xs leading-5 text-slate-500">
                        This stores temporary progress in sessionStorage only.
                        Final submission continues through your existing
                        application/backend flow.
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function MotionProvider({ children }: { readonly children: ReactNode }) {
  const [reducedMotion, setReducedMotionState] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authIntent, setAuthIntent] = useState<AuthIntent>("branch");

  useEffect(() => {
    const stored = localStorage.getItem("devasiri-reduced-motion");

    if (stored) {
      setReducedMotionState(stored === "true");
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotionState(mediaQuery.matches);

    function handleChange(event: MediaQueryListEvent) {
      setReducedMotionState(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setReducedMotion = useCallback((value: boolean) => {
    setReducedMotionState(value);
    localStorage.setItem("devasiri-reduced-motion", String(value));
  }, []);

  const openAuthOverlay = useCallback((intent: AuthIntent = "branch") => {
    setAuthIntent(intent);
    setIsAuthOpen(true);
  }, []);

  const closeAuthOverlay = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      reducedMotion,
      setReducedMotion,
      openAuthOverlay,
      closeAuthOverlay
    }),
    [closeAuthOverlay, openAuthOverlay, reducedMotion, setReducedMotion]
  );

  return (
    <MotionExperienceContext.Provider value={value}>
      {children}
      <ApplicationJourneyAssistant />
      <ExperienceCommandCenter />
      <ReduceMotionToggle />
      <PremiumAuthOverlay
        isOpen={isAuthOpen}
        initialIntent={authIntent}
        reducedMotion={reducedMotion}
        onClose={closeAuthOverlay}
      />
    </MotionExperienceContext.Provider>
  );
}
