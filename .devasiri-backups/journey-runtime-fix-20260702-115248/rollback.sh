#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$BACKUP_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

cp \
  "$BACKUP_DIR/src/components/landing/impact-pathway.tsx" \
  src/components/landing/impact-pathway.tsx

rm -rf \
  .next \
  .turbo \
  .swc \
  node_modules/.cache

rm -f \
  .eslintcache \
  tsconfig.tsbuildinfo

echo "Journey runtime fix rolled back."
