# Funktionsliste

Diese Liste beschreibt die aktuell sichtbaren Funktionen der Software nach dem Merge des `dev`-Branches.

## Fachfunktionen

1. Benutzerregistrierung, Login, Logout, Passwort-Reset und E-Mail-Verifikation.
2. Zwei-Faktor-Authentifizierung mit QR-Code, Secret-Key und Recovery-Codes.
3. Board-basierte Arbeitsbereiche mit Besitzer und Mitgliedern.
4. Aufgabenverwaltung pro Board mit Name, Beschreibung, Status, Priorisierung, Stern/Important-Flags und Faelligkeit.
5. Auswahl und Filterung von Tasks nach Status, Suche, Tags, Farben und Zuweisung.
6. Kommentare auf Tasks.
7. Dateianhaenge pro Task.
8. Tags auf Task-Ebene.
9. Rollen im Board-Kontext in einfacher Form: Owner, Admin, Member.
10. Analytics-Consent im Benutzerprofil und optionale PostHog-Event-Erfassung.
11. Preview-Betrieb mit Vite-HMR und getrennte Produktions-Snapshot-Instanz.

## Technische Staerken

1. Der Frontend-Bereich fuer das Board ist schon in Komponenten, Stores, Utils und API-Helfer zerlegt.
2. Die Mitgliedschaftspruefung ist zentralisiert und verhindert einfache Cross-Board-Zugriffe.
3. Unit-/Feature-Tests fuer Auth, Settings und Shared Props laufen gruen.
4. Build, Linting und Preview-Betrieb sind auf dem Host bereits funktionsfaehig.

## Modularitaetsbewertung

Gesamteindruck: mittel.

Positiv:

- Das Frontend ist im Board-Modul bereits relativ gut geschnitten.
- Analytics ist als eigener Service ausgelagert.
- Middleware, Models und Controller folgen grundsaetzlich klaren Verantwortungsgrenzen.

Schwachstellen:

- Die HTTP-Controller enthalten zu viel kombinierte Logik aus Validierung, Berechtigung, Seiteneffekt und Persistenz.
- Es fehlen Form Requests, Policies und klar getrennte Application-Services fuer zentrale Faelle wie Task-Update, Mitgliedereinladung oder Tag-Management.
- Das Tag-Modell ist global statt board-scoped. Das erzeugt fachliche Kopplung zwischen Boards.
- Die Frontend-Stores arbeiten als Singletons auf Modul-Ebene. Das ist fuer die aktuelle SPA praktikabel, macht aber Tests, parallele Board-Kontexte und kuenftige SSR-/Multi-Instance-Sauberkeit schwieriger.
- Die API arbeitet mit globalem `currentBoardId` im Client statt mit sauber injizierten Board-Kontexten.

## Wichtige Review-Funde

1. Die toten Resource-Routen wurden entfernt. Der fruehere 500er-Risikopfad aus nicht implementierten Controller-Methoden ist damit beseitigt.
2. Tags sind jetzt board-scoped. Gleichnamige Tags koennen pro Board getrennt existieren, ohne sich gegenseitig umzubenennen.
3. Dateianhaenge liegen jetzt auf einem privaten Storage-Disk und werden nur ueber autorisierte Download-Routen ausgeliefert.
4. Der Setup-Workflow in [`composer.json`](/home/ag/codex/oneclicktask/composer.json) ist fuer Fremdquellen weiterhin aggressiv, weil `composer setup` Migrationen und Frontend-Installationen direkt ausfuehrt.
5. Die Browser-Tests aus dem `dev`-Branch sind aktuell nicht stabil gruen und bilden damit keine verlaessliche Merge-Sicherung.
6. Analytics sendet bei aktivierter Konfiguration an PostHog. Die Details dazu sind in [`external-data-flows.md`](/home/ag/codex/oneclicktask/docs/dev/analysis/german/external-data-flows.md) dokumentiert.

## Handlungsempfehlungen

1. Fuer `BoardController` und `TaskController` Form Requests und Services einfuehren.
2. E2E-Tests reparieren oder aus dem Standard-Testlauf trennen, bis sie stabil sind.
3. Den `composer setup`-Pfad fuer Fremdquellen entschärfen oder intern-only kennzeichnen.
4. Externe Datenfluesse regelmaessig gegen die Doku in [`external-data-flows.md`](/home/ag/codex/oneclicktask/docs/dev/analysis/german/external-data-flows.md) abgleichen.
