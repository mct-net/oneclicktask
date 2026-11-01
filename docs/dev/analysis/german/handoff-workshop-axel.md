# Handoff: Workshop mit Axel zu OneClickTask

Stand: 11.10.2026, abends. Diese Datei reicht aus, um den Termin vorzubereiten oder die Arbeit in
einer neuen Sitzung fortzusetzen.

## Worum es geht

Axel wollte pro Produkt einen Workshop: Produkt verstehen, aktuelle Webseite prüfen oder neu
entwerfen, Markt ansehen, erarbeiten, an wen wir verkaufen könnten, die Webseite mit „unserem
Template“ bauen und am Ende Christians `AGENTS.md` und CI/CD-Regeln drüberlaufen lassen. Tobi hat
OneClickTask gewählt, danach soll Cosmos folgen.

## Was fertig ist

| Ergebnis                                                                   | Wo                                                                   |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Workshop-Seite für Axel (Produkt, Markt, Zielgruppe, Webseite, Next Steps) | https://claude.ai/artifact/GuHTGtEQPZHm15c9dcRtdX                    |
| Sprechskript für den Termin                                                | `docs/dev/analysis/german/workshop-skript-oneclicktask.md`           |
| Neue Webseite im Template                                                  | `website/`                                                           |
| Neue Startseite in der App                                                 | `resources/js/pages/Welcome.vue`, `resources/js/components/landing/` |
| CI für die Webseite                                                        | `.github/workflows/website.yml`                                      |

Branch: `feat/landing-page`, abgezweigt von `main_tobi`, gepusht nach `origin`. Zwei Commits:

- `86084f0` feat: rebuild landing page in German for web and dev teams
- `7178a0d` feat: add standalone Nuxt marketing website

Ein Merge Request existiert nicht. Anlegen unter
https://github.com/mct-net/oneclicktask/pull/new/feat/landing-page.

## Die drei Kernaussagen

1. Die heutige Seite oneclicktask.com erklärt die Technik, aber nicht den Nutzen. Impressum fehlt,
   zwei Footer-Links liefern 404.
2. Empfohlene Zielgruppe: kleine Digitalteams mit 2–15 Personen (Web- und Softwareagenturen,
   Entwicklerteams, IT-Dienstleister). Im Markt verbindet sonst niemand kostenlos, quelloffen und
   einfach; der direkteste Konkurrent ist Vikunja.
3. Die neue Webseite ist gebaut und läuft. Vor einer Veröffentlichung fehlen Impressum,
   Datenschutzseite ohne Platzhalter und eine `LICENSE`-Datei.

## Vor dem Termin: Checkliste

1. Workshop-Seite über das Teilen-Menü für Axel freigeben. Sie ist sonst nur für Tobi sichtbar.
2. Zwei PowerShell-Fenster starten, in dieser Reihenfolge:

    ```powershell
    # Fenster 1: die App
    cd C:\Users\tobo2\repos\oneclicktask
    php artisan serve          # http://127.0.0.1:8000

    # Fenster 2: die neue Webseite
    cd C:\Users\tobo2\repos\oneclicktask\website
    pnpm dev                   # http://localhost:3000
    ```

3. Vier Tabs öffnen: https://oneclicktask.com, http://localhost:3000, die Workshop-Seite, den
   Branch auf GitHub.
4. Demo einmal durchspielen: im Hero `Changelog schreiben #release` tippen, Enter, dann auf den
   Hashtag klicken.
5. Skript lesen, besonders den Abschnitt „Wenn Axel nachfragt“.

## Was Axel entscheiden muss

1. Stimmen die Annahmen: kostenlos, Open Source, Produktion in der EU?
2. Ist die Zielgruppe „kleine Digitalteams“ richtig?
3. Womit wird Geld verdient, wenn das Produkt kostenlos bleibt?
4. Welche der zwei Webseiten-Fassungen wird weitergeführt, und unter welcher Domain?
5. War mit „unser Template“ das Nuxt-UI-Starter-Template gemeint?
6. Gelten Christians Cosmos-Regeln (Jira-Präfix, Branch-Schema) auch für dieses Repo?

## Was belegt ist und was nicht

| Aussage                                                      | Grundlage                                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Funktionen der App                                           | am Code geprüft                                                                 |
| Befunde zur heutigen Seite                                   | live auf oneclicktask.com geprüft am 11.10.2026                                 |
| Zahlen zu Segmenten (Vereine, Handwerk, Solo-Selbstständige) | recherchiert, Quellen im Skript                                                 |
| Preise der Wettbewerber                                      | aus Vergleichsportalen, teils widersprüchlich, nicht auf Anbieterseiten geprüft |
| Punktewertung der Segmente, Gewichtung der Befunde           | Einschätzung                                                                    |
| Erlösmodelle, typische Person                                | Vorschlag                                                                       |
| „Kostenlos“, „Open Source“, „EU-Hosting“                     | Tobis Angaben, von Axel nicht bestätigt                                         |

