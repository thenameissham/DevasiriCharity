import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="glass-card max-w-lg rounded-[32px] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[22px] bg-blue-50 text-blue-600">
          <SearchX aria-hidden="true" className="h-7 w-7" />
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.055em] text-slate-950">
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          This page may have moved, or the link may be incorrect.
        </p>

        <Button href="/" className="mt-6">
          Go back home
        </Button>
      </section>
    </main>
  );
}