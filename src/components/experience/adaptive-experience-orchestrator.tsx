"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Sparkles, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
}

interface Burst {
  id: number;
  x: number;
  y: number;
}

type PrefillDraft = {
  readonly fullName?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly supportNeed?: string;
};

const PREFILL_KEY = "devasiri-onboarding-prefill";

const fieldMap = {
  fullName: ["fullName", "name", "studentName", "applicantName"],
  email: ["email", "studentEmail", "applicantEmail"],
  phone: ["phone", "mobile", "phoneNumber", "contactNumber", "studentPhone"],
  supportNeed: [
    "supportNeed",
    "need",
    "supportType",
    "message",
    "reason",
    "description"
  ]
} satisfies Record<keyof PrefillDraft, readonly string[]>;

function hexToRgba(hex: string, alpha: number) {
  const cleanHex = hex.trim().replace("#", "");

  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return `rgba(15, 118, 110, ${alpha})`;
}

function FluidCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({
    x: typeof window === "undefined" ? 0 : window.innerWidth / 2,
    y: typeof window === "undefined" ? 0 : window.innerHeight / 2
  });
  const { reducedMotion } = useMotionExperience();

  useEffect(() => {
    const currentCanvas = canvasRef.current;

    if (currentCanvas === null || reducedMotion) return;

    const canvas: HTMLCanvasElement = currentCanvas;
    const context = canvas.getContext("2d");

    if (context === null) return;

    const ctx: CanvasRenderingContext2D = context;

    let frameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const rootStyles = getComputedStyle(document.documentElement);
    const primary =
      rootStyles.getPropertyValue("--theme-primary").trim() || "#0f766e";
    const accent =
      rootStyles.getPropertyValue("--theme-accent").trim() || "#b7791f";

    const particles: Particle[] = Array.from({ length: 54 }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      radius: 1.2 + Math.random() * 2.6,
      alpha: 0.14 + Math.random() * 0.18,
      phase: index * 0.35
    }));

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;

      const glow = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        Math.min(width, height) * 0.34
      );

      glow.addColorStop(0, hexToRgba(primary, 0.16));
      glow.addColorStop(0.44, hexToRgba(accent, 0.08));
      glow.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.phase += 0.012;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        const breathingAlpha =
          particle.alpha + Math.sin(particle.phase) * 0.055;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(primary, breathingAlpha);
        ctx.fill();
      });

      frameId = window.requestAnimationFrame(draw);
    }

    function handlePointerMove(event: PointerEvent) {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-45"
    />
  );
}

