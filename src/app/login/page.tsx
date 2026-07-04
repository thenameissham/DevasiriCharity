import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/blocks/login-form";

export const metadata: Metadata = {
  title: "Portal Login",
  description:
    "Secure role-based access for Devasiri students, donors, volunteers, and administrators.",
};

function LoginFallback() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f5f7] px-5 py-14 sm:px-8">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-[#e9f2ff]/55 blur-3xl"
      />

      <section className="relative w-full max-w-[500px] rounded-[12px] border border-white/90 bg-white/95 px-6 py-8 shadow-[0_24px_70px_rgba(9,30,66,0.16)] backdrop-blur-xl sm:px-10 sm:py-10">
        <div className="mx-auto h-12 w-44 animate-pulse rounded-[6px] bg-[#f1f2f4]" />

        <div className="mx-auto mt-6 h-7 w-52 animate-pulse rounded-[6px] bg-[#dfe1e6]" />

        <div className="mx-auto mt-3 h-4 w-72 max-w-full animate-pulse rounded-[6px] bg-[#f1f2f4]" />

        <div className="mt-7 grid grid-cols-2 gap-2">
          {Array.from(
            {
              length: 4,
            },
            (_, index) => (
              <div
                key={index}
                className="h-11 animate-pulse rounded-[6px] bg-[#f1f2f4]"
              />
            ),
          )}
        </div>

        <div className="mt-5 h-16 animate-pulse rounded-[8px] bg-[#f7f8f9]" />

        <div className="mt-5 h-11 animate-pulse rounded-[6px] bg-[#f1f2f4]" />

        <div className="mt-4 h-11 animate-pulse rounded-[6px] bg-[#f1f2f4]" />

        <div className="mt-5 h-11 animate-pulse rounded-[6px] bg-[#0f766e]/20" />
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
