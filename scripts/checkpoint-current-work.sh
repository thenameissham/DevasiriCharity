#!/usr/bin/env bash

FAILED=0
LOG_DIR="logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/checkpoint-current-work-$(date +%Y%m%d-%H%M%S).log"

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
    echo "✅ Current work checkpointed successfully." | tee -a "$LOG_FILE"
    echo "📄 Log saved at: $LOG_FILE" | tee -a "$LOG_FILE"
  else
    echo "⚠️ Checkpoint stopped safely. Terminal is still open." | tee -a "$LOG_FILE"
    echo "📄 Send me:" | tee -a "$LOG_FILE"
    echo "tail -60 $LOG_FILE" | tee -a "$LOG_FILE"
  fi

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" | tee -a "$LOG_FILE"
}

step "Update .gitignore"

touch .gitignore

python3 <<'PY' 2>&1 | tee -a "$LOG_FILE"
from pathlib import Path

path = Path(".gitignore")
text = path.read_text()

for item in ["logs/", "build-error.log"]:
    if item not in text:
        text = text.rstrip() + "\n" + item + "\n"

path.write_text(text)
print("✅ .gitignore protects logs and build-error.log")
PY

run "Production build before checkpoint" npm run build

if [ "$FAILED" -eq 0 ]; then
  step "Stage current implementation files"

  git add package.json package-lock.json .gitignore 2>&1 | tee -a "$LOG_FILE"
  git add src 2>&1 | tee -a "$LOG_FILE"
  git add scripts 2>&1 | tee -a "$LOG_FILE"

  echo "✅ Files staged" | tee -a "$LOG_FILE"
fi

if [ "$FAILED" -eq 0 ]; then
  step "Commit current implementation"

  if git diff --cached --quiet; then
    echo "ℹ️ Nothing staged to commit" | tee -a "$LOG_FILE"
  else
    git commit -m "checkpoint premium experience implementation" 2>&1 | tee -a "$LOG_FILE"
    STATUS=${PIPESTATUS[0]}

    if [ "$STATUS" -ne 0 ]; then
      echo "❌ Commit failed safely" | tee -a "$LOG_FILE"
      FAILED=1
    else
      echo "✅ Commit created" | tee -a "$LOG_FILE"
    fi
  fi
fi

if [ "$FAILED" -eq 0 ]; then
  run "Push checkpoint" git push
fi

if [ "$FAILED" -eq 0 ]; then
  run "Final status" git status -sb
fi

finish
