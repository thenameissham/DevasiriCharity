#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$BACKUP_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

restore_or_remove() {
  local file="$1"
  local marker="$2"

  if [[ -f "$BACKUP_DIR/$marker" ]]; then
    mkdir -p "$(dirname "$file")"
    cp "$BACKUP_DIR/$file" "$file"
  else
    rm -f "$file"
  fi
}

restore_or_remove \
  "src/components/landing/journey-flow.tsx" \
  ".had-journey-flow"

restore_or_remove \
  "src/components/landing/journey-flow.module.css" \
  ".had-journey-css"

restore_or_remove \
  "src/components/landing/impact-pathway.tsx" \
  ".had-impact-pathway"

rm -rf .next

echo "Journey Flow rollback completed."
