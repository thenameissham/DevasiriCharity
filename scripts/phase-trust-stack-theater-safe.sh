#!/usr/bin/env bash

FAILED=0
LOG_DIR="logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/phase-trust-stack-theater-$(date +%Y%m%d-%H%M%S).log"

step() {
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" | tee -a "$LOG_FILE"
  echo "▶ $1" | tee -a "$LOG_FILE"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" | tee -a "$LOG_FILE"
}

run() {
  LABEL="$1"
  shift

  step "$LABEL"
  "$@" 2>&1 | tee -a "$LOG_FILE"
  STATUS=${PIPESTATUS[0]}

  if [ "$STATUS" -ne 0 ]; then
    echo "❌ Failed: $LABEL" | tee -a "$LOG_FILE"
    FAILED=1
    return 1
  fi

  echo "✅ Passed: $LABEL" | tee -a "$LOG_FILE"
  return 0
}

finish() {
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" | tee -a "$LOG_FILE"

  if [ "$FAILED" -eq 0 ]; then
    echo "✅ Trust Stack Theater phase completed successfully." | tee -a "$LOG_FILE"
    echo "📄 Log saved at: $LOG_FILE" | tee -a "$LOG_FILE"
    echo "Run: npm run dev" | tee -a "$LOG_FILE"
  else
    echo "⚠️ Phase stopped safely. Terminal is still open." | tee -a "$LOG_FILE"
    echo "📄 Send me:" | tee -a "$LOG_FILE"
    echo "tail -60 $LOG_FILE" | tee -a "$LOG_FILE"
  fi

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" | tee -a "$LOG_FILE"
}

step "Project safety check"

for item in package.json src/app src/components src/app/globals.css src/components/sections/home-page-sections.tsx; do
  if [ ! -e "$item" ]; then
    echo "❌ Missing: $item" | tee -a "$LOG_FILE"
    FAILED=1
  else
    echo "✅ Found: $item" | tee -a "$LOG_FILE"
  fi
done

if [ "$FAILED" -eq 0 ]; then
  step "Protect local logs"

  touch .gitignore

  python3 <<'PY' 2>&1 | tee -a "$LOG_FILE"
from pathlib import Path

path = Path(".gitignore")
text = path.read_text() if path.exists() else ""

for item in ["logs/", "build-error.log"]:
    if item not in text:
        text = text.rstrip() + "\n" + item + "\n"

path.write_text(text)
print("✅ .gitignore updated")
PY
fi

if [ "$FAILED" -eq 0 ]; then
  run "Checkpoint build before new phase" npm run build
fi

if [ "$FAILED" -eq 0 ]; then
  step "Checkpoint current successful work if pending"

  git add package.json package-lock.json .gitignore 2>&1 | tee -a "$LOG_FILE"
  git add src 2>&1 | tee -a "$LOG_FILE"
  git add scripts 2>&1 | tee -a "$LOG_FILE"

  if git diff --cached --quiet; then
    echo "ℹ️ No checkpoint changes staged" | tee -a "$LOG_FILE"
  else
    git commit -m "checkpoint premium experience system before trust stack" 2>&1 | tee -a "$LOG_FILE"
    STATUS=${PIPESTATUS[0]}

    if [ "$STATUS" -ne 0 ]; then
      echo "❌ Checkpoint commit failed safely" | tee -a "$LOG_FILE"
      FAILED=1
    else
      echo "✅ Checkpoint commit created" | tee -a "$LOG_FILE"
    fi
  fi
fi

if [ "$FAILED" -eq 0 ]; then
  mkdir -p src/components/blocks

  step "Creating Trust Stack Theater"

  cat > src/components/blocks/trust-stack-theater.tsx <<'TSX'
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  ClipboardCheck,
  FileCheck2,
  Fingerprint,
  GraduationCap,
  HeartHandshake,
  Layers3,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  type LucideIcon
} from "lucide-react";
import { useState } from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

type TrustLayer = {
  readonly title: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly checks: readonly string[];
};

const trustLayers: readonly TrustLayer[] = [
  {
    title: "Student identity begins gently.",
    eyebrow: "Layer 01 / Human Start",
    description:
      "The experience starts with a warm, guided entry instead of throwing students directly into a heavy form.",
    icon: UserRoundCheck,
    checks: [
      "Conversational first step",
      "Saved onboarding context",
      "Student-first language"
    ]
  },
  {
    title: "Education need becomes structured.",
    eyebrow: "Layer 02 / Need Context",
    description:
      "Fee support, hostel support, sponsorship, and urgent education needs become understandable and reviewable.",
    icon: GraduationCap,
    checks: [
      "Support category clarity",
      "Purpose-focused journey",
      "Reduced confusion"
    ]
  },
  {
    title: "Verification protects trust.",
    eyebrow: "Layer 03 / Review",
    description:
      "Identity, documents, education records, and support context stay connected before public support happens.",
    icon: ShieldCheck,
    checks: [
      "Admin review confidence",
      "Document-backed trust",
      "Role-safe access"
    ]
  },
  {
    title: "Campaigns become accountable.",
    eyebrow: "Layer 04 / Campaign",
    description:
      "Verified needs move into campaign experiences with story, target, progress, and clear donor intent.",
    icon: HeartHandshake,
    checks: [
      "Transparent campaign progress",
      "Purpose-led donor path",
      "Visible support state"
    ]
  },
  {
    title: "Receipts and records stay connected.",
    eyebrow: "Layer 05 / Ledger",
    description:
      "Donation records, receipts, and campaign progress are treated as part of one trust memory.",
    icon: ReceiptText,
    checks: [
      "Receipt-connected support",
      "Donation traceability",
      "Impact continuity"
    ]
  }
];

