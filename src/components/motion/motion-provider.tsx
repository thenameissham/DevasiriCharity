"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import {
  PremiumAccessOverlay,
  type AuthIntent
} from "@/components/auth/premium-access-overlay";
import { ApplicationJourneyAssistant } from "@/components/blocks/application-journey-assistant";
import { ExperienceCommandCenter } from "@/components/experience/experience-command-center";
import { AdaptiveExperienceOrchestrator } from "@/components/experience/adaptive-experience-orchestrator";
import { CinematicJourneyNavigator } from "@/components/experience/cinematic-journey-navigator";
import { ContextualExperienceCopilot } from "@/components/experience/contextual-experience-copilot";
import { ReduceMotionToggle } from "@/components/motion/reduce-motion-toggle";
import { DevasiriThemeProvider } from "@/components/theme/devasiri-theme-provider";
import { DevasiriThemeSwitcher } from "@/components/theme/devasiri-theme-switcher";

interface MotionExperienceContextValue {
  readonly reducedMotion: boolean;
  readonly setReducedMotion: (value: boolean) => void;
  readonly openAuthOverlay: (intent?: AuthIntent) => void;
  readonly closeAuthOverlay: () => void;
}

const MotionExperienceContext =
  createContext<MotionExperienceContextValue | null>(null);

export function useMotionExperience() {
  const context = useContext(MotionExperienceContext);

  if (!context) {
    throw new Error(
      "useMotionExperience must be used inside MotionProvider."
    );
  }

  return context;
}

export function MotionProvider({ children }: { readonly children: ReactNode }) {
  const [reducedMotion, setReducedMotionState] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authIntent, setAuthIntent] = useState<AuthIntent>("branch");

  useEffect(() => {
    const stored = localStorage.getItem("devasiri-reduced-motion");

    if (stored) {
      setReducedMotionState(stored === "true");
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotionState(mediaQuery.matches);

    function handleChange(event: MediaQueryListEvent) {
      setReducedMotionState(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setReducedMotion = useCallback((value: boolean) => {
    setReducedMotionState(value);
    localStorage.setItem("devasiri-reduced-motion", String(value));
  }, []);

  const openAuthOverlay = useCallback((intent: AuthIntent = "branch") => {
    setAuthIntent(intent);
    setIsAuthOpen(true);
  }, []);

  const closeAuthOverlay = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      reducedMotion,
      setReducedMotion,
      openAuthOverlay,
      closeAuthOverlay
    }),
    [closeAuthOverlay, openAuthOverlay, reducedMotion, setReducedMotion]
  );

  return (
    <MotionExperienceContext.Provider value={value}>
      <DevasiriThemeProvider>
        {children}
        <AdaptiveExperienceOrchestrator />
        <CinematicJourneyNavigator />
        <ContextualExperienceCopilot />
        <ApplicationJourneyAssistant />
        <ExperienceCommandCenter />
        <DevasiriThemeSwitcher />
        <ReduceMotionToggle />
        <PremiumAccessOverlay
          isOpen={isAuthOpen}
          initialIntent={authIntent}
          reducedMotion={reducedMotion}
          onClose={closeAuthOverlay}
        />
      </DevasiriThemeProvider>
    </MotionExperienceContext.Provider>
  );
}
