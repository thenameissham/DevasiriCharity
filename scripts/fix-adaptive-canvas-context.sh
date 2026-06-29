#!/usr/bin/env bash

FAILED=0
LOG_DIR="logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/fix-adaptive-canvas-context-$(date +%Y%m%d-%H%M%S).log"

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
    echo "✅ Canvas context fix completed successfully." | tee -a "$LOG_FILE"
    echo "📄 Log saved at: $LOG_FILE" | tee -a "$LOG_FILE"
  else
    echo "⚠️ Fix stopped safely. Terminal is still open." | tee -a "$LOG_FILE"
    echo "📄 Send me this output:" | tee -a "$LOG_FILE"
    echo "tail -60 $LOG_FILE" | tee -a "$LOG_FILE"
  fi

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" | tee -a "$LOG_FILE"
}

step "Safety check"

if [ ! -f src/components/experience/adaptive-experience-orchestrator.tsx ]; then
  echo "❌ Missing adaptive experience file" | tee -a "$LOG_FILE"
  FAILED=1
fi

if [ "$FAILED" -eq 0 ]; then
  run "Fixing canvas context TypeScript narrowing" python3 <<'PY'
from pathlib import Path

path = Path("src/components/experience/adaptive-experience-orchestrator.tsx")
text = path.read_text()

if "const ctx: CanvasRenderingContext2D = context;" not in text:
    text = text.replace(
        """    if (context === null) return;

    let frameId = 0;""",
        """    if (context === null) return;

    const ctx: CanvasRenderingContext2D = context;

    let frameId = 0;"""
    )

# Replace canvas rendering calls inside the file with the non-null ctx alias.
text = text.replace("context.setTransform", "ctx.setTransform")
text = text.replace("context.clearRect", "ctx.clearRect")
text = text.replace("context.createRadialGradient", "ctx.createRadialGradient")
text = text.replace("context.fillStyle", "ctx.fillStyle")
text = text.replace("context.fillRect", "ctx.fillRect")
text = text.replace("context.beginPath", "ctx.beginPath")
text = text.replace("context.arc", "ctx.arc")
text = text.replace("context.fill()", "ctx.fill()")

path.write_text(text)
print("✅ Replaced nullable canvas context usage with stable ctx alias")
PY
fi

if [ "$FAILED" -eq 0 ]; then
  run "Clean Next.js cache" rm -rf .next
fi

if [ "$FAILED" -eq 0 ]; then
  run "Production build" npm run build
fi

if [ "$FAILED" -eq 0 ]; then
  run "Git status" git status -sb
fi

if [ "$FAILED" -eq 0 ]; then
  run "Git add changed safe paths" git add src/components/experience/adaptive-experience-orchestrator.tsx src/components/blocks/mission-flow-theater.tsx src/components/sections/home-page-sections.tsx
fi

if [ "$FAILED" -eq 0 ]; then
  step "Git commit if changes exist"

  if git diff --cached --quiet; then
    echo "ℹ️ No staged changes to commit" | tee -a "$LOG_FILE"
  else
    git commit -m "add mission flow theater and fix adaptive canvas context" 2>&1 | tee -a "$LOG_FILE"
    STATUS=${PIPESTATUS[0]}

    if [ "$STATUS" -ne 0 ]; then
      echo "❌ Commit failed safely" | tee -a "$LOG_FILE"
      FAILED=1
    else
      echo "✅ Commit created" | tee -a "$LOG_FILE"
    fi
  fi
fi

finish