const operatingPrinciples = [
  {
    title: "Fluid canvas",
    description: "The interface feels continuous, not like disconnected static pages.",
    icon: Layers3
  },
  {
    title: "Secure routing",
    description: "Existing auth, roles, and protected routes remain untouched.",
    icon: LockKeyhole
  },
  {
    title: "Trust memory",
    description: "Every visible section reinforces review, records, and accountability.",
    icon: Fingerprint
  },
  {
    title: "Reduced clutter",
    description: "Motion and cards support clarity instead of fighting the illustration.",
    icon: BookOpenCheck
  }
] as const;

export function TrustStackTheater() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { reducedMotion } = useMotionExperience();

  const activeLayer = trustLayers[activeIndex] ?? trustLayers[0];
  const ActiveIcon = activeLayer.icon;

  return (
    <section
      id="impact"
      className="relative overflow-hidden bg-[var(--theme-surface)] px-6 py-24 sm:px-8 lg:px-12"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--theme-surface)_0%,white_44%,var(--theme-soft)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute left-[-280px] top-16 h-[760px] w-[760px] rounded-full bg-[var(--theme-primary)]/14 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-280px] bottom-16 h-[760px] w-[760px] rounded-full bg-[var(--theme-accent)]/14 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 devasiri-premium-grid opacity-45"
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 26 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-white/76 px-4 py-2 text-sm font-black text-[var(--theme-primary)] shadow-sm backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              Trust Stack Theater
            </div>

            <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.085em] text-[var(--theme-ink)] sm:text-5xl lg:text-7xl">
              The support journey feels premium because trust is built in layers.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-600">
            This section turns the Devasiri experience into a structured trust
            system: warm entry, clear need, verification, accountable campaigns,
            and connected receipts.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[420px_1fr]">
          <aside className="rounded-[44px] border border-white/80 bg-white/76 p-4 shadow-[0_34px_120px_rgba(7,17,31,0.11)] backdrop-blur-2xl">
            <div className="grid gap-3">
              {trustLayers.map((layer, index) => {
                const Icon = layer.icon;
                const active = index === activeIndex;

                return (
                  <button
                    key={layer.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "group flex items-center gap-4 rounded-[28px] border p-4 text-left transition duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]",
                      active
                        ? "border-[var(--theme-border)] bg-[var(--theme-soft)] shadow-[0_18px_55px_rgba(7,17,31,0.08)]"
                        : "border-transparent bg-white/54 hover:border-slate-200 hover:bg-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-13 w-13 shrink-0 items-center justify-center rounded-[20px] transition",
                        active
                          ? "bg-[var(--theme-primary)] text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-[var(--theme-soft)] group-hover:text-[var(--theme-primary)]"
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                        {layer.eyebrow}
                      </p>

                      <p className="mt-1 text-lg font-black tracking-[-0.05em] text-[var(--theme-ink)]">
                        {layer.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="relative overflow-hidden rounded-[48px] border border-white/80 bg-[var(--theme-ink)] p-6 text-white shadow-[0_44px_150px_rgba(7,17,31,0.26)] sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[var(--theme-primary)]/34 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[var(--theme-accent)]/24 blur-3xl"
            />

            <div className="relative grid gap-8 xl:grid-cols-[1fr_0.88fr]">
              <motion.div
                key={activeLayer.title}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-18 w-18 items-center justify-center rounded-[28px] bg-white/10 text-[var(--theme-accent)] ring-1 ring-white/10">
                  <ActiveIcon className="h-9 w-9" />
                </div>

                <p className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-white/42">
                  {activeLayer.eyebrow}
                </p>

                <h3 className="mt-4 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.08em] sm:text-5xl">
                  {activeLayer.title}
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/66">
                  {activeLayer.description}
                </p>

                <div className="mt-8 grid gap-3">
                  {activeLayer.checks.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-[20px] bg-white/8 px-4 py-3 text-sm font-bold text-white/84 ring-1 ring-white/10"
                    >
                      <BadgeCheck className="h-4 w-4 shrink-0 text-[var(--theme-accent)]" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/apply"
                    className="inline-flex h-13 items-center justify-center gap-2 rounded-[20px] bg-[var(--theme-primary)] px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,118,110,0.24)] transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-white/20"
                  >
                    Start Student Journey
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/campaigns"
                    className="inline-flex h-13 items-center justify-center gap-2 rounded-[20px] border border-white/15 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
                  >
                    Explore Campaigns
                  </Link>
                </div>
              </motion.div>

              <div className="grid gap-4">
                <div className="rounded-[36px] bg-white/8 p-5 ring-1 ring-white/10">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-white/44">
                    Operating principles
                  </p>

                  <div className="mt-5 grid gap-3">
                    {operatingPrinciples.map((principle) => {
                      const Icon = principle.icon;

                      return (
                        <div
                          key={principle.title}
                          className="rounded-[24px] bg-white/7 p-4 ring-1 ring-white/10"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[17px] bg-white/10 text-[var(--theme-accent)]">
                              <Icon className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="text-sm font-black text-white">
                                {principle.title}
                              </p>

                              <p className="mt-1 text-xs leading-5 text-white/50">
                                {principle.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[36px] bg-white/8 p-5 ring-1 ring-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.18em] text-white/44">
                        Flow state
                      </p>

                      <p className="mt-3 text-3xl font-black tracking-[-0.07em]">
                        Continuous
                      </p>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--theme-primary)] text-white shadow-[0_0_55px_rgba(255,255,255,0.12)]">
                      <FileCheck2 className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-accent)] to-[var(--theme-primary)]"
                      initial={reducedMotion ? false : { width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: reducedMotion ? 0 : 1.2 }}
                    />
                  </div>

                  <p className="mt-4 text-xs leading-5 text-white/50">
                    This reinforces the prompt condition: pages should feel like
                    one fluid canvas instead of static blocks snapping into view.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Need to review",
              text: "Application context moves toward verification.",
              icon: ClipboardCheck
            },
            {
              title: "Review to support",
              text: "Verified needs become accountable campaigns.",
              icon: HeartHandshake
            },
            {
              title: "Support to memory",
              text: "Receipts and impact remain connected.",
              icon: ReceiptText
            }
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[32px] border border-white/80 bg-white/74 p-6 shadow-[0_24px_80px_rgba(7,17,31,0.08)] backdrop-blur-2xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[var(--theme-soft)] text-[var(--theme-primary)]">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-2xl font-black tracking-[-0.06em] text-[var(--theme-ink)]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
TSX
fi

if [ "$FAILED" -eq 0 ]; then
  step "Wiring Trust Stack Theater into homepage"

  python3 <<'PY' 2>&1 | tee -a "$LOG_FILE"
from pathlib import Path

path = Path("src/components/sections/home-page-sections.tsx")
text = path.read_text()

import_line = 'import { TrustStackTheater } from "@/components/blocks/trust-stack-theater";'

if import_line not in text:
    lines = text.splitlines()
    insert_index = 0
    for index, line in enumerate(lines):
        if line.startswith("import "):
            insert_index = index + 1
    lines.insert(insert_index, import_line)
    text = "\n".join(lines) + "\n"

if "<TrustStackTheater />" not in text:
    if "<ImpactObservatory />" in text:
        text = text.replace(
            "      <ImpactObservatory />",
            "      <ImpactObservatory />\n      <TrustStackTheater />"
        )
    elif "<MissionFlowTheater />" in text:
        text = text.replace(
            "      <MissionFlowTheater />",
            "      <MissionFlowTheater />\n      <TrustStackTheater />"
        )
    elif "<HomeExperienceShowcase />" in text:
        text = text.replace(
            "      <HomeExperienceShowcase />",
            "      <HomeExperienceShowcase />\n      <TrustStackTheater />"
        )
    else:
        text = text.replace(
            "      <VideoHero />",
            "      <VideoHero />\n      <TrustStackTheater />"
        )

path.write_text(text)
print("✅ Trust Stack Theater wired")
PY
fi

if [ "$FAILED" -eq 0 ]; then
  run "Clean Next.js cache" rm -rf .next
fi

if [ "$FAILED" -eq 0 ]; then
  run "Production build after Trust Stack Theater" npm run build
fi

if [ "$FAILED" -eq 0 ]; then
  step "Stage Trust Stack Theater"

  git add src/components/blocks/trust-stack-theater.tsx 2>&1 | tee -a "$LOG_FILE"
  git add src/components/sections/home-page-sections.tsx 2>&1 | tee -a "$LOG_FILE"
  echo "✅ Trust Stack Theater staged" | tee -a "$LOG_FILE"
fi

if [ "$FAILED" -eq 0 ]; then
  step "Commit Trust Stack Theater"

  if git diff --cached --quiet; then
    echo "ℹ️ No staged implementation changes found" | tee -a "$LOG_FILE"
  else
    git commit -m "add premium trust stack theater" 2>&1 | tee -a "$LOG_FILE"
    STATUS=${PIPESTATUS[0]}

    if [ "$STATUS" -ne 0 ]; then
      echo "❌ Trust Stack commit failed safely" | tee -a "$LOG_FILE"
      FAILED=1
    else
      echo "✅ Trust Stack Theater commit created" | tee -a "$LOG_FILE"
    fi
  fi
fi

if [ "$FAILED" -eq 0 ]; then
  run "Push commits" git push
fi

if [ "$FAILED" -eq 0 ]; then
  run "Final git status" git status -sb
fi

finish
