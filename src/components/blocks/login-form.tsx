"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  HeartHandshake,
  LockKeyhole,
  ShieldCheck,
  UserRound,
  UsersRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type PortalKey = "STUDENT" | "DONOR" | "VOLUNTEER" | "ADMIN";

interface PortalOption {
  readonly key: PortalKey;
  readonly title: string;
  readonly description: string;
  readonly callbackUrl: string;
  readonly icon: typeof GraduationCap;
}

const portalOptions: readonly PortalOption[] = [
  {
    key: "STUDENT",
    title: "Student Portal",
    description: "Track scholarship application, documents, and support status.",
    callbackUrl: "/student",
    icon: GraduationCap
  },
  {
    key: "DONOR",
    title: "Donor Portal",
    description: "View donations, receipts, and supported campaigns.",
    callbackUrl: "/donor",
    icon: HeartHandshake
  },
  {
    key: "VOLUNTEER",
    title: "Volunteer Portal",
    description: "Manage verification tasks, events, and student follow-ups.",
    callbackUrl: "/volunteer",
    icon: UsersRound
  },
  {
    key: "ADMIN",
    title: "Admin Portal",
    description: "Manage campaigns, applications, users, and impact records.",
    callbackUrl: "/admin",
    icon: ShieldCheck
  }
];

const roleHomeMap: Record<string, string> = {
  ADMIN: "/admin",
  DONOR: "/donor",
  VOLUNTEER: "/volunteer",
  STUDENT: "/student"
};

function getPortalFromCallback(callbackUrl: string | null): PortalKey {
  if (!callbackUrl) return "STUDENT";

  if (callbackUrl.startsWith("/admin")) return "ADMIN";
  if (callbackUrl.startsWith("/donor")) return "DONOR";
  if (callbackUrl.startsWith("/volunteer")) return "VOLUNTEER";
  if (callbackUrl.startsWith("/student")) return "STUDENT";

  return "STUDENT";
}

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrlFromQuery = searchParams.get("callbackUrl");
  const hasRouteError = searchParams.get("error") !== null;

  const [selectedPortal, setSelectedPortal] = useState<PortalKey>(() =>
    getPortalFromCallback(callbackUrlFromQuery)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);

  const selectedPortalDetails = useMemo(
    () =>
      portalOptions.find((portal) => portal.key === selectedPortal) ??
      portalOptions[0],
    [selectedPortal]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setClientError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setClientError("Please enter your email and password.");
      setIsSubmitting(false);
      return;
    }

    const targetCallbackUrl =
      callbackUrlFromQuery ?? selectedPortalDetails.callbackUrl;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: targetCallbackUrl
    });

    if (result?.error) {
      setClientError("Invalid email or password.");
      setIsSubmitting(false);
      return;
    }

    try {
      const sessionResponse = await fetch("/api/auth/session", {
        cache: "no-store"
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

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-16 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(37,99,235,0.14),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(6,182,212,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fafc_48%,#eef4ff_100%)]"
      />

      <section className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/brand/devasiri-logo.png"
              alt="Devasiri Charitable Trust"
              width={240}
              height={80}
              priority
              className="h-14 w-auto object-contain"
            />
          </Link>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm backdrop-blur-xl">
            <LockKeyhole className="h-4 w-4" />
            Secure role-based access
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-black tracking-[-0.075em] text-slate-950 sm:text-6xl">
            Choose your portal and continue securely.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Devasiri connects students, donors, volunteers, and administrators
            through one transparent scholarship support platform.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              "Scholarship tracking",
              "Verified records",
              "Transparent impact"
            ].map((item) => (
              <div
                key={item}
                className="rounded-[20px] border border-slate-200 bg-white/70 px-4 py-3 text-sm font-bold text-slate-700 backdrop-blur-xl"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[28px] border border-blue-100 bg-blue-50/70 p-5">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-white text-blue-600 shadow-sm">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-black tracking-[-0.03em] text-blue-950">
                  New student?
                </h2>
                <p className="mt-1 text-sm leading-6 text-blue-950/75">
                  Students do not need to login first. Start by checking
                  scholarship eligibility and submitting the application.
                </p>

                <Link
                  href="/apply"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700"
                >
                  Check eligibility
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="rounded-[36px] border border-slate-200 bg-white/84 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:p-7">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Portal Login
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.055em] text-slate-950">
              Sign in to continue.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Select the portal that matches your role before signing in.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {portalOptions.map((portal) => {
              const Icon = portal.icon;
              const isActive = selectedPortal === portal.key;

              return (
                <button
                  key={portal.key}
                  type="button"
                  onClick={() => setSelectedPortal(portal.key)}
                  className={cn(
                    "rounded-[24px] border p-4 text-left transition duration-200",
                    isActive
                      ? "border-blue-200 bg-blue-50 shadow-sm"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  )}
                >
                  <div className="flex gap-3">
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px]",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-black tracking-[-0.03em] text-slate-950">
                        {portal.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        {portal.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {hasRouteError || clientError ? (
            <div className="mt-5 rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {clientError ?? "Invalid email or password."}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <label>
              <span className="text-sm font-bold text-slate-700">Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter registered email"
                className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label>
              <span className="text-sm font-bold text-slate-700">Password</span>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="current-password"
                placeholder="Enter password"
                className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="mt-2 w-full"
            >
              {isSubmitting
                ? "Signing in..."
                : `Continue to ${selectedPortalDetails.title}`}
              <BadgeCheck className="h-5 w-5" />
            </Button>
          </form>

          <div className="mt-6 flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black text-slate-950">
                Need scholarship support?
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Start with eligibility instead of portal login.
              </p>
            </div>

            <Button href="/apply" variant="secondary" size="sm">
              Check Eligibility
              <UserRound className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}