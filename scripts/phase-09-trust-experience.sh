#!/usr/bin/env bash
set +e

FAILED=0
LOG_DIR="logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/phase09-$(date +%Y%m%d-%H%M%S).log"

step(){
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" | tee -a "$LOG_FILE"
echo "▶ $1" | tee -a "$LOG_FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" | tee -a "$LOG_FILE"
}

run(){
"$@" 2>&1 | tee -a "$LOG_FILE"
STATUS=${PIPESTATUS[0]}
if [ "$STATUS" -ne 0 ]; then
FAILED=1
echo "❌ Failed" | tee -a "$LOG_FILE"
fi
}

step "Creating component directory"

mkdir -p src/components/trust

step "Generating placeholder files"

touch src/components/trust/trust-command-center.tsx
touch src/components/trust/trust-live-counter.tsx
touch src/components/trust/trust-impact-flow.tsx
touch src/components/trust/trust-funding-river.tsx
touch src/components/trust/trust-verification-card.tsx

echo "✅ Components prepared" | tee -a "$LOG_FILE"

step "Clearing cache"

rm -rf .next

step "Production build"

run npm run build

if [ "$FAILED" -eq 0 ]; then

step "Git staging"

git add src/components/trust

git status -sb | tee -a "$LOG_FILE"

echo ""
echo "✅ Phase completed successfully."
echo "Log:"
echo "$LOG_FILE"

else

echo ""
echo "⚠️ Phase stopped safely."
echo "Terminal remains open."
echo "Run:"
echo "tail -80 $LOG_FILE"

fi
