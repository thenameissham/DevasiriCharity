#!/usr/bin/env bash
set +e

FAILED=0
LOG_DIR="logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/phase10-story-$(date +%Y%m%d-%H%M%S).log"

step(){
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "▶ $1"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

safe(){
"$@" 2>&1 | tee -a "$LOG"
STATUS=${PIPESTATUS[0]}
if [ "$STATUS" -ne 0 ]; then
FAILED=1
fi
}

step "Preparing directories"

mkdir -p src/components/story

touch src/components/story/story-experience.tsx
touch src/components/story/story-card.tsx
touch src/components/story/story-morph-gallery.tsx
touch src/components/story/story-quote.tsx
touch src/components/story/story-floating-avatars.tsx
touch src/components/story/story-scroll-progress.tsx

echo "✅ Story components prepared"

step "Cleaning cache"

rm -rf .next

step "Production build"

safe npm run build

if [ "$FAILED" -eq 0 ]; then

git add src/components/story

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Phase 10 Ready"
echo "Log:"
echo "$LOG"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

else

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚠ Build stopped safely."
echo "Terminal remains open."
echo ""
echo "Send me:"
echo "tail -80 $LOG"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

fi
