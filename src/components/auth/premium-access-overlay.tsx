"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  HeartHandshake,
  LogIn,
  Mail,
  Phone,
  Sparkles,
  UserRound,
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
import { InteractiveConstellationBackground } from "@/components/motion/interactive-constellation-background";
import { cn } from "@/lib/cn";

export type AuthIntent = "branch" | "login" | "signup";

interface PremiumAccessOverlayProps {
  readonly isOpen: boolean;
  readonly initialIntent: AuthIntent;
  readonly reducedMotion: boolean;
  readonly onClose: () => void;
}

const onboardingSteps = [
  {
    id: "fullName",
    label: "Your full name",
    placeholder: "Enter your full name",
    type: "text",
    icon: UserRound
  },
  {
    id: "email",
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    icon: Mail
  },
  {
    id: "phone",
    label: "Mobile number",
    placeholder: "10-digit mobile number",
    type: "tel",
    icon: Phone
  },
  {
    id: "supportNeed",
    label: "What support are you looking for?",
    placeholder: "Fee support, hostel support, sponsorship...",
    type: "text",
    icon: HeartHandshake
  }
] as const;

type OnboardingStepId = (typeof onboardingSteps)[number]["id"];
type OnboardingDraft = Partial<Record<OnboardingStepId, string>>;

const STORAGE_KEY = "devasiri-progressive-access-draft";
const PREFILL_KEY = "devasiri-onboarding-prefill";

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "[tabindex]:not([tabindex='-1'])"
      ].join(",")
    )
  ).filter((element) => !element.hasAttribute("aria-hidden"));
}