Mit echten Nutzern hat niemand gesprochen.

## Offene Punkte

- **Blocker:** Impressum fehlt. Die Datenschutzseite enthält Platzhalter wie `[Your Company Name]`
  und ist Englisch. Es gibt keine `LICENSE`-Datei, obwohl `composer.json` MIT nennt.
- **PostHog** läuft über den US-Host.
- **Regelabweichung:** Commits ohne Jira-Präfix, Branch-Name passt nicht zum Schema
  `feature/<TICKET>-beschreibung`. Es gab keine Ticketnummer.
- **Englische Fassung** der Webseite fehlt, wäre für die Zielgruppe sinnvoll.
- **Header bei 320 px Breite** ragt in beiden Fassungen leicht über den Rand.
- **Pint** schlägt lokal in sieben PHP-Dateien fehl, die nicht Teil dieser Arbeit sind.
- **Kein `README.md`**, rund 3 MB ungenutzte Bilder in `public/images/landing/`.
- **Nicht committet:** das Skript und diese Datei.

## Technische Stolpersteine

- **Windows statt WSL:** `node_modules` war mit Linux-Binaries installiert. Es wurde `pnpm` 11.1.3
  global installiert und alles für Windows neu aufgebaut. In WSL oder Docker müsste man neu
  installieren.
- **Tests unter Windows:** `php artisan test` scheitert, weil in `C:\php\php.ini` die Zeile
  `extension=sockets` auskommentiert ist. So laufen sie:
  `php -d extension=sockets vendor/pestphp/pest/bin/pest tests/Feature tests/Unit`
  (47 bestanden). Die Browser-Tests wurden nicht ausgeführt.
- **Nuxt-Version:** Das Template liefert Nuxt 4.6.0, das unter Windows nicht rendert („Either
  manifest or precomputed data must be provided“). `website/` nutzt 4.6.1.
- **App-Adresse:** `website/` verlinkt auf die App über `NUXT_PUBLIC_APP_URL`, Standard ist
  `http://localhost:8000`. Bei `pnpm build` wird der Wert fest eingebaut.
- **Root-Linter:** ESLint, Prettier und Stylelint des Laravel-Projekts ignorieren `website/`.
- **Tobis lokale Änderungen** an `.gitignore`, `.husky/pre-commit`, `composer.lock`,
  `pnpm-workspace.yaml` und die Datei `package-lock.json` sind bewusst nicht committet.

## Wo Template und Regeln liegen

Alles auf `git.prxag.de`, erreichbar mit `glab` (angemeldet als TobiG):

| Was                            | Wo                                                                     |
| ------------------------------ | ---------------------------------------------------------------------- |
| Template-Vorbild               | `cosmos/frontend`, gebaut aus `nuxt-ui-templates/starter` (GitHub)     |
| `AGENTS.md` und Agenten-Regeln | `cosmos/new_repos/cosmos`, dort auch `cosmos_docs/agent-harness/`      |
| CI-Vorbild                     | `cosmos/frontend`, Datei `.github/workflows/ci.yml`                    |
| Merge-Kriterium Backend        | README auf `feature/COS-5-remove-frontend` in `cosmos/mvo_cosmos_2025` |

`website/` wurde aus der Originalvorlage von GitHub erzeugt, nicht aus dem Cosmos-Frontend kopiert.

## Workshop-Seite ändern

Die Seite ist ein veröffentlichtes Artefakt. In einer neuen Sitzung zuerst über den Link lesen und
dann unter derselben Adresse neu veröffentlichen, damit der Link für Axel gleich bleibt. Es gibt
außerdem ein älteres, schlichteres Dokument unter
https://claude.ai/artifact/DPNp7SkUMrmTxncrCG4REw, das nicht mehr gepflegt wird und gelöscht werden
kann.

## Nach dem Termin

1. Axels Entscheidungen in Webseite und Workshop-Seite einarbeiten.
2. Impressum, Datenschutzseite und `LICENSE` ergänzen.
3. PostHog auf die EU-Instanz umstellen.
4. Merge Request anlegen.
5. Preise gegenprüfen, mit zwei bis drei Teams sprechen, englische Fassung bauen.
6. Dasselbe Vorgehen für Cosmos wiederholen.
