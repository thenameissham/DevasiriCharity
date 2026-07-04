#!/usr/bin/env bash
set -Eeuo pipefail

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$BACKUP_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

cp \
  "$BACKUP_DIR/src/app/login/page.tsx" \
  src/app/login/page.tsx

cp \
  "$BACKUP_DIR/src/components/blocks/login-form.tsx" \
  src/components/blocks/login-form.tsx

if test -f "$BACKUP_DIR/.had-login-background"; then
  cp \
    "$BACKUP_DIR/src/components/auth/login-background-illustrations.tsx" \
    src/components/auth/login-background-illustrations.tsx
else
  rm -f src/components/auth/login-background-illustrations.tsx
fi

rm -rf \
  .next \
  .turbo \
  .swc \
  node_modules/.cache

rm -f \
  .eslintcache \
  tsconfig.tsbuildinfo

echo "Login redesign rolled back successfully."