export function PremiumAccessOverlay({
  isOpen,
  initialIntent,
  reducedMotion,
  onClose
}: PremiumAccessOverlayProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const [view, setView] = useState<AuthIntent>(initialIntent);
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<OnboardingDraft>({});
  const [resumed, setResumed] = useState(false);

  const currentStep = onboardingSteps[stepIndex];
  const CurrentIcon = currentStep?.icon ?? UserRound;

  const completedSteps = useMemo(
    () => onboardingSteps.slice(0, stepIndex),
    [stepIndex]
  );

  useEffect(() => {
    if (!isOpen) return;

    setView(initialIntent);

    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as {
          stepIndex?: number;
          draft?: OnboardingDraft;
        };

        setDraft(parsed.draft ?? {});
        setStepIndex(
          Math.min(
            Math.max(parsed.stepIndex ?? 0, 0),
            onboardingSteps.length - 1
          )
        );
        setResumed(true);
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.focus();
      firstInputRef.current?.focus();
    }, 60);

    return () => window.clearTimeout(focusTimer);
  }, [initialIntent, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = getFocusableElements(dialog);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
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
      STORAGE_KEY,
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

  function goToNextStep() {
    if (!currentStep) return;

    const currentValue = (draft[currentStep.id] ?? "").trim();

    if (!currentValue) {
      firstInputRef.current?.focus();
      return;
    }

    if (stepIndex < onboardingSteps.length - 1) {
      setStepIndex((value) => value + 1);
      window.setTimeout(() => firstInputRef.current?.focus(), 80);
      return;
    }

    sessionStorage.setItem(PREFILL_KEY, JSON.stringify(draft));
    sessionStorage.removeItem(STORAGE_KEY);
    window.location.href = "/apply/start";
  }

  function goBack() {
    if (view === "login") {
      setView("branch");
      return;
    }

    if (view === "signup" && stepIndex > 0) {
      setStepIndex((value) => value - 1);
      window.setTimeout(() => firstInputRef.current?.focus(), 80);
      return;
    }

    setView("branch");
  }

  function resetOnboarding() {
    setDraft({});
    setStepIndex(0);
    setResumed(false);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center px-4 py-8"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close Devasiri access overlay"
            className="absolute inset-0 cursor-default bg-slate-950/38 backdrop-blur-[18px]"
            onClick={onClose}
          />

          <div className="absolute inset-0 opacity-70">
            <InteractiveConstellationBackground />
          </div>

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Devasiri guided access"
            tabIndex={-1}
            layoutId="devasiri-shared-auth"
            className="relative w-full max-w-5xl overflow-hidden rounded-[44px] border border-white/70 bg-white/86 shadow-[0_50px_170px_rgba(7,17,31,0.36)] outline-none backdrop-blur-2xl"
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                    scale: 0.94
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
                    scale: 0.96
                  }
            }
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 25
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[var(--theme-primary)]/18 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[var(--theme-accent)]/18 blur-3xl"
            />

            <div className="relative grid min-h-[620px] lg:grid-cols-[0.88fr_1.12fr]">
              <aside className="relative hidden overflow-hidden bg-[var(--theme-ink)] p-8 text-white lg:block">
                <div
                  aria-hidden="true"
                  className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--theme-primary)]/34 blur-3xl"
                />

                <div
                  aria-hidden="true"
                  className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[var(--theme-accent)]/22 blur-3xl"
                />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white/86 ring-1 ring-white/10">
                      <Sparkles className="h-4 w-4 text-[var(--theme-accent)]" />
                      Devasiri guided entry
                    </div>

                    <h2 className="mt-7 text-5xl font-black leading-[0.96] tracking-[-0.08em]">
                      A calm start for every role.
                    </h2>

                    <p className="mt-5 text-sm leading-7 text-white/62">
                      This overlay is only the premium entry layer. Existing
                      login, application, auth providers, sessions, roles, and
                      backend flows remain untouched.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {[
                      "Returning users continue through secure login",
                      "New students begin with guided support context",
                      "Progress is saved temporarily in sessionStorage",
                      "Escape closes and keyboard navigation is supported"
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-[20px] bg-white/8 px-4 py-3 text-sm font-bold text-white/82 ring-1 ring-white/10"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--theme-accent)]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              <main className="relative p-5 sm:p-7 lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-soft)] px-4 py-2 text-sm font-black text-[var(--theme-primary)]">
                    <Sparkles className="h-4 w-4" />
                    Access experience
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                    aria-label="Close access dialog"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-8">
                  <AnimatePresence mode="wait">
                    {view === "branch" ? (
                      <motion.section
                        key="branch"
                        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          reducedMotion ? undefined : { opacity: 0, y: -12 }
                        }
                      >
                        <h2 className="max-w-2xl text-5xl font-black leading-[0.96] tracking-[-0.08em] text-[var(--theme-ink)] sm:text-6xl">
                          Welcome. Glad you’re here today.
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                          Are you visiting us again, or is this your first time?
                        </p>

                        <div className="mt-9 grid gap-4 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() => setView("login")}
                            className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white/78 p-6 text-left shadow-[0_24px_80px_rgba(7,17,31,0.08)] transition hover:-translate-y-1 hover:border-[var(--theme-border)] hover:bg-[var(--theme-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                          >
                            <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--theme-ink)] text-white transition group-hover:bg-[var(--theme-primary)]">
                              <LogIn className="h-6 w-6" />
                            </div>

                            <h3 className="mt-6 text-2xl font-black tracking-[-0.06em] text-[var(--theme-ink)]">
                              I’m visiting again
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                              Continue through the existing secure login route.
                            </p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setView("signup")}
                            className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white/78 p-6 text-left shadow-[0_24px_80px_rgba(7,17,31,0.08)] transition hover:-translate-y-1 hover:border-[var(--theme-border)] hover:bg-[var(--theme-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                          >
                            <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--theme-primary)] text-white">
                              <FileCheck2 className="h-6 w-6" />
                            </div>

                            <h3 className="mt-6 text-2xl font-black tracking-[-0.06em] text-[var(--theme-ink)]">
                              This is my first time
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                              Begin with a gentle one-step-at-a-time support
                              journey.
                            </p>
                          </button>
                        </div>
                      </motion.section>
                    ) : null}

                    {view === "login" ? (
                      <motion.section
                        key="login"
                        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          reducedMotion ? undefined : { opacity: 0, y: -12 }
                        }
                      >
                        <button
                          type="button"
                          onClick={goBack}
                          className="inline-flex items-center gap-2 text-sm font-black text-slate-600 transition hover:text-[var(--theme-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Back
                        </button>

                        <h2 className="mt-6 max-w-2xl text-5xl font-black leading-[0.96] tracking-[-0.08em] text-[var(--theme-ink)] sm:text-6xl">
                          Welcome back.
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                          Your secure login system is preserved. We only add a
                          warm entry transition before sending you to the
                          existing route.
                        </p>

                        <div className="mt-8 rounded-[28px] border border-[var(--theme-border)] bg-[var(--theme-soft)] p-5">
                          <div className="flex gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--theme-primary)]" />
                            <p className="text-sm leading-6 text-[var(--theme-ink)]/80">
                              Existing providers, callbacks, sessions, roles,
                              and backend auth behavior are unchanged.
                            </p>
                          </div>
                        </div>

                        <Link
                          href="/login"
                          className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-[22px] bg-[var(--theme-primary)] px-6 text-sm font-black text-white shadow-[0_20px_55px_rgba(15,118,110,0.24)] transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                        >
                          Continue to secure login
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </motion.section>
                    ) : null}

                    {view === "signup" ? (
                      <motion.section
                        key="signup"
                        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          reducedMotion ? undefined : { opacity: 0, y: -12 }
                        }
                      >
                        <div className="flex items-center justify-between gap-4">
                          <button
                            type="button"
                            onClick={goBack}
                            className="inline-flex items-center gap-2 text-sm font-black text-slate-600 transition hover:text-[var(--theme-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                          </button>

                          <button
                            type="button"
                            onClick={resetOnboarding}
                            className="text-xs font-black text-slate-400 transition hover:text-[var(--theme-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                          >
                            Reset
                          </button>
                        </div>

                        <h2 className="mt-6 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.08em] text-[var(--theme-ink)] sm:text-5xl">
                          {resumed
                            ? "Welcome back, picking up where you left off."
                            : "Let’s begin gently."}
                        </h2>

                        <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
                          One input at a time. Press Enter to continue.
                        </p>

                        <div className="mt-7 grid gap-3">
                          {completedSteps.map((step) => {
                            const Icon = step.icon;

                            return (
                              <div
                                key={step.id}
                                className="flex items-center justify-between rounded-[20px] border border-emerald-100 bg-emerald-50/70 px-4 py-3"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-emerald-500 text-white">
                                    <Icon className="h-4 w-4" />
                                  </div>

                                  <div>
                                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
                                      {step.label}
                                    </p>

                                    <p className="mt-1 text-sm font-black text-emerald-950">
                                      {draft[step.id]}
                                    </p>
                                  </div>
                                </div>

                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              </div>
                            );
                          })}
                        </div>

                        {currentStep ? (
                          <div className="mt-6 rounded-[30px] border border-slate-200 bg-white/76 p-5 shadow-[0_22px_70px_rgba(7,17,31,0.08)]">
                            <div className="flex items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[var(--theme-primary)] text-white">
                                <CurrentIcon className="h-5 w-5" />
                              </div>

                              <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--theme-primary)]">
                                  Step {stepIndex + 1} of {onboardingSteps.length}
                                </p>

                                <label
                                  htmlFor={`progressive-${currentStep.id}`}
                                  className="mt-1 block text-lg font-black tracking-[-0.045em] text-[var(--theme-ink)]"
                                >
                                  {currentStep.label}
                                </label>
                              </div>
                            </div>

                            <input
                              ref={firstInputRef}
                              id={`progressive-${currentStep.id}`}
                              type={currentStep.type}
                              value={draft[currentStep.id] ?? ""}
                              onChange={(event) =>
                                updateCurrentValue(event.target.value)
                              }
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  goToNextStep();
                                }
                              }}
                              placeholder={currentStep.placeholder}
                              className="mt-5 h-15 w-full rounded-[24px] border border-slate-200 bg-white px-5 text-base font-semibold text-[var(--theme-ink)] shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--theme-primary)] focus:ring-4 focus:ring-[var(--theme-ring)]"
                            />
                          </div>
                        ) : null}

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            onClick={goBack}
                            className="inline-flex h-13 items-center justify-center rounded-[20px] border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                          >
                            Back
                          </button>

                          <button
                            type="button"
                            onClick={goToNextStep}
                            className="inline-flex h-13 flex-1 items-center justify-center gap-2 rounded-[20px] bg-[var(--theme-primary)] px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,118,110,0.24)] transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                          >
                            {stepIndex === onboardingSteps.length - 1
                              ? "Continue to application"
                              : "Continue"}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="mt-5 text-xs leading-5 text-slate-500">
                          Temporary progress is saved only in this browser tab
                          session. Final submission still uses the existing
                          application/backend flow.
                        </p>
                      </motion.section>
                    ) : null}
                  </AnimatePresence>
                </div>
              </main>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
