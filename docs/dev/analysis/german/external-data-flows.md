# Externe Datenfluesse und Analytics

Diese Datei dokumentiert alle Stellen, an denen das Projekt Daten von ausserhalb des Servers laden oder an externe Systeme senden kann.

## Aktive externe Datenfluesse

### Analytics: PostHog

Analytics laeuft mit PostHog.

- Frontend-Bibliothek: [`posthog-js`](/home/ag/codex/oneclicktask/package.json)
- Backend-Bibliothek: [`posthog/posthog-php`](/home/ag/codex/oneclicktask/composer.json)
- Frontend-Initialisierung: [`resources/js/composables/useAnalytics.ts`](/home/ag/codex/oneclicktask/resources/js/composables/useAnalytics.ts)
- Backend-Service: [`app/Services/PostHogService.php`](/home/ag/codex/oneclicktask/app/Services/PostHogService.php)
- Konfiguration: [`config/services.php`](/home/ag/codex/oneclicktask/config/services.php), [`.env.example`](/home/ag/codex/oneclicktask/.env.example)

Standardziel:

- `https://us.i.posthog.com`

Was gesendet werden kann:

- Frontend: Pageviews, manuell erfasste Events, Opt-in/Opt-out-Status, ggf. Fehlerereignisse ueber `posthog.captureException`
- Backend: `user_signed_up`, `task_created`, `task_edited`, `task_status_changed`, `task_assigned`, `task_deleted`, `comment_added`, `tag_added`

Wichtige Einschraenkungen:

- Backend-Tracking passiert nur, wenn `POSTHOG_API_KEY` gesetzt ist und der Benutzer `analytics_consent=true` hat.
- Frontend-Tracking startet nur, wenn `VITE_POSTHOG_API_KEY` gesetzt ist.
- Frontend ist standardmaessig auf Opt-out gestellt (`opt_out_capturing_by_default: true`).

## Externe Navigationsziele

Frueher enthielt der App-Header direkte Links auf externe Starter-Kit-Seiten. Diese wurden in [`resources/js/components/core/AppHeader.vue`](/home/ag/codex/oneclicktask/resources/js/components/core/AppHeader.vue) entfernt.

Nicht entfernt, aber weiterhin als manuelle Navigationsziele in Doku/Text vorhanden:

- GitHub-Repository-Hinweise in [`product-overview.md`](/home/ag/codex/oneclicktask/product-overview.md)
- sonstige Referenz-Links in Doku-Dateien

Das sind keine automatischen Datenabfluesse, sondern nur potenzielle Benutzer-Navigation.

## Externe Quellen, die jetzt entfernt oder neutralisiert sind

### Demo-/Mock-Avatar von Firebase Storage

Die externe Avatar-URL aus Firebase Storage wurde aus [`resources/js/lib/board/data.ts`](/home/ag/codex/oneclicktask/resources/js/lib/board/data.ts) entfernt. Der zugehoerige Test-Fall wurde in [`resources/js/composables/board/stores/__tests__/tasks.spec.ts`](/home/ag/codex/oneclicktask/resources/js/composables/board/stores/__tests__/tasks.spec.ts) angepasst.

Vorheriger Effekt:

- Browser haette beim Rendern des Demo-Avatars eine externe Bildquelle geladen.

## Interne, aber netzwerkbasierte Datenfluesse

Diese Calls gehen nicht auf fremde Server, sondern an dieselbe Anwendung:

- `axios`-Aufrufe ueber [`resources/js/lib/board/api.ts`](/home/ag/codex/oneclicktask/resources/js/lib/board/api.ts)
- `fetch` fuer 2FA ueber [`resources/js/composables/useTwoFactorAuth.ts`](/home/ag/codex/oneclicktask/resources/js/composables/useTwoFactorAuth.ts)
- Vite-HMR im Preview-Modus an `preview.oneclicktask.com`

## Potenziell externe Integrationen, aber aktuell nur Konfigurationsoptionen

Diese Systeme sind im Laravel-Standard oder in der Konfiguration vorgesehen, aber ohne gesetzte Env-Werte nicht aktiv:

- AWS / S3
- Postmark
- Resend
- Slack
- SQS

Fundstellen:

- [`config/services.php`](/home/ag/codex/oneclicktask/config/services.php)
- [`config/filesystems.php`](/home/ag/codex/oneclicktask/config/filesystems.php)
- [`config/queue.php`](/home/ag/codex/oneclicktask/config/queue.php)

## Datei-Uploads

Dateianhaenge werden jetzt nicht mehr auf dem `public`-Disk gespeichert, sondern auf einem privaten Disk `attachments`.

Relevante Stellen:

- [`config/filesystems.php`](/home/ag/codex/oneclicktask/config/filesystems.php)
- [`app/Http/Controllers/FileAttachmentController.php`](/home/ag/codex/oneclicktask/app/Http/Controllers/FileAttachmentController.php)

Folge:

- Dateien werden nicht mehr ueber eine oeffentliche Storage-URL ausgeliefert.
- Downloads laufen nur noch ueber den autorisierten Controller-Pfad innerhalb der App.
