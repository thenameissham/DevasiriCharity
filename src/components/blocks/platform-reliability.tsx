import {
  Gauge,
  LockKeyhole,
  Radar,
  Server,
  ShieldCheck,
  Zap
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionShell } from "@/components/ui/section-shell";

const reliabilityItems = [
  {
    title: "Fast by default",
    description:
      "System fonts, server-first rendering, lightweight cards, and route-level splitting reduce unnecessary waiting.",
    icon: Zap
  },
  {
    title: "Secure donation flow",
    description:
      "The architecture is ready for validation, payment verification, audit logs, and role-based authorization.",
    icon: LockKeyhole
  },
  {
    title: "Transparent operations",
    description:
      "Campaigns, students, donations, hostel support, and events are modeled for accountable reporting.",
    icon: ShieldCheck
  },
  {
    title: "Scalable backend",
    description:
      "Prisma, PostgreSQL, normalized relations, and clean service boundaries keep the system maintainable.",
    icon: Server
  },
  {
    title: "No blank waiting",
    description:
      "Loading skeletons, resilient error screens, and static-first landing sections improve perceived speed.",
    icon: Gauge
  },
  {
    title: "Realtime ready",
    description:
      "Impact ticker and donation metrics are structured for Redis and Pusher integration in the next backend phase.",
    icon: Radar
  }
] as const;

export function PlatformReliability() {
  return (
    <SectionShell
      dark
      eyebrow="Performance & Reliability"
      title="Built to feel instant, trustworthy, and resilient."
      description="This layer improves user confidence with fast visual feedback, production-safe boundaries, and scalable architecture choices."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reliabilityItems.map((item) => {
          const Icon = item.icon;

          return (
            <GlassPanel key={item.title} dark interactive className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-slate-950">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-lg font-bold tracking-[-0.035em] text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/64">
                {item.description}
              </p>
            </GlassPanel>
          );
        })}
      </div>
    </SectionShell>
  );
}