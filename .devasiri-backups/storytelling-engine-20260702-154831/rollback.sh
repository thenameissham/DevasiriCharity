#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$BACKUP_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

if test -f "$BACKUP_DIR/.had-story-engine"; then
  mkdir -p src/components/storytelling

  cp \
    "$BACKUP_DIR/src/components/storytelling/section-background-storytelling.tsx" \
    src/components/storytelling/section-background-storytelling.tsx
else
  rm -f src/components/storytelling/section-background-storytelling.tsx
fi

if test -f "$BACKUP_DIR/.had-home-sections"; then
  cp \
    "$BACKUP_DIR/src/components/sections/home-page-sections.tsx" \
    src/components/sections/home-page-sections.tsx
fi

if test -f "$BACKUP_DIR/.had-premium-home"; then
  cp \
    "$BACKUP_DIR/src/components/landing/premium-home-page.tsx" \
    src/components/landing/premium-home-page.tsx
fi

rm -rf .next .turbo .swc node_modules/.cache
rm -f .eslintcache tsconfig.tsbuildinfo

echo "Storytelling Engine rollback completed."
