"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode
} from "react";

export interface JourneyStep {
  readonly id: string;
  readonly label: string;
  readonly description: string;
}

interface JourneyProgressContextValue {
  readonly steps: readonly JourneyStep[];
  readonly currentStepId: string;
  readonly currentIndex: number;
  readonly progressPercent: number;
  readonly isCompleted: (stepId: string) => boolean;
  readonly isActive: (stepId: string) => boolean;
}

const JourneyProgressContext =
  createContext<JourneyProgressContextValue | null>(null);

interface JourneyProgressProviderProps {
  readonly steps: readonly JourneyStep[];
  readonly currentStepId: string;
  readonly children: ReactNode;
}

export function JourneyProgressProvider({
  steps,
  currentStepId,
  children
}: JourneyProgressProviderProps) {
  const value = useMemo<JourneyProgressContextValue>(() => {
    const foundIndex = steps.findIndex((step) => step.id === currentStepId);
    const currentIndex = Math.max(foundIndex, 0);
    const progressPercent =
      steps.length <= 1
        ? 100
        : Math.round((currentIndex / (steps.length - 1)) * 100);

    return {
      steps,
      currentStepId,
      currentIndex,
      progressPercent,
      isCompleted: (stepId: string) => {
        const stepIndex = steps.findIndex((step) => step.id === stepId);
        return stepIndex >= 0 && stepIndex < currentIndex;
      },
      isActive: (stepId: string) => stepId === currentStepId
    };
  }, [currentStepId, steps]);

  return (
    <JourneyProgressContext.Provider value={value}>
      {children}
    </JourneyProgressContext.Provider>
  );
}

export function useJourneyProgress() {
  const context = useContext(JourneyProgressContext);

  if (!context) {
    throw new Error(
      "useJourneyProgress must be used inside JourneyProgressProvider."
    );
  }

  return context;
}
