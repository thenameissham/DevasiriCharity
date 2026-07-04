"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Eye,
  EyeOff,
  GraduationCap,
  HeartHandshake,
  LockKeyhole,
  ShieldCheck,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState, type FormEvent, type KeyboardEvent } from "react";
import { LoginBackgroundIllustrations } from "@/components/auth/login-background-illustrations";
import { cn } from "@/lib/cn";

type PortalKey = "STUDENT" | "DONOR" | "VOLUNTEER" | "ADMIN";

interface PortalOption {
  readonly key: PortalKey;
  readonly shortLabel: string;
  readonly title: string;
  readonly description: string;
  readonly callbackUrl: string;
  readonly icon: LucideIcon;
}

const portalOptions: readonly PortalOption[] = [
  {
    key: "STUDENT",
    shortLabel: "Student",
    title: "Student Portal",
    description: "Track your application, documents, and support status.",
    callbackUrl: "/student",
    icon: GraduationCap,
  },
  {
    key: "DONOR",
    shortLabel: "Donor",
    title: "Donor Portal",
    description: "Review donations, receipts, and supported campaigns.",
    callbackUrl: "/donor",
    icon: HeartHandshake,
  },
  {
    key: "VOLUNTEER",
    shortLabel: "Volunteer",
    title: "Volunteer Portal",
    description: "Continue verification, events, and student follow-ups.",
    callbackUrl: "/volunteer",
    icon: UsersRound,
  },
  {
    key: "ADMIN",
    shortLabel: "Admin",
    title: "Admin Portal",
    description: "Manage applications, campaigns, users, and impact records.",
    callbackUrl: "/admin",
    icon: ShieldCheck,
  },
];

const roleHomeMap: Record<string, string> = {
  ADMIN: "/admin",
  DONOR: "/donor",
  VOLUNTEER: "/volunteer",
  STUDENT: "/student",
};

