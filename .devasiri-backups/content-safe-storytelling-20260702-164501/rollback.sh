#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_ROOT="/home/mohan/Downloads/DevasiriCharity/devasiri-platform"
BACKUP_DIR="/home/mohan/Downloads/DevasiriCharity/devasiri-platform/.devasiri-backups/content-safe-storytelling-20260702-164501"

cd "$PROJECT_ROOT"

restore_file() {
  local relative="$1"

  if [[ -f "$BACKUP_DIR/$relative" ]]; then
    mkdir -p "$(dirname "$relative")"
    cp "$BACKUP_DIR/$relative" "$relative"
  fi
}

restore_file   "src/components/storytelling/section-background-storytelling.tsx"

restore_file   "src/components/storytelling/section-background-storytelling.module.css"

restore_file   "src/app/globals.css"

restore_file   "src/components/sections/home-page-sections.tsx"

restore_file   "src/components/landing/premium-home-page.tsx"

rm -rf   .next   .turbo   .swc   node_modules/.cache

rm -f   .eslintcache   tsconfig.tsbuildinfo

echo "Content-safe storytelling repair rolled back."
