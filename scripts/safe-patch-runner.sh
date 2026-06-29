#!/usr/bin/env bash

# Safe patch runner for Devasiri / Next.js work
# It does not close your terminal.
# It logs every run and stops safely with a readable error.

set -u
set -o pipefail

LOG_DIR="logs"
mkdir -p "$LOG_DIR"

LOG_FILE="$LOG_DIR/safe-patch-$(date +%Y%m%d-%H%M%S).log"
FAILED=0

print_step() {
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "▶ $1"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

run_step() {
  local label="$1"
  shift

  print_step "$label"

  "$@" 2>&1 | tee -a "$LOG_FILE"
  local status=${PIPESTATUS[0]}

  if [ "$status" -ne 0 ]; then
    echo ""
    echo "❌ Failed at step: $label" | tee -a "$LOG_FILE"
    echo "📄 Full log saved at: $LOG_FILE" | tee -a "$LOG_FILE"
    FAILED=1
    return "$status"
  fi

  echo "✅ Passed: $label" | tee -a "$LOG_FILE"
  return 0
}

safe_verify_project() {
  print_step "Project safety check"

  local missing=0

  for item in package.json src/app src/components src/app/layout.tsx src/app/globals.css; do
    if [ ! -e "$item" ]; then
      echo "❌ Missing: $item" | tee -a "$LOG_FILE"
      missing=1
    else
      echo "✅ Found: $item" | tee -a "$LOG_FILE"
    fi
  done

  if [ "$missing" -ne 0 ]; then
    FAILED=1
    return 1
  fi

  return 0
}

safe_build() {
  run_step "Cleaning Next.js cache" rm -rf .next || return 1
  run_step "Production build" npm run build || return 1
}

safe_git_status() {
  print_step "Git status"
  git status -sb 2>&1 | tee -a "$LOG_FILE"
}

safe_finish_message() {
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  if [ "$FAILED" -eq 0 ]; then
    echo "✅ Safe patch runner completed successfully."
    echo "📄 Log saved at: $LOG_FILE"
  else
    echo "⚠️ Safe patch runner stopped safely."
    echo "Your terminal is still open."
    echo "📄 Check log: $LOG_FILE"
    echo ""
    echo "Send me the last 60 lines using:"
    echo "tail -60 $LOG_FILE"
  fi

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
}

safe_verify_project
