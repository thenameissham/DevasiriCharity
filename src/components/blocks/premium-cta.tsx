import { ArrowRight, HeartHandshake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export function PremiumCTA() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12">
      <GlassPanel className="surface-noise relative mx-auto max-w-7xl overflow-hidden p-8 md:p-12">
        <div
          aria-hidden="true"
          className="premium-orb absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-blue-50/80 to-transparent"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              <ShieldCheck aria-hidden="true" className="h-4 w-4" />
              Public accountability first
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">
              Make Devasiri feel like a modern impact platform, not just a donation website.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">
              The frontend is now structured for premium landing pages,
              dashboards, campaign flows, donation journeys, and future
              real-time impact tracking.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button href="#donate" size="lg">
              Donate now
              <HeartHandshake aria-hidden="true" className="h-5 w-5" />
            </Button>

            <Button href="#campaigns" variant="secondary" size="lg">
              Explore campaigns
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}