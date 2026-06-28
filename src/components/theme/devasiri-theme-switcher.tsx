"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette, X } from "lucide-react";
import { useState } from "react";
import {
  devasiriThemes,
  useDevasiriTheme
} from "@/components/theme/devasiri-theme-provider";
import { cn } from "@/lib/cn";

export function DevasiriThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useDevasiriTheme();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-[9998] hidden h-12 items-center gap-2 rounded-full border border-white/70 bg-[var(--theme-ink)] px-4 text-xs font-black text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-[var(--theme-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)] md:inline-flex"
        aria-label="Open color theme studio"
      >
        <Palette className="h-4 w-4" />
        Theme Studio
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[10002] flex items-end justify-center px-4 py-6 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close theme studio"
              className="absolute inset-0 cursor-default bg-slate-950/36 backdrop-blur-[16px]"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Choose Devasiri color theme"
              className="relative w-full max-w-4xl overflow-hidden rounded-[38px] border border-white/70 bg-white/88 p-5 shadow-[0_44px_150px_rgba(15,23,42,0.34)] backdrop-blur-2xl"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 24
              }}
            >
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--theme-primary)]/20 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[var(--theme-accent)]/20 blur-3xl"
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-soft)] px-4 py-2 text-sm font-black text-[var(--theme-primary)]">
                      <Palette className="h-4 w-4" />
                      Devasiri Theme Studio
                    </div>

                    <h2 className="mt-5 text-4xl font-black tracking-[-0.075em] text-[var(--theme-ink)] sm:text-5xl">
                      Choose the visual mood.
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                      These themes are designed for trust, education, warmth,
                      and premium nonprofit identity. Your choice is saved on
                      this browser.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                    aria-label="Close theme studio"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  {devasiriThemes.map((item) => {
                    const active = item.id === theme;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTheme(item.id)}
                        className={cn(
                          "group rounded-[28px] border bg-white/70 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,23,42,0.12)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]",
                          active
                            ? "border-[var(--theme-primary)] ring-2 ring-[var(--theme-ring)]"
                            : "border-slate-200"
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex -space-x-2">
                            {item.swatches.map((swatch) => (
                              <span
                                key={swatch}
                                className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: swatch }}
                              />
                            ))}
                          </div>

                          {active ? (
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--theme-primary)] text-white">
                              <Check className="h-4 w-4" />
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-5 text-lg font-black tracking-[-0.045em] text-slate-950">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                          {item.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
