"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

export type DevasiriTheme =
  | "trust"
  | "royal"
  | "emerald"
  | "ocean"
  | "heritage";

interface DevasiriThemeOption {
  readonly id: DevasiriTheme;
  readonly name: string;
  readonly description: string;
  readonly swatches: readonly string[];
}

export const devasiriThemes: readonly DevasiriThemeOption[] = [
  {
    id: "trust",
    name: "Trust Teal Gold",
    description: "Calm charity, education, and accountability.",
    swatches: ["#07111f", "#0f766e", "#b7791f", "#fffaf2"]
  },
  {
    id: "royal",
    name: "Royal Indigo Rose",
    description: "Premium, modern, elegant, and emotionally warm.",
    swatches: ["#130f2f", "#4f46e5", "#db2777", "#fff7fb"]
  },
  {
    id: "emerald",
    name: "Emerald Sunrise",
    description: "Fresh, hopeful, student-first, and uplifting.",
    swatches: ["#052e2b", "#059669", "#f59e0b", "#f7fee7"]
  },
  {
    id: "ocean",
    name: "Ocean Sapphire",
    description: "Clean, confident, professional, and tech-forward.",
    swatches: ["#061826", "#0284c7", "#06b6d4", "#f0f9ff"]
  },
  {
    id: "heritage",
    name: "Heritage Maroon Gold",
    description: "Warm, Indian trust, giving, and foundation strength.",
    swatches: ["#2a0f18", "#9f1239", "#d97706", "#fff7ed"]
  }
];

interface DevasiriThemeContextValue {
  readonly theme: DevasiriTheme;
  readonly setTheme: (theme: DevasiriTheme) => void;
}

const DevasiriThemeContext = createContext<DevasiriThemeContextValue | null>(
  null
);

function isDevasiriTheme(value: string | null): value is DevasiriTheme {
  return (
    value === "trust" ||
    value === "royal" ||
    value === "emerald" ||
    value === "ocean" ||
    value === "heritage"
  );
}

export function DevasiriThemeProvider({
  children
}: {
  readonly children: ReactNode;
}) {
  const [theme, setThemeState] = useState<DevasiriTheme>(() => {
    if (typeof window === "undefined") return "trust";

    const storedTheme = window.localStorage.getItem("devasiri-theme");
    return isDevasiriTheme(storedTheme) ? storedTheme : "trust";
  });

  useEffect(() => {
    document.documentElement.dataset.devasiriTheme = theme;

    // Remove only the Stage 12 sentinel. Preserve every valid prior theme value.
    try {
      if (window.localStorage.getItem("devasiri-theme") === "monochrome") {
        window.localStorage.removeItem("devasiri-theme");
      }
    } catch {
      // The restored theme still works when browser storage is unavailable.
    }
  }, [theme]);

  function setTheme(nextTheme: DevasiriTheme) {
    setThemeState(nextTheme);
    localStorage.setItem("devasiri-theme", nextTheme);
    document.documentElement.dataset.devasiriTheme = nextTheme;
  }

  const value = useMemo(
    () => ({
      theme,
      setTheme
    }),
    [theme]
  );

  return (
    <DevasiriThemeContext.Provider value={value}>
      {children}
    </DevasiriThemeContext.Provider>
  );
}

export function useDevasiriTheme() {
  const context = useContext(DevasiriThemeContext);

  if (!context) {
    throw new Error(
      "useDevasiriTheme must be used inside DevasiriThemeProvider."
    );
  }

  return context;
}
