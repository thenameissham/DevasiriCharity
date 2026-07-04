#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$BACKUP_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

while IFS= read -r -d '' file; do
  relative="${file#"$BACKUP_DIR/"}"

  [[ "$relative" == "rollback.sh" ]] && continue

  mkdir -p "$(dirname "$relative")"
  cp -p "$file" "$relative"
done < <(find "$BACKUP_DIR" -type f -print0)

rm -rf \
  .next \
  .turbo \
  .swc \
  node_modules/.cache

rm -f \
  .eslintcache \
  tsconfig.tsbuildinfo

echo "Enterprise system rollback completed."
