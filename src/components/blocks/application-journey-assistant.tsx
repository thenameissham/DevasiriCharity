"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, GraduationCap, X } from "lucide-react";
import { JourneyProgressProvider } from "@/components/journey/journey-progress-provider";
import { JourneyTimeline } from "@/components/journey/journey-timeline";
import { cn } from "@/lib/cn";

const applicationSteps = [
  {
    id: "identity",
    label: "Identity",
    description: "Basic student and applicant details"
  },
  {
    id: "contact",
    label: "Contact",
    description: "Email, phone, and communication details"
  },
  {
    id: "education",
    label: "Education",
    description: "College, course, semester, and academic info"
  },
  {
    id: "support",
    label: "Support Need",
    description: "Fee, hostel, sponsorship, or emergency need"
  },
  {
    id: "documents",
    label: "Documents",
    description: "Proofs and verification-ready records"
  },
  {
    id: "review",
    label: "Review",
    description: "Confirm everything before submission"
  },
  {
    id: "submitted",
    label: "Submitted",
    description: "Application received by Devasiri team"
  }
] as const;

function getCurrentStepFromPath(pathname: string): string {
  if (pathname.includes("/success")) return "submitted";
  if (pathname.includes("/start")) return "education";
  if (pathname.includes("/apply")) return "identity";

  return "identity";
}

export function ApplicationJourneyAssistant() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const shouldShow = pathname === "/apply" || pathname.startsWith("/apply/");

  const currentStep = useMemo(
    () => getCurrentStepFromPath(pathname),
    [pathname]
  );

  if (!shouldShow) return null;

  return (
    <JourneyProgressProvider
      steps={applicationSteps}
      currentStepId={currentStep}
    >
      <aside className="fixed bottom-20 right-4 z-[9990] w-[min(390px,calc(100vw-2rem))] lg:bottom-6 lg:right-6">
        <div
          className={cn(
            "transition duration-300",
            isOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          )}
        >
          <JourneyTimeline />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[20px] border border-white/70 bg-white/86 px-5 text-sm font-black text-slate-800 shadow-[0_18px_55px_rgba(15,23,42,0.13)] backdrop-blur-2xl transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
          aria-expanded={isOpen}
          aria-label={
            isOpen
              ? "Hide application journey"
              : "Show application journey"
          }
        >
          {isOpen ? (
            <>
              <X className="h-4 w-4" />
              Hide journey
            </>
          ) : (
            <>
              <GraduationCap className="h-4 w-4 text-blue-600" />
              Show application journey
              <ChevronDown className="h-4 w-4 rotate-180" />
            </>
          )}
        </button>
      </aside>
    </JourneyProgressProvider>
  );
}
