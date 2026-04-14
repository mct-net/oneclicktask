#!/bin/sh

set -e

cd /var/www/html

[ -f .env ] || cp .env.example .env

mkdir -p bootstrap/cache storage/framework/cache storage/framework/sessions storage/framework/views storage/logs database

if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
    [ -f database/database.sqlite ] || touch database/database.sqlite
fi

if ! grep -q '^APP_KEY=base64:' .env; then
    php artisan key:generate --force
fi

if [ ! -L public/storage ] && [ ! -e public/storage ]; then
    php artisan storage:link
fi

php artisan migrate --force
php artisan db:seed --force

chown -R www-data:www-data storage bootstrap/cache database 2>/dev/null || true

exec apache2-foreground