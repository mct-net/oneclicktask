#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="/home/ag/codex/oneclicktask"
PROD_DIR="/home/ag/codex/oneclicktask-prod"
NODE_BIN="/opt/node-v22.22.1/bin"

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
composer install --no-dev --optimize-autoloader --no-interaction
PATH="$NODE_BIN:$PATH" "$NODE_BIN/corepack" enable
PATH="$NODE_BIN:$PATH" "$NODE_BIN/corepack" pnpm install --frozen-lockfile --ignore-scripts
PATH="$NODE_BIN:$PATH" "$NODE_BIN/corepack" pnpm build
rm -f "$PROD_DIR/public/hot"
php artisan migrate --force
systemctl restart oneclicktask-prod.service
