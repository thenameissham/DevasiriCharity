#!/usr/bin/env bash

FAILED=0
LOG_DIR="logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/phase-mission-flow-theater-$(date +%Y%m%d-%H%M%S).log"

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
    echo "✅ Phase completed successfully." | tee -a "$LOG_FILE"
    echo "📄 Log saved at: $LOG_FILE" | tee -a "$LOG_FILE"
    echo ""
    echo "Next safe commands:" | tee -a "$LOG_FILE"
    echo "git status -sb" | tee -a "$LOG_FILE"
    echo "git push" | tee -a "$LOG_FILE"
  else
    echo "⚠️ Phase stopped safely. Terminal is still open." | tee -a "$LOG_FILE"
    echo "📄 Send me this output:" | tee -a "$LOG_FILE"
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

if [ "$FAILED" -ne 0 ]; then
  finish
else
  mkdir -p src/components/blocks

  step "Creating Mission Flow Theater component"

  cat > src/components/blocks/mission-flow-theater.tsx <<'TSX'
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  HeartHandshake,
  IndianRupee,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UserRoundCheck
} from "lucide-react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

const flowSteps = [
  {
    title: "Student Need",
    description:
      "A student starts with a clear, guided support path instead of a confusing form.",
    icon: UserRoundCheck
  },
  {
    title: "Verification",
    description:
      "The trust team reviews education, identity, documents, and support context.",
    icon: ShieldCheck
  },
  {
    title: "Campaign",
    description:
      "A verified need becomes a structured campaign with story, target, and progress.",
    icon: FileCheck2
  },
  {
    title: "Donation",
    description:
      "Supporters contribute through a transparent, purpose-first donation journey.",
    icon: IndianRupee
  },
  {
    title: "Receipt",
    description:
      "Every contribution stays connected with receipt and support records.",
    icon: ReceiptText
  },
  {
    title: "Visible Impact",
    description:
      "The outcome connects back to the student journey and the Devasiri mission.",
    icon: BadgeCheck
  }
] as const;

const experiencePillars = [
  "Fluid journey architecture",
  "Role-aware pathways",
  "Trust-first visual hierarchy",
  "Motion with purpose"
] as const;

export function MissionFlowTheater() {
  const { reducedMotion } = useMotionExperience();

  return (
    <section className="relative overflow-hidden bg-[var(--theme-surface)] px-6 py-24 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,white_0%,var(--theme-surface)_44%,var(--theme-soft)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute left-[-260px] top-12 h-[720px] w-[720px] rounded-full bg-[var(--theme-primary)]/14 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-260px] bottom-12 h-[720px] w-[720px] rounded-full bg-[var(--theme-accent)]/14 blur-[120px]"
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
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-white/74 px-4 py-2 text-sm font-black text-[var(--theme-primary)] shadow-sm backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              Mission Flow Theater
            </div>

            <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.085em] text-[var(--theme-ink)] sm:text-5xl lg:text-7xl">
              One continuous journey from need to visible impact.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-600">
            This section makes the platform feel like a living system. It shows
            how students, volunteers, donors, and admins move through one clean,
            trusted support pipeline.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="relative overflow-hidden rounded-[44px] border border-white/80 bg-white/72 p-5 shadow-[0_36px_120px_rgba(7,17,31,0.12)] backdrop-blur-2xl sm:p-7">
            <div
              aria-hidden="true"
              className="absolute left-8 right-8 top-[105px] hidden h-1 rounded-full bg-slate-100 lg:block"
            />

            <motion.div
              aria-hidden="true"
              className="absolute left-8 top-[105px] hidden h-1 rounded-full bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-accent)] to-[var(--theme-primary)] lg:block"
              initial={reducedMotion ? false : { width: "0%" }}
              whileInView={reducedMotion ? undefined : { width: "calc(100% - 4rem)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {flowSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.article
                    key={step.title}
                    initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                    whileInView={
                      reducedMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.52,
                      delay: Math.min(index * 0.07, 0.35),
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="group relative min-h-[245px] overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/78 p-5 shadow-[0_18px_60px_rgba(7,17,31,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--theme-border)] hover:bg-[var(--theme-soft)]"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--theme-primary)]/0 blur-3xl transition group-hover:bg-[var(--theme-primary)]/18"
                    />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--theme-ink)] text-white shadow-[0_18px_45px_rgba(7,17,31,0.16)] transition group-hover:bg-[var(--theme-primary)]">
                          <Icon className="h-6 w-6" />
                        </div>

                        <span className="text-5xl font-black tracking-[-0.1em] text-slate-100">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="mt-7 text-2xl font-black tracking-[-0.06em] text-[var(--theme-ink)]">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[44px] border border-white/80 bg-[var(--theme-ink)] p-7 text-white shadow-[0_36px_120px_rgba(7,17,31,0.22)]">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--theme-primary)]/32 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[var(--theme-accent)]/24 blur-3xl"
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white/86 ring-1 ring-white/10">
                <HeartHandshake className="h-4 w-4 text-[var(--theme-accent)]" />
                Experience standard
              </div>

              <h3 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.08em]">
                Not a website. A support operating system.
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/64">
                Each screen should feel connected, intentional, and emotionally
                safe — with cinematic motion supporting clarity instead of
                making the interface noisy.
              </p>

              <div className="mt-8 grid gap-3">
                {experiencePillars.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[20px] bg-white/8 px-4 py-3 text-sm font-bold text-white/82 ring-1 ring-white/10"
                  >
                    <BadgeCheck className="h-4 w-4 shrink-0 text-[var(--theme-accent)]" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-9 grid gap-3">
                <Link
                  href="/apply"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-[20px] bg-[var(--theme-primary)] px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,118,110,0.24)] transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
                >
                  Start Student Journey
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/campaigns"
                  className={cn(
                    "inline-flex h-13 items-center justify-center gap-2 rounded-[20px] border border-white/15 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
                  )}
                >
                  Explore Campaigns
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
TSX

  run "Wiring Mission Flow Theater into homepage" python3 <<'PY'
from pathlib import Path

path = Path("src/components/sections/home-page-sections.tsx")
text = path.read_text()

import_line = 'import { MissionFlowTheater } from "@/components/blocks/mission-flow-theater";'

if import_line not in text:
    lines = text.splitlines()
    insert_index = 0
    for index, line in enumerate(lines):
        if line.startswith("import "):
            insert_index = index + 1
    lines.insert(insert_index, import_line)
    text = "\n".join(lines) + "\n"

if "<MissionFlowTheater />" not in text:
    if "<HomeExperienceShowcase />" in text:
        text = text.replace(
            "      <HomeExperienceShowcase />",
            "      <HomeExperienceShowcase />\n      <MissionFlowTheater />"
        )
    elif "<PremiumActionDock />" in text:
        text = text.replace(
            "      <PremiumActionDock />",
            "      <PremiumActionDock />\n      <MissionFlowTheater />"
        )
    else:
        text = text.replace(
            "      <VideoHero />",
            "      <VideoHero />\n      <MissionFlowTheater />"
        )

path.write_text(text)
PY

  if [ "$FAILED" -eq 0 ]; then
    run "Clean Next.js cache" rm -rf .next
  fi

  if [ "$FAILED" -eq 0 ]; then
    run "Production build" npm run build
  fi

  if [ "$FAILED" -eq 0 ]; then
    run "Git add safe paths" git add src/components/blocks/mission-flow-theater.tsx src/components/sections/home-page-sections.tsx
  fi

  if [ "$FAILED" -eq 0 ]; then
    run "Git commit" git commit -m "add premium mission flow theater"
  fi

  finish
fi
