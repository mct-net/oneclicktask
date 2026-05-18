#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="${DEPLOY_ENV_FILE:-$REPO_ROOT/.env}"

if [ -f "$ENV_FILE" ]; then
  set -a
  # The existing project .env format is shell-compatible.
  . "$ENV_FILE"
  set +a
fi

SRC_DIR="${DEPLOY_SRC_DIR:-$REPO_ROOT}"
PROD_DIR="${DEPLOY_PROD_DIR:-${REPO_ROOT}-prod}"
NODE_BIN="${DEPLOY_NODE_BIN:-/opt/node-v22.22.1/bin}"
COREPACK_BIN="${DEPLOY_COREPACK_BIN:-$NODE_BIN/corepack}"
COMPOSER_BIN="${DEPLOY_COMPOSER_BIN:-composer}"
PHP_BIN="${DEPLOY_PHP_BIN:-php}"
SYSTEMCTL_BIN="${DEPLOY_SYSTEMCTL_BIN:-systemctl}"
PROD_SERVICE_NAME="${DEPLOY_PROD_SERVICE_NAME:-oneclicktask-prod.service}"

mkdir -p "$PROD_DIR"

rsync -a --delete \
  --exclude '.git' \
  --exclude '.env' \
  --exclude 'vendor' \
  --exclude 'node_modules' \
  --exclude 'public/build' \
  --exclude 'storage/logs/*' \
  --exclude 'bootstrap/cache/*' \
  "$SRC_DIR"/ "$PROD_DIR"/

mkdir -p "$PROD_DIR/storage/logs" "$PROD_DIR/bootstrap/cache"
touch "$PROD_DIR/database/database.sqlite"

cd "$PROD_DIR"
"$COMPOSER_BIN" install --no-dev --optimize-autoloader --no-interaction
PATH="$NODE_BIN:$PATH" "$COREPACK_BIN" enable
PATH="$NODE_BIN:$PATH" "$COREPACK_BIN" pnpm install --frozen-lockfile --ignore-scripts
PATH="$NODE_BIN:$PATH" "$COREPACK_BIN" pnpm build
rm -f "$PROD_DIR/public/hot"
"$PHP_BIN" artisan migrate --force
"$SYSTEMCTL_BIN" restart "$PROD_SERVICE_NAME"
