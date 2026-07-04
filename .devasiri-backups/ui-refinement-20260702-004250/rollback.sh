#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$BACKUP_DIR/../.." && pwd)"
cd "$PROJECT_ROOT"

restore_file() {
  local file="$1"
  if [[ -f "$BACKUP_DIR/$file" ]]; then
    mkdir -p "$(dirname "$file")"
    cp "$BACKUP_DIR/$file" "$file"
  fi
}

restore_file "src/app/globals.css"
restore_file "src/components/layouts/navbar.tsx"
restore_file "src/components/blocks/video-hero.tsx"
restore_file "src/components/landing/impact-pathway.tsx"
restore_file "src/components/landing/featured-campaigns.tsx"
restore_file "src/components/campaigns/public-campaign-card.tsx"
restore_file "src/components/landing/participation-section.tsx"
restore_file "src/components/layouts/footer.tsx"

echo "Rollback completed."
