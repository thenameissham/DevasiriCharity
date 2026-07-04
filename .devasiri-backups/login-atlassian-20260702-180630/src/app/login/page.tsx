import { Suspense } from "react";
import { LoginForm } from "@/components/blocks/login-form";

function LoginFallback() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(37,99,235,0.14),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(6,182,212,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fafc_48%,#eef4ff_100%)]" />

      <section className="relative w-full max-w-5xl rounded-[36px] border border-slate-200 bg-white/80 p-6 shadow-[0_28px_90px_rgba(15,23,42,0.1)] backdrop-blur-xl">
        <div className="h-12 w-48 animate-pulse rounded-[18px] bg-slate-200" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="h-96 animate-pulse rounded-[28px] bg-slate-100" />
          <div className="h-96 animate-pulse rounded-[28px] bg-slate-100" />
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}