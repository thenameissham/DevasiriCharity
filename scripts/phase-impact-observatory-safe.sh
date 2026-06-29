#!/usr/bin/env bash

FAILED=0
LOG_DIR="logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/phase-impact-observatory-$(date +%Y%m%d-%H%M%S).log"

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
    echo "Run: npm run dev" | tee -a "$LOG_FILE"
  else
    echo "⚠️ Phase stopped safely. Terminal is still open." | tee -a "$LOG_FILE"
    echo "📄 Send me this:" | tee -a "$LOG_FILE"
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
  step "Ignoring local logs and build artifacts"

  touch .gitignore

  python3 <<'PY' 2>&1 | tee -a "$LOG_FILE"
from pathlib import Path

path = Path(".gitignore")
text = path.read_text() if path.exists() else ""

entries = [
    "logs/",
    "build-error.log"
]

for entry in entries:
    if entry not in text:
        text = text.rstrip() + "\n" + entry + "\n"

path.write_text(text)
print("✅ .gitignore updated")
PY
fi

if [ "$FAILED" -eq 0 ]; then
  run "Checkpoint build before next implementation" npm run build
fi

if [ "$FAILED" -eq 0 ]; then
  step "Staging current successful implementation"

  git add package.json package-lock.json .gitignore 2>&1 | tee -a "$LOG_FILE"
  git add src 2>&1 | tee -a "$LOG_FILE"
  git add scripts 2>&1 | tee -a "$LOG_FILE"

  echo "✅ Current work staged safely" | tee -a "$LOG_FILE"
fi

if [ "$FAILED" -eq 0 ]; then
  step "Checkpoint commit if needed"

  if git diff --cached --quiet; then
    echo "ℹ️ No staged checkpoint changes found" | tee -a "$LOG_FILE"
  else
    git commit -m "checkpoint premium experience system" 2>&1 | tee -a "$LOG_FILE"
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

  step "Creating Premium Impact Observatory"

  cat > src/components/blocks/impact-observatory.tsx <<'TSX'
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  IndianRupee,
  LineChart,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import { useState } from "react";
import { useMotionExperience } from "@/components/motion/motion-provider";
import { cn } from "@/lib/cn";

type ObservatoryRole = {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly highlights: readonly string[];
  readonly href: string;
};

const roles: readonly ObservatoryRole[] = [
  {
    id: "student",
    label: "Student",
    title: "Students see a guided support path.",
    description:
      "The platform makes support feel less scary by turning the process into a calm journey with clear next steps.",
    icon: GraduationCap,
    href: "/apply",
    highlights: [
      "Guided application start",
      "Saved onboarding context",
      "Clear support categories"
    ]
  },
  {
    id: "donor",
    label: "Donor",
    title: "Donors see verified purpose, not random requests.",
    description:
      "Campaigns communicate story, goal, raised amount, receipts, and progress in one trustworthy experience.",
    icon: HeartHandshake,
    href: "/campaigns",
    highlights: [
      "Verified campaigns",
      "Progress visibility",
      "Receipt-connected support"
    ]
  },
  {
    id: "volunteer",
    label: "Volunteer",
    title: "Volunteers support the human workflow.",
    description:
      "The experience positions volunteers as part of verification, student guidance, and trust-building operations.",
    icon: UsersRound,
    href: "/#volunteer",
    highlights: [
      "Review support",
      "Student guidance",
      "Mission participation"
    ]
  },
  {
    id: "admin",
    label: "Admin",
    title: "Admins operate from a structured trust layer.",
    description:
      "Applications, campaigns, donations, receipts, and role-based access remain organized without changing backend rules.",
    icon: ShieldCheck,
    href: "/login",
    highlights: [
      "Role-based portal",
      "Campaign controls",
      "Donation records"
    ]
  }
];

const metrics = [
  {
    label: "Student journey",
    value: "Guided",
    icon: GraduationCap
  },
  {
    label: "Campaign trust",
    value: "Verified",
    icon: BadgeCheck
  },
  {
    label: "Donation records",
    value: "Linked",
    icon: ReceiptText
  },
  {
    label: "Impact view",
    value: "Visible",
    icon: LineChart
  }
] as const;

