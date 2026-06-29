#!/usr/bin/env bash

FAILED=0
LOG_DIR="logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/phase-transparency-ledger-$(date +%Y%m%d-%H%M%S).log"

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
    echo "✅ Transparency Ledger Theater phase completed successfully." | tee -a "$LOG_FILE"
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
print("✅ .gitignore protects local logs")
PY
fi

if [ "$FAILED" -eq 0 ]; then
  run "Build checkpoint before Transparency Ledger" npm run build
fi

if [ "$FAILED" -eq 0 ]; then
  step "Checkpoint pending successful work first"

  git add package.json package-lock.json .gitignore 2>&1 | tee -a "$LOG_FILE"
  git add src 2>&1 | tee -a "$LOG_FILE"
  git add scripts 2>&1 | tee -a "$LOG_FILE"

  if git diff --cached --quiet; then
    echo "ℹ️ No pending checkpoint changes" | tee -a "$LOG_FILE"
  else
    git commit -m "checkpoint before transparency ledger theater" 2>&1 | tee -a "$LOG_FILE"
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

  step "Creating Transparency Ledger Theater"

  cat > src/components/blocks/transparency-ledger-theater.tsx <<'TSX'
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  ClipboardCheck,
  FileCheck2,
  HeartHandshake,
  IndianRupee,
  Landmark,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  type LucideIcon
} from "lucide-react";
import { useState } from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

type LedgerStage = {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly proof: readonly string[];
};

const ledgerStages: readonly LedgerStage[] = [
  {
    id: "need",
    label: "Need",
    title: "A student need enters the system.",
    description:
      "The journey begins with student context: education need, support category, and human explanation.",
    icon: UserRoundCheck,
    proof: [
      "Guided support intake",
      "Student-first language",
      "Clear need category"
    ]
  },
  {
    id: "review",
    label: "Review",
    title: "The trust layer reviews the request.",
    description:
      "Before public support, the request can move through verification and internal review confidence.",
    icon: ShieldCheck,
    proof: [
      "Document-backed confidence",
      "Role-safe admin review",
      "Structured trust memory"
    ]
  },
  {
    id: "campaign",
    label: "Campaign",
    title: "Verified need becomes a campaign.",
    description:
      "The need becomes public in a clean campaign format with purpose, goal, progress, and donor clarity.",
    icon: HeartHandshake,
    proof: [
      "Purpose-led campaign",
      "Goal and progress visibility",
      "Donor-ready story"
    ]
  },
  {
    id: "donation",
    label: "Donation",
    title: "Support flows through a visible giving path.",
    description:
      "The donor journey feels intentional, warm, and accountable instead of a plain payment action.",
    icon: IndianRupee,
    proof: [
      "Clear support action",
      "Connected campaign progress",
      "Trust-first giving path"
    ]
  },
  {
    id: "receipt",
    label: "Receipt",
    title: "Records stay connected after support.",
    description:
      "Receipts and donation references become part of the same trust story instead of isolated documents.",
    icon: ReceiptText,
    proof: [
      "Receipt-connected giving",
      "Donation traceability",
      "Transparent record memory"
    ]
  },
  {
    id: "impact",
    label: "Impact",
    title: "The result comes back to the mission.",
    description:
      "The platform keeps the focus on education continuity, dignity, and visible impact.",
    icon: BookOpenCheck,
    proof: [
      "Education continuity",
      "Human-centered outcome",
      "Mission visibility"
    ]
  }
];

const ledgerSignals = [
  {
    title: "Student context",
    value: "Captured",
    icon: ClipboardCheck
  },
  {
    title: "Trust review",
    value: "Protected",
    icon: ShieldCheck
  },
  {
    title: "Campaign progress",
    value: "Visible",
    icon: BarChart3
  },
  {
    title: "Receipts",
    value: "Linked",
    icon: ReceiptText
  }
] as const;

