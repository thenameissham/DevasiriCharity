import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="glass-card max-w-md rounded-[32px] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[22px] bg-red-50 text-red-600">
          <ShieldAlert className="h-7 w-7" />
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.055em] text-slate-950">
          Access restricted
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Your account does not have permission to access this dashboard.
        </p>

        <Button href="/" className="mt-6">
          Go home
        </Button>
      </section>
    </main>
  );
}