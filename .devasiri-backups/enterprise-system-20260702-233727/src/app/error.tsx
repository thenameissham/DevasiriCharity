"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  readonly error: Error & {
    digest?: string;
  };
  readonly reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="glass-card max-w-lg rounded-[32px] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[22px] bg-red-50 text-red-600">
          <AlertTriangle aria-hidden="true" className="h-7 w-7" />
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.055em] text-slate-950">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          The page could not load safely. You can retry without losing your
          current browser session.
        </p>

        {error.digest ? (
          <p className="mt-4 rounded-[16px] bg-slate-100 px-4 py-3 text-xs font-semibold text-slate-500">
            Error reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-6 flex justify-center">
          <Button type="button" onClick={reset}>
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </section>
    </main>
  );
}