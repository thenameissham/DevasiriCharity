#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$BACKUP_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

cp \
  "$BACKUP_DIR/src/components/blocks/login-form.tsx" \
  src/components/blocks/login-form.tsx

cp \
  "$BACKUP_DIR/src/components/auth/login-background-illustrations.tsx" \
  src/components/auth/login-background-illustrations.tsx

cp \
  "$BACKUP_DIR/src/app/login/page.tsx" \
  src/app/login/page.tsx

rm -rf .next .turbo .swc node_modules/.cache
rm -f .eslintcache tsconfig.tsbuildinfo

echo "Login aesthetic refinement rolled back."