function InteractionBurstLayer() {
  const [bursts, setBursts] = useState<readonly Burst[]>([]);
  const idRef = useRef(0);
  const { reducedMotion } = useMotionExperience();

  useEffect(() => {
    if (reducedMotion) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const interactiveElement = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-experience-trigger]"
      );

      if (!interactiveElement) return;

      const id = idRef.current + 1;
      idRef.current = id;

      const burst = {
        id,
        x: event.clientX,
        y: event.clientY
      };

      setBursts((previous) => [...previous.slice(-5), burst]);

      window.setTimeout(() => {
        setBursts((previous) => previous.filter((item) => item.id !== id));
      }, 900);
    }

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[10004]"
    >
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.span
            key={burst.id}
            className="absolute h-20 w-20 rounded-full border border-[var(--theme-primary)]/25 bg-[radial-gradient(circle,var(--theme-primary)_0%,var(--theme-accent)_42%,transparent_70%)] opacity-30 blur-[1px]"
            style={{
              left: burst.x - 40,
              top: burst.y - 40
            }}
            initial={{
              scale: 0.15,
              opacity: 0.38
            }}
            animate={{
              scale: 2.4,
              opacity: 0
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function RouteTransitionVeil() {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);
  const [visible, setVisible] = useState(false);
  const { reducedMotion } = useMotionExperience();

  useEffect(() => {
    if (reducedMotion) {
      previousPathnameRef.current = pathname;
      return;
    }

    if (previousPathnameRef.current === pathname) return;

    previousPathnameRef.current = pathname;
    setVisible(true);

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 560);

    return () => window.clearTimeout(timer);
  }, [pathname, reducedMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden bg-white/18 backdrop-blur-[18px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--theme-primary)_0%,var(--theme-accent)_34%,transparent_70%)] opacity-20 blur-3xl"
            initial={{ scale: 0.45, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 0.22 }}
            exit={{ scale: 1.35, opacity: 0 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="absolute inset-y-0 left-[-20%] w-[40%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
            initial={{ x: "-20%" }}
            animate={{ x: "340%" }}
            transition={{ duration: 0.54, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function findField(candidates: readonly string[]) {
  const fields = Array.from(
    document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      "input, textarea"
    )
  );

  for (const candidate of candidates) {
    const normalizedCandidate = candidate.toLowerCase();

    const exactMatch = fields.find((field) => {
      const name = (field.getAttribute("name") ?? "").toLowerCase();
      const id = (field.getAttribute("id") ?? "").toLowerCase();

      return name === normalizedCandidate || id === normalizedCandidate;
    });

    if (exactMatch) return exactMatch;
  }

  for (const candidate of candidates) {
    const normalizedCandidate = candidate.toLowerCase();

    const softMatch = fields.find((field) => {
      const placeholder = (
        field.getAttribute("placeholder") ?? ""
      ).toLowerCase();
      const ariaLabel = (field.getAttribute("aria-label") ?? "").toLowerCase();

      return (
        placeholder.includes(normalizedCandidate) ||
        ariaLabel.includes(normalizedCandidate)
      );
    });

    if (softMatch) return softMatch;
  }

  return null;
}

function setNativeFieldValue(
  element: HTMLInputElement | HTMLTextAreaElement,
  value: string
) {
  const prototype =
    element instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;

  const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

  if (descriptor?.set) {
    descriptor.set.call(element, value);
  } else {
    element.value = value;
  }

  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
}

function ApplicationPrefillBridge() {
  const pathname = usePathname();
  const [draft, setDraft] = useState<PrefillDraft | null>(null);
  const [applied, setApplied] = useState(false);
  const [hidden, setHidden] = useState(false);
  const shouldShow = pathname === "/apply" || pathname.startsWith("/apply/");

  useEffect(() => {
    if (!shouldShow) return;

    const savedDraft = sessionStorage.getItem(PREFILL_KEY);

    if (!savedDraft) return;

    try {
      const parsed = JSON.parse(savedDraft) as PrefillDraft;
      setDraft(parsed);
      setApplied(false);
      setHidden(false);
    } catch {
      sessionStorage.removeItem(PREFILL_KEY);
    }
  }, [shouldShow, pathname]);

  const availableFields = useMemo(() => {
    if (!draft) return [];

    return Object.entries(draft).filter(([, value]) => Boolean(value?.trim()));
  }, [draft]);

  const applySavedDetails = useCallback(() => {
    if (!draft) return;

    (Object.entries(fieldMap) as Array<
      [keyof PrefillDraft, readonly string[]]
    >).forEach(([key, candidates]) => {
      const value = draft[key]?.trim();

      if (!value) return;

      const field = findField(candidates);

      if (!field) return;

      setNativeFieldValue(field, value);
    });

    setApplied(true);
  }, [draft]);

  if (!shouldShow || hidden || !draft || availableFields.length === 0) {
    return null;
  }

  return (
    <motion.aside
      initial={{ opacity: 0, y: -18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed left-1/2 top-28 z-[9988] w-[min(680px,calc(100vw-2rem))] -translate-x-1/2 rounded-[28px] border border-white/80 bg-white/88 p-4 shadow-[0_24px_90px_rgba(7,17,31,0.16)] backdrop-blur-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[var(--theme-soft)] text-[var(--theme-primary)]">
          {applied ? (
            <CheckCircle2 className="h-6 w-6" />
          ) : (
            <Sparkles className="h-6 w-6" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-black tracking-[-0.035em] text-[var(--theme-ink)]">
            {applied
              ? "Saved details applied"
              : "Continue with your saved onboarding details?"}
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            We found details from the guided entry flow. You can apply them to
            matching application fields without changing the backend process.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {availableFields.map(([key]) => (
              <span
                key={key}
                className="rounded-full bg-[var(--theme-soft)] px-3 py-1 text-xs font-black text-[var(--theme-primary)]"
              >
                {key}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={applySavedDetails}
              className="inline-flex h-11 items-center justify-center rounded-[16px] bg-[var(--theme-primary)] px-5 text-sm font-black text-white shadow-[0_16px_40px_rgba(15,118,110,0.20)] transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
            >
              Apply saved details
            </button>

            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem(PREFILL_KEY);
                setHidden(true);
              }}
              className="inline-flex h-11 items-center justify-center rounded-[16px] border border-slate-200 bg-white px-5 text-sm font-black text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
            >
              Clear saved details
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setHidden(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] text-slate-500 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
          aria-label="Hide saved details prompt"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </motion.aside>
  );
}

export function AdaptiveExperienceOrchestrator() {
  return (
    <>
      <FluidCanvasBackground />
      <RouteTransitionVeil />
      <InteractionBurstLayer />
      <ApplicationPrefillBridge />
    </>
  );
}