function getPortalFromCallback(callbackUrl: string | null): PortalKey {
  if (!callbackUrl) return "STUDENT";
  if (callbackUrl.startsWith("/admin")) return "ADMIN";
  if (callbackUrl.startsWith("/donor")) return "DONOR";
  if (callbackUrl.startsWith("/volunteer")) return "VOLUNTEER";

  return "STUDENT";
}

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrlFromQuery = searchParams.get("callbackUrl");
  const hasRouteError = searchParams.get("error") !== null;
  const reducedMotion = useReducedMotion();

  const [selectedPortal, setSelectedPortal] = useState<PortalKey>(() =>
    getPortalFromCallback(callbackUrlFromQuery),
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [clientError, setClientError] = useState<string | null>(null);

  const selectedPortalDetails = useMemo(
    () =>
      portalOptions.find((portal) => portal.key === selectedPortal) ??
      portalOptions[0],
    [selectedPortal],
  );

  function focusPortal(index: number) {
    const normalizedIndex =
      (index + portalOptions.length) % portalOptions.length;

    const portal = portalOptions[normalizedIndex];

    setSelectedPortal(portal.key);

    window.requestAnimationFrame(() => {
      document.getElementById(`portal-${portal.key.toLowerCase()}`)?.focus();
    });
  }

  function handlePortalKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusPortal(index + 1);
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusPortal(index - 1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusPortal(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusPortal(portalOptions.length - 1);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setClientError(null);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();

    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setClientError("Enter your registered email and password.");

      setIsSubmitting(false);
      return;
    }

    const targetCallbackUrl =
      callbackUrlFromQuery ?? selectedPortalDetails.callbackUrl;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: targetCallbackUrl,
    });

    if (result?.error) {
      setClientError("The email or password is incorrect.");

      setIsSubmitting(false);
      return;
    }

    try {
      const sessionResponse = await fetch("/api/auth/session", {
        cache: "no-store",
      });

      const session = (await sessionResponse.json()) as {
        user?: {
          role?: string;
        };
      };

      const roleHome =
        session.user?.role && roleHomeMap[session.user.role]
          ? roleHomeMap[session.user.role]
          : targetCallbackUrl;

      window.location.assign(callbackUrlFromQuery ?? roleHome);
    } catch {
      window.location.assign(result?.url ?? targetCallbackUrl);
    }
  }

  const visibleError =
    clientError ??
    (hasRouteError ? "The email or password is incorrect." : null);

  const SelectedPortalIcon = selectedPortalDetails.icon;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f5f7] px-5 py-20 sm:px-8 sm:py-16">
      <LoginBackgroundIllustrations />

      <Link
        href="/"
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-[6px] px-2 py-1.5 text-sm font-semibold text-[#44546f] transition hover:bg-white hover:text-[#0c66e4] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#0c66e4] sm:left-8 sm:top-7"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Devasiri
      </Link>

      <motion.section
        aria-labelledby="login-title"
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                y: 18,
                scale: 0.985,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 w-full max-w-[430px] rounded-[12px] border border-[#dfe1e6] bg-white px-6 py-8 shadow-[0_8px_24px_rgba(9,30,66,0.15)] sm:px-9 sm:py-9"
      >
        <div className="text-center">
          <Link
            href="/"
            aria-label="Devasiri Charitable Trust home"
            className="inline-flex rounded-[6px] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#0c66e4]"
          >
            <Image
              src="/brand/devasiri-logo.png"
              alt="Devasiri Charitable Trust"
              width={220}
              height={72}
              priority
              className="h-12 w-auto object-contain"
            />
          </Link>

          <h1
            id="login-title"
            className="mt-6 text-2xl font-bold tracking-[-0.035em] text-[#172b4d]"
          >
            Log in to continue
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#626f86]">
            Use your registered Devasiri account to access the secure portal.
          </p>
        </div>

        <fieldset className="mt-7">
          <legend className="text-sm font-semibold text-[#172b4d]">
            Choose your portal
          </legend>

          <div
            role="radiogroup"
            aria-label="Choose your Devasiri portal"
            className="mt-2 grid grid-cols-2 gap-2"
          >
            {portalOptions.map((portal, index) => {
              const Icon = portal.icon;

              const isActive = selectedPortal === portal.key;

              return (
                <button
                  key={portal.key}
                  id={`portal-${portal.key.toLowerCase()}`}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={isActive ? 0 : -1}
                  disabled={isSubmitting}
                  onClick={() => setSelectedPortal(portal.key)}
                  onKeyDown={(event) => handlePortalKeyDown(event, index)}
                  className={cn(
                    "flex min-h-11 items-center gap-2 rounded-[6px] border px-3 py-2 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#0c66e4] disabled:cursor-not-allowed disabled:opacity-60",
                    isActive
                      ? "border-[#0f766e] bg-[#e6f6f2] text-[#0b5f59] shadow-[inset_0_0_0_1px_rgba(15,118,110,0.08)]"
                      : "border-[#dfe1e6] bg-white text-[#44546f] hover:border-[#b3b9c4] hover:bg-[#f7f8f9]",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />

                  {portal.shortLabel}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-4 flex items-start gap-3 rounded-[8px] bg-[#f7f8f9] px-3.5 py-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-white text-[#0f766e] shadow-sm ring-1 ring-[#dfe1e6]">
            <SelectedPortalIcon className="h-4 w-4" aria-hidden="true" />
          </span>

          <div>
            <p className="text-sm font-semibold text-[#172b4d]">
              {selectedPortalDetails.title}
            </p>

            <p className="mt-0.5 text-xs leading-5 text-[#626f86]">
              {selectedPortalDetails.description}
            </p>
          </div>
        </div>

        {visibleError ? (
          <div
            role="alert"
            className="mt-4 rounded-[6px] border border-[#ffd5d2] bg-[#fff0ee] px-3.5 py-3 text-sm font-medium text-[#ae2e24]"
          >
            {visibleError}
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          className="mt-5 grid gap-4"
          aria-busy={isSubmitting}
        >
          <label className="grid gap-1.5">
            <span className="text-sm font-semibold text-[#172b4d]">Email</span>

            <input
              name="email"
              type="email"
              required
              autoFocus
              autoComplete="email"
              inputMode="email"
              placeholder="Enter your email"
              aria-invalid={Boolean(visibleError)}
              className="h-11 w-full rounded-[6px] border border-[#b3b9c4] bg-white px-3 text-sm text-[#172b4d] outline-none transition placeholder:text-[#7a869a] hover:border-[#8590a2] focus:border-[#0c66e4] focus:ring-2 focus:ring-[#0c66e4]/20"
            />
          </label>

          <label className="grid gap-1.5">
            <span className="text-sm font-semibold text-[#172b4d]">
              Password
            </span>

            <span className="relative block">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="current-password"
                placeholder="Enter your password"
                aria-invalid={Boolean(visibleError)}
                className="h-11 w-full rounded-[6px] border border-[#b3b9c4] bg-white px-3 pr-11 text-sm text-[#172b4d] outline-none transition placeholder:text-[#7a869a] hover:border-[#8590a2] focus:border-[#0c66e4] focus:ring-2 focus:ring-[#0c66e4]/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-[6px] text-[#626f86] transition hover:bg-[#f1f2f4] hover:text-[#172b4d] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-[#0c66e4]"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[6px] bg-[#0f766e] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0b5f59] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#0c66e4] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Signing in..."
              : `Continue to ${selectedPortalDetails.shortLabel}`}

            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>

        <div className="my-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-[#dfe1e6]" />

          <span className="text-xs font-medium text-[#7a869a]">
            New student?
          </span>

          <span className="h-px flex-1 bg-[#dfe1e6]" />
        </div>

        <Link
          href="/apply"
          className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-[6px] border border-[#b3b9c4] bg-white px-4 text-sm font-semibold text-[#172b4d] transition hover:border-[#8590a2] hover:bg-[#f7f8f9] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#0c66e4]"
        >
          <UserRound className="h-4 w-4 text-[#0f766e]" aria-hidden="true" />
          Check scholarship eligibility
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>

        <div className="mt-6 border-t border-[#dfe1e6] pt-5 text-center">
          <p className="inline-flex items-center gap-2 text-xs font-medium text-[#626f86]">
            <LockKeyhole
              className="h-3.5 w-3.5 text-[#0f766e]"
              aria-hidden="true"
            />
            Secure role-based access
          </p>

          <p className="mt-2 text-[0.7rem] leading-5 text-[#7a869a]">
            Access is limited to approved Devasiri users. Your existing account,
            role, session, and redirect rules remain unchanged.
          </p>
        </div>
      </motion.section>
    </main>
  );
}
