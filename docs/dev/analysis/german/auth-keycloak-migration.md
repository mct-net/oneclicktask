# Laravel-Login heute, Keycloak spaeter

## Zielbild

Kurzfristig kann `oneclicktask` den eingebauten Laravel-/Fortify-Login nutzen. Spaeter kann Keycloak als externer Identity-Provider ueber OIDC ergaenzt oder uebernommen werden, ohne die fachlichen Datenmodelle umzubauen.

Wichtiger Grundsatz: Die Anwendung sollte Besitzer der internen Benutzeridentitaet bleiben. Boards, Tasks, Kommentare und Berechtigungen haengen weiter an der lokalen `users.id`. Keycloak uebernimmt nur Authentifizierung.

## Aufwand

- Neue Nutzer spaeter direkt ueber Keycloak: gering bis mittel
- Bestehende Laravel-Nutzer mit Keycloak verknuepfen: mittel
- Harte Komplettumstellung ohne Vorbereitung: mittel bis hoch

Der spaetere Aufwand sinkt deutlich, wenn die Login-Methode frueh vom eigentlichen Benutzerkonto getrennt wird.

## Empfohlenes Datenmodell

Nicht nur ein einzelnes `provider_user_id`-Feld in `users` ablegen. Robuster ist eine eigene Zuordnungstabelle, zum Beispiel `user_identities`.

Beispielhafte Felder:

- `id`
- `user_id`
- `provider` (`local`, `keycloak`)
- `provider_subject`
- `email_at_provider`
- `last_login_at`
- `created_at`
- `updated_at`

Warum das sinnvoll ist:

- lokale Logins und Keycloak koennen parallel laufen
- spaeter sind weitere Provider moeglich
- die lokale `users.id` bleibt die stabile Fach-ID
- bestehende Accounts lassen sich kontrolliert verknuepfen

## Migration fuer bestehende Nutzer

Bestehende lokale Nutzer koennen spaeter mit Keycloak-Identitaeten verbunden werden. Dafuer gibt es drei uebliche Wege.

### 1. Matching ueber E-Mail

Beim ersten Keycloak-Login wird geprueft, ob bereits ein lokaler Benutzer mit derselben E-Mail existiert. Wenn ja, wird die Keycloak-Identitaet mit dem bestehenden Account verknuepft.

Das ist bequem, aber nur tragfaehig, wenn:

- die E-Mail in Keycloak verifiziert ist
- ihr dieser Quelle vertraut
- keine widerspruechlichen Alt-Daten im Bestand liegen

### 2. Explizites Account-Linking

Ein bereits eingeloggter lokaler Benutzer klickt in der App auf "Mit Keycloak verbinden". Nach erfolgreichem OIDC-Flow wird die Keycloak-`sub` zum vorhandenen lokalen Account gespeichert.

Das ist der sauberste Weg fuer Bestandsnutzer, weil:

- keine implizite Zuordnung nur ueber E-Mail erzwungen wird
- der Benutzer die Verknuepfung bewusst bestaetigt
- Misszuordnungen deutlich unwahrscheinlicher werden

### 3. Admin- oder Batch-Migration

Fuer kontrollierte Umstellungen kann eine Zuordnungsliste vorab erzeugt werden, etwa auf Basis verifizierter E-Mail-Adressen oder eines vorherigen Exports. Das eignet sich, wenn viele Bestandskonten in einem Schritt migriert werden sollen.

## Technische Leitlinien

- Die stabile externe ID ist die Keycloak-`sub`, nicht die E-Mail-Adresse.
- E-Mail ist nur fuer initiales Matching brauchbar, nicht als dauerhafte Primaerzuordnung.
- Rollen, Boards und fachliche Berechtigungen sollten lokal in der Anwendung bleiben.
- Fuer eine Uebergangsphase sollte `local + keycloak` parallel moeglich sein.

## Empfohlener Migrationspfad

### Phase 1

Laravel-/Fortify-Login bleibt aktiv. Das Datenmodell wird bereits so vorbereitet, dass mehrere Auth-Provider moeglich sind.

### Phase 2

Keycloak wird zusaetzlich ueber OIDC angebunden. Neue Nutzer koennen ueber Keycloak entstehen, bestehende Nutzer koennen ihre Konten verbinden.

### Phase 3

Wenn die Umstellung abgeschlossen ist, kann lokaler Passwort-Login eingeschraenkt oder abgeschaltet werden. Die Anwendung nutzt intern weiterhin dieselbe lokale Benutzer-ID.

## Bewertung

Die spaetere Keycloak-Nachruestung ist gut machbar. Kritisch ist nicht die OIDC-Anbindung selbst, sondern die saubere Verknuepfung bestehender Benutzerkonten. Wenn das Datenmodell frueh auf mehrere Auth-Provider vorbereitet wird, bleibt die Umstellung kontrollierbar.