export function TransparencyLedgerTheater() {
  const [activeStageId, setActiveStageId] = useState("need");
  const { reducedMotion } = useMotionExperience();

  const activeStage =
    ledgerStages.find((stage) => stage.id === activeStageId) ?? ledgerStages[0];

  const ActiveIcon = activeStage.icon;
  const activeIndex = ledgerStages.findIndex((stage) => stage.id === activeStage.id);
  const progress =
    ledgerStages.length <= 1
      ? 100
      : Math.round((activeIndex / (ledgerStages.length - 1)) * 100);

  return (
    <section className="relative overflow-hidden bg-[var(--theme-surface)] px-6 py-24 sm:px-8 lg:px-12">
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
          className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-white/76 px-4 py-2 text-sm font-black text-[var(--theme-primary)] shadow-sm backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              Transparency Ledger Theater
            </div>

            <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.085em] text-[var(--theme-ink)] sm:text-5xl lg:text-7xl">
              Every rupee should feel connected to a real education journey.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-600">
            This turns trust into an experience: student need, review, campaign,
            donation, receipt, and impact are presented as one continuous public
            accountability story.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="relative overflow-hidden rounded-[48px] border border-white/80 bg-[var(--theme-ink)] p-6 text-white shadow-[0_44px_150px_rgba(7,17,31,0.26)] sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[var(--theme-primary)]/34 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[var(--theme-accent)]/24 blur-3xl"
            />

            <div className="relative">
              <div className="flex flex-wrap gap-2">
                {ledgerStages.map((stage) => {
                  const active = stage.id === activeStageId;

                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveStageId(stage.id)}
                      className={cn(
                        "rounded-full px-4 py-2 text-xs font-black transition focus:outline-none focus:ring-4 focus:ring-white/20",
                        active
                          ? "bg-white text-[var(--theme-ink)]"
                          : "bg-white/8 text-white/62 ring-1 ring-white/10 hover:bg-white/12 hover:text-white"
                      )}
                    >
                      {stage.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.8fr]">
                <motion.div
                  key={activeStage.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex h-18 w-18 items-center justify-center rounded-[28px] bg-white/10 text-[var(--theme-accent)] ring-1 ring-white/10">
                    <ActiveIcon className="h-9 w-9" />
                  </div>

                  <p className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-white/42">
                    Ledger stage {String(activeIndex + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-4 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.08em] sm:text-5xl">
                    {activeStage.title}
                  </h3>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/66">
                    {activeStage.description}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {activeStage.proof.map((item) => (
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
                      href="/campaigns"
                      className="inline-flex h-13 items-center justify-center gap-2 rounded-[20px] bg-[var(--theme-primary)] px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,118,110,0.24)] transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-white/20"
                    >
                      View Campaign Ledger
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="/apply"
                      className="inline-flex h-13 items-center justify-center gap-2 rounded-[20px] border border-white/15 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20"
                    >
                      Start Student Need
                    </Link>
                  </div>
                </motion.div>

                <div className="rounded-[38px] bg-white/8 p-5 ring-1 ring-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.18em] text-white/44">
                        Ledger progress
                      </p>

                      <p className="mt-3 text-5xl font-black tracking-[-0.08em]">
                        {progress}%
                      </p>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--theme-primary)] text-white">
                      <Landmark className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-accent)] to-[var(--theme-primary)]"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: reducedMotion ? 0 : 0.55 }}
                    />
                  </div>

                  <div className="mt-6 grid gap-3">
                    {ledgerSignals.map((signal) => {
                      const Icon = signal.icon;

                      return (
                        <div
                          key={signal.title}
                          className="flex items-center justify-between rounded-[22px] bg-white/7 px-4 py-3 ring-1 ring-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-white/10 text-[var(--theme-accent)]">
                              <Icon className="h-5 w-5" />
                            </div>

                            <p className="text-sm font-bold text-white/82">
                              {signal.title}
                            </p>
                          </div>

                          <span className="text-xs font-black text-white/42">
                            {signal.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-[44px] border border-white/80 bg-white/76 p-5 shadow-[0_34px_120px_rgba(7,17,31,0.11)] backdrop-blur-2xl">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-[22px] bg-[var(--theme-soft)] text-[var(--theme-primary)]">
              <FileCheck2 className="h-7 w-7" />
            </div>

            <h3 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.08em] text-[var(--theme-ink)]">
              Public trust should be visible, not hidden in admin pages.
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              This section gives visitors a clear mental model of what happens
              after someone asks for help or donates. It strengthens confidence
              without changing backend data models.
            </p>

            <div className="mt-7 grid gap-3">
              {[
                "Shows how support moves through the system",
                "Makes donation accountability emotionally clear",
                "Keeps the UI cinematic without cluttering the hero",
                "Uses current theme colors automatically"
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-white/72 px-4 py-3 text-sm font-bold text-slate-700"
                >
                  <BadgeCheck className="h-4 w-4 shrink-0 text-[var(--theme-primary)]" />
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/campaigns"
              className="mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-[20px] bg-[var(--theme-primary)] px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,118,110,0.22)] transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]"
            >
              Explore Verified Campaigns
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
TSX
fi

if [ "$FAILED" -eq 0 ]; then
  step "Wiring Transparency Ledger Theater into homepage"

  python3 <<'PY' 2>&1 | tee -a "$LOG_FILE"
from pathlib import Path

path = Path("src/components/sections/home-page-sections.tsx")
text = path.read_text()

import_line = 'import { TransparencyLedgerTheater } from "@/components/blocks/transparency-ledger-theater";'

if import_line not in text:
    lines = text.splitlines()
    insert_index = 0
    for index, line in enumerate(lines):
        if line.startswith("import "):
            insert_index = index + 1
    lines.insert(insert_index, import_line)
    text = "\n".join(lines) + "\n"

if "<TransparencyLedgerTheater />" not in text:
    if "<VolunteerSupportCommand />" in text:
        text = text.replace(
            "      <VolunteerSupportCommand />",
            "      <VolunteerSupportCommand />\n      <TransparencyLedgerTheater />"
        )
    elif "<TrustStackTheater />" in text:
        text = text.replace(
            "      <TrustStackTheater />",
            "      <TrustStackTheater />\n      <TransparencyLedgerTheater />"
        )
    elif "<ImpactObservatory />" in text:
        text = text.replace(
            "      <ImpactObservatory />",
            "      <ImpactObservatory />\n      <TransparencyLedgerTheater />"
        )
    elif "<MissionFlowTheater />" in text:
        text = text.replace(
            "      <MissionFlowTheater />",
            "      <MissionFlowTheater />\n      <TransparencyLedgerTheater />"
        )
    else:
        text = text.replace(
            "      <VideoHero />",
            "      <VideoHero />\n      <TransparencyLedgerTheater />"
        )

path.write_text(text)
print("✅ Transparency Ledger Theater wired")
PY
fi

if [ "$FAILED" -eq 0 ]; then
  run "Clean Next.js cache" rm -rf .next
fi

if [ "$FAILED" -eq 0 ]; then
  run "Production build after Transparency Ledger" npm run build
fi

if [ "$FAILED" -eq 0 ]; then
  step "Stage Transparency Ledger Theater"

  git add src/components/blocks/transparency-ledger-theater.tsx 2>&1 | tee -a "$LOG_FILE"
  git add src/components/sections/home-page-sections.tsx 2>&1 | tee -a "$LOG_FILE"
  echo "✅ Transparency Ledger Theater staged" | tee -a "$LOG_FILE"
fi

if [ "$FAILED" -eq 0 ]; then
  step "Commit Transparency Ledger Theater"

  if git diff --cached --quiet; then
    echo "ℹ️ No staged implementation changes found" | tee -a "$LOG_FILE"
  else
    git commit -m "add transparency ledger theater" 2>&1 | tee -a "$LOG_FILE"
    STATUS=${PIPESTATUS[0]}

    if [ "$STATUS" -ne 0 ]; then
      echo "❌ Transparency Ledger commit failed safely" | tee -a "$LOG_FILE"
      FAILED=1
    else
      echo "✅ Transparency Ledger Theater commit created" | tee -a "$LOG_FILE"
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
