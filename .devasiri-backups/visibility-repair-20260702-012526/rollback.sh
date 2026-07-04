#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$BACKUP_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

cp \
  "$BACKUP_DIR/src/app/globals.css" \
  src/app/globals.css

cp \
  "$BACKUP_DIR/src/components/blocks/video-hero.tsx" \
  src/components/blocks/video-hero.tsx

cp \
  "$BACKUP_DIR/src/components/landing/impact-pathway.tsx" \
  src/components/landing/impact-pathway.tsx

rm -rf .next

echo "Visibility repair rolled back successfully."
