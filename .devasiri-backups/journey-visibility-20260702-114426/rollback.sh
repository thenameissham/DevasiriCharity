#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$BACKUP_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

cp \
  "$BACKUP_DIR/src/app/page.tsx" \
  src/app/page.tsx

cp \
  "$BACKUP_DIR/eslint.config.mjs" \
  eslint.config.mjs

if [[ -f "$BACKUP_DIR/.had-home-sections" ]]; then
  cp \
    "$BACKUP_DIR/src/components/sections/home-page-sections.tsx" \
    src/components/sections/home-page-sections.tsx
fi

if [[ -f "$BACKUP_DIR/.had-premium-home" ]]; then
  cp \
    "$BACKUP_DIR/src/components/landing/premium-home-page.tsx" \
    src/components/landing/premium-home-page.tsx
fi

if [[ -f "$BACKUP_DIR/.had-vscode-settings" ]]; then
  mkdir -p .vscode

  cp \
    "$BACKUP_DIR/.vscode/settings.json" \
    .vscode/settings.json
else
  rm -f .vscode/settings.json
fi

rm -rf \
  .next \
  .turbo \
  .swc \
  node_modules/.cache

rm -f \
  .eslintcache \
  tsconfig.tsbuildinfo

echo "Rollback completed."
