# Produktion und Preview

## Zielbild

- `https://oneclicktask.com` ist die stabile Produktionsdomain fuer Benutzer.
- `https://preview.oneclicktask.com` ist die private Vorschau mit Vite-HMR.
- Beide Hosts nutzen denselben Laravel-Backend-Service.
- Nur Preview laedt Frontend-Code live aus dem Vite-Devserver.

## Aktuelle Topologie auf diesem Host

- Produktions-Backend: `oneclicktask-prod.service`
- Produktions-Port: `127.0.0.1:8004`
- Preview-Vite: `oneclicktask-preview-vite.service`
- Preview-Vite-Port: `127.0.0.1:5173`
- Reverb/Websocket-Backend: `127.0.0.1:8090`
- Reverse Proxy und TLS: `caddy`

## Routing

### oneclicktask.com

- Caddy leitet regulaere Requests an `127.0.0.1:8004`.
- Reverb-Pfade `/app*` und `/apps*` gehen an `127.0.0.1:8090`.
- Die Domain soll nur gebaute Assets aus `public/build` ausliefern.

### preview.oneclicktask.com

- Caddy schuetzt den Host mit Basic Auth.
- Vite-spezifische Pfade wie `/@vite/*`, `/resources/*`, `/node_modules/*`, `/@fs/*` und `/@id/*` gehen an `127.0.0.1:5173`.
- Websocket-Upgrades fuer Vite gehen ebenfalls an `127.0.0.1:5173`.
- Alle uebrigen Requests gehen an denselben Laravel-Backend-Service auf `127.0.0.1:8004`.

## Wichtige App-Logik

- `oneclicktask.com` muss `public/hot` ignorieren.
- `preview.oneclicktask.com` nutzt stattdessen ein separates Hotfile unter `storage/framework/vite.preview.hot`.
- Die hostbasierte Umschaltung liegt in [`AppServiceProvider.php`](/home/ag/codex/oneclicktask/app/Providers/AppServiceProvider.php).
- Das Produktiv-Deploy entfernt `public/hot` explizit in [`deploy-prod.sh`](/home/ag/codex/oneclicktask/ops/deploy-prod.sh).

## Bekannter Stoerfall vom 2026-03-25

`oneclicktask.com` war nicht erreichbar, obwohl Laravel und Caddy liefen. Ursache war eine unvollstaendige Live-Caddy-Konfiguration: In `/etc/caddy/Caddyfile` fehlten die VHosts fuer `oneclicktask.com` und `preview.oneclicktask.com`. Dadurch schlug der TLS-Handshake fuer diese Hosts bereits vor dem eigentlichen Request fehl.

Die versionierte Referenzkonfiguration fuer die beiden Domains liegt im Repo unter [`ops/Caddyfile.oneclicktask.example`](/home/ag/codex/oneclicktask/ops/Caddyfile.oneclicktask.example).

## Schnelle Checks

### Dienste

```bash
systemctl is-active caddy oneclicktask-prod.service oneclicktask-preview-vite.service
```

### Produktion

```bash
curl -sS -I https://oneclicktask.com
curl -sS https://oneclicktask.com | rg "/build/assets|@vite/client"
```

Erwartung:

- `HTTP/2 200`
- HTML referenziert `/build/assets`
- HTML referenziert nicht `@vite/client`

### Preview

```bash
curl -sS -I https://preview.oneclicktask.com
curl -sS http://127.0.0.1:5173/@vite/client | head
```

Erwartung:

- oeffentlich `401` wegen Basic Auth
- lokal liefert der Vite-Client Inhalt

## Wenn Produktion ploetzlich HMR-Assets ausliefert

Pruefen:

```bash
ls -l /home/ag/codex/oneclicktask-prod/public/hot
```

Wenn die Datei existiert, ist das verdaechtig. Das Deploy-Skript sollte sie entfernen.

## Wenn Domains ploetzlich nicht erreichbar sind

Pruefen:

```bash
sed -n '1,260p' /etc/caddy/Caddyfile
caddy validate --config /etc/caddy/Caddyfile
```

Bei fehlenden `oneclicktask`-VHosts die Vorlage aus [`ops/Caddyfile.oneclicktask.example`](/home/ag/codex/oneclicktask/ops/Caddyfile.oneclicktask.example) gegen die Live-Datei abgleichen.