const systemSignals = [
  {
    title: "Need intake",
    icon: ClipboardCheck
  },
  {
    title: "Verification",
    icon: ShieldCheck
  },
  {
    title: "Campaign progress",
    icon: BarChart3
  },
  {
    title: "Donation flow",
    icon: IndianRupee
  },
  {
    title: "Receipts",
    icon: ReceiptText
  },
  {
    title: "Impact memory",
    icon: BadgeCheck
  }
] as const;

export function ImpactObservatory() {
  const [activeRoleId, setActiveRoleId] = useState("student");
  const { reducedMotion } = useMotionExperience();

  const activeRole =
    roles.find((role) => role.id === activeRoleId) ?? roles[0];

  const ActiveIcon = activeRole.icon;

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--theme-soft)_0%,white_42%,var(--theme-surface)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute left-[-240px] top-20 h-[680px] w-[680px] rounded-full bg-[var(--theme-primary)]/14 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-240px] bottom-20 h-[680px] w-[680px] rounded-full bg-[var(--theme-accent)]/14 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 devasiri-premium-grid opacity-40"
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 26 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-white/76 px-4 py-2 text-sm font-black text-[var(--theme-primary)] shadow-sm backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              Impact Observatory
            </div>

            <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.085em] text-[var(--theme-ink)] sm:text-5xl lg:text-7xl">
              Every role sees the same mission from their own lens.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-slate-600">
            This experience layer makes Devasiri feel like a living support
            system. Students, donors, volunteers, and admins each get a clear
            emotional and functional path.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[390px_1fr]">
          <aside className="rounded-[42px] border border-white/80 bg-white/74 p-4 shadow-[0_34px_120px_rgba(7,17,31,0.11)] backdrop-blur-2xl">
            <div className="grid gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                const active = role.id === activeRoleId;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setActiveRoleId(role.id)}
                    className={cn(
                      "group flex items-center gap-4 rounded-[28px] border p-4 text-left transition focus:outline-none focus:ring-4 focus:ring-[var(--theme-ring)]",
                      active
                        ? "border-[var(--theme-border)] bg-[var(--theme-soft)] shadow-[0_18px_55px_rgba(7,17,31,0.08)]"
                        : "border-transparent bg-white/52 hover:border-slate-200 hover:bg-white"
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
                      <p className="text-lg font-black tracking-[-0.05em] text-[var(--theme-ink)]">
                        {role.label}
                      </p>

                      <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                        {role.highlights[0]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="relative overflow-hidden rounded-[46px] border border-white/80 bg-[var(--theme-ink)] p-6 text-white shadow-[0_40px_140px_rgba(7,17,31,0.24)] sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[var(--theme-primary)]/34 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[var(--theme-accent)]/24 blur-3xl"
            />

            <div className="relative grid gap-8 xl:grid-cols-[1fr_0.9fr]">
              <motion.div
                key={activeRole.id}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-white/10 text-[var(--theme-accent)] ring-1 ring-white/10">
                  <ActiveIcon className="h-8 w-8" />
                </div>

                <h3 className="mt-7 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.08em] sm:text-5xl">
                  {activeRole.title}
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/66">
                  {activeRole.description}
                </p>

                <div className="mt-8 grid gap-3">
                  {activeRole.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-[20px] bg-white/8 px-4 py-3 text-sm font-bold text-white/84 ring-1 ring-white/10"
                    >
                      <BadgeCheck className="h-4 w-4 shrink-0 text-[var(--theme-accent)]" />
                      {item}
                    </div>
                  ))}
                </div>

                <Link
                  href={activeRole.href}
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-[var(--theme-primary)] px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(15,118,110,0.24)] transition hover:bg-[var(--theme-primary-dark)] focus:outline-none focus:ring-4 focus:ring-white/20"
                >
                  Open {activeRole.label} Path
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <div className="grid gap-4">
                <div className="rounded-[34px] bg-white/8 p-5 ring-1 ring-white/10">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-white/48">
                    Live system feeling
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {metrics.map((metric) => {
                      const Icon = metric.icon;

                      return (
                        <div
                          key={metric.label}
                          className="rounded-[24px] bg-white/8 p-4 ring-1 ring-white/10"
                        >
                          <Icon className="h-5 w-5 text-[var(--theme-accent)]" />

                          <p className="mt-4 text-2xl font-black tracking-[-0.06em]">
                            {metric.value}
                          </p>

                          <p className="mt-1 text-xs font-semibold leading-5 text-white/48">
                            {metric.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[34px] bg-white/8 p-5 ring-1 ring-white/10">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-white/48">
                    Connected pipeline
                  </p>

                  <div className="mt-5 grid gap-3">
                    {systemSignals.map((signal, index) => {
                      const Icon = signal.icon;

                      return (
                        <div
                          key={signal.title}
                          className="flex items-center justify-between rounded-[20px] bg-white/7 px-4 py-3 ring-1 ring-white/10"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-white/10 text-[var(--theme-accent)]">
                              <Icon className="h-4 w-4" />
                            </div>

                            <p className="text-sm font-bold text-white/82">
                              {signal.title}
                            </p>
                          </div>

                          <span className="text-xs font-black text-white/35">
                            0{index + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
TSX
fi

if [ "$FAILED" -eq 0 ]; then
  step "Wiring Impact Observatory into homepage"

  python3 <<'PY' 2>&1 | tee -a "$LOG_FILE"
from pathlib import Path

path = Path("src/components/sections/home-page-sections.tsx")
text = path.read_text()

import_line = 'import { ImpactObservatory } from "@/components/blocks/impact-observatory";'

if import_line not in text:
    lines = text.splitlines()
    insert_index = 0
    for index, line in enumerate(lines):
        if line.startswith("import "):
            insert_index = index + 1
    lines.insert(insert_index, import_line)
    text = "\n".join(lines) + "\n"

if "<ImpactObservatory />" not in text:
    if "<MissionFlowTheater />" in text:
        text = text.replace(
            "      <MissionFlowTheater />",
            "      <MissionFlowTheater />\n      <ImpactObservatory />"
        )
    elif "<HomeExperienceShowcase />" in text:
        text = text.replace(
            "      <HomeExperienceShowcase />",
            "      <HomeExperienceShowcase />\n      <ImpactObservatory />"
        )
    else:
        text = text.replace(
            "      <VideoHero />",
            "      <VideoHero />\n      <ImpactObservatory />"
        )

path.write_text(text)
print("✅ Impact Observatory wired")
PY
fi

if [ "$FAILED" -eq 0 ]; then
  run "Clean Next.js cache" rm -rf .next
fi

if [ "$FAILED" -eq 0 ]; then
  run "Production build after Impact Observatory" npm run build
fi

if [ "$FAILED" -eq 0 ]; then
  step "Staging Impact Observatory"

  git add src/components/blocks/impact-observatory.tsx 2>&1 | tee -a "$LOG_FILE"
  git add src/components/sections/home-page-sections.tsx 2>&1 | tee -a "$LOG_FILE"
  echo "✅ Impact Observatory staged" | tee -a "$LOG_FILE"
fi

if [ "$FAILED" -eq 0 ]; then
  step "Commit Impact Observatory if needed"

  if git diff --cached --quiet; then
    echo "ℹ️ No staged implementation changes found" | tee -a "$LOG_FILE"
  else
    git commit -m "add premium impact observatory" 2>&1 | tee -a "$LOG_FILE"
    STATUS=${PIPESTATUS[0]}

    if [ "$STATUS" -ne 0 ]; then
      echo "❌ Impact commit failed safely" | tee -a "$LOG_FILE"
      FAILED=1
    else
      echo "✅ Impact Observatory commit created" | tee -a "$LOG_FILE"
    fi
  fi
fi

if [ "$FAILED" -eq 0 ]; then
  run "Final git status" git status -sb
fi

if [ "$FAILED" -eq 0 ]; then
  run "Push commits" git push
fi

finish
