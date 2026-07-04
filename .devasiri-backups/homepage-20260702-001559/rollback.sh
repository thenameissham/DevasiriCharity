#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$BACKUP_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

cp "$BACKUP_DIR/src/app/page.tsx" src/app/page.tsx

if [[ -f "$BACKUP_DIR/.had-premium-home-page" ]]; then
  cp \
    "$BACKUP_DIR/src/components/landing/premium-home-page.tsx" \
    src/components/landing/premium-home-page.tsx
else
  rm -f src/components/landing/premium-home-page.tsx
fi

if [[ -f "$BACKUP_DIR/.had-premium-home-css" ]]; then
  cp \
    "$BACKUP_DIR/src/components/landing/premium-home-page.module.css" \
    src/components/landing/premium-home-page.module.css
else
  rm -f src/components/landing/premium-home-page.module.css
fi

echo "Homepage rollback completed."
