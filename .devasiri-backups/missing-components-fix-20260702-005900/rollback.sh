#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$BACKUP_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

if [[ -f "$BACKUP_DIR/.had-brand-background" ]]; then
  cp \
    "$BACKUP_DIR/src/components/landing/brand-background.tsx" \
    src/components/landing/brand-background.tsx
else
  rm -f src/components/landing/brand-background.tsx
fi

if [[ -f "$BACKUP_DIR/.had-section-heading" ]]; then
  cp \
    "$BACKUP_DIR/src/components/landing/section-heading.tsx" \
    src/components/landing/section-heading.tsx
else
  rm -f src/components/landing/section-heading.tsx
fi

echo "Missing-component fix rolled back successfully."
