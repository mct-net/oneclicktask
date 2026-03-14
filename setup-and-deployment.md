# oneclicktask

Laravel 12 mit Inertia, Vue 3, Fortify und Vite. Der aktuelle Stand ist im Wesentlichen ein Starter-Kit mit Auth, Settings, 2FA und UI-Bausteinen, aber noch ohne ausgeprägte Fachmodule.

## Sicherheitslage

- Das Repo enthält keine offensichtlichen Secrets oder eigenen Shell-Hooks.
- `composer run setup` ist für eine Erstinstallation aus unkontrollierter Quelle zu aggressiv, weil es direkt installiert, migriert und baut.
- Externe Font-Loads wurden entfernt, damit das Preview nicht von Dritt-CDNs abhängt.
- Die Frontend-Props erhalten nur noch eine explizite User-Whitelist.

## Sichere Erstinstallation

1. PHP- und Node-Abhängigkeiten zunächst ohne Fremdskripte installieren:

```bash
composer install --no-scripts
npm ci --ignore-scripts
```

2. Environment vorbereiten:

```bash
cp .env.example .env
php artisan key:generate
```

3. Datenbank prüfen und Migrationen bewusst ausführen:

```bash
php artisan migrate
```

4. Danach verifizieren:

```bash
php artisan test
npm run build
```

## Entwicklung lokal

Für das Frontend reicht `npm run dev`. Für den vollständigen Stack startet `composer run dev` zusätzlich Laravel-Server, Queue-Listener und Log-Stream.

## Preview mit Caddy und sichtbarem HMR

Wenn `npm run dev` über `preview.oneclicktask.de` erreichbar sein soll, setze in `.env` mindestens:

```dotenv
APP_URL=https://preview.oneclicktask.de
APP_FORCE_HTTPS=true
SESSION_SECURE_COOKIE=true
TRUSTED_PROXIES=127.0.0.1

VITE_DEV_SERVER_HOST=127.0.0.1
VITE_DEV_SERVER_PORT=5173
VITE_DEV_SERVER_ORIGIN=https://preview.oneclicktask.de
VITE_HMR_HOST=preview.oneclicktask.de
VITE_HMR_PROTOCOL=wss
VITE_HMR_CLIENT_PORT=443
VITE_ALLOWED_HOSTS=preview.oneclicktask.de
```

Danach:

```bash
php artisan serve --host=127.0.0.1 --port=8000
npm run dev
```

Eine passende Caddy-Konfiguration liegt in [`ops/Caddyfile.preview.example`](./ops/Caddyfile.preview.example). Sie leitet normale Requests an Laravel und Vite-spezifische Requests inklusive Websocket-Upgrades an den Dev-Server weiter.

## Server-Layout auf diesem Host

- `https://oneclicktask.com` läuft als stabile Snapshot-Instanz aus `/home/ag/codex/oneclicktask-prod` über `oneclicktask-prod.service`.
- `https://preview.oneclicktask.com` läuft direkt aus diesem Workspace `/home/ag/codex/oneclicktask` über `oneclicktask-preview.service` plus `oneclicktask-preview-vite.service`.
- Die produktive Snapshot-Instanz kann mit `./ops/deploy-prod.sh` aus dem aktuellen Workspace neu ausgerollt werden, ohne die Preview-Instanz umzubiegen.
