# Routenuebersicht

Diese Datei beschreibt die aktuell registrierten Laravel-Routen nach dem Merge des `dev`-Branches. Die Anwendung ist jetzt keine reine Starter-Kit-App mehr, sondern eine Board-/Task-Anwendung mit Auth, Kollaboration, Tags, Dateianhaengen und Analytics-Consent.

## Oeffentliche Routen

| Methode    | Pfad                                         | Name             | Zweck                                                                                                                   |
| ---------- | -------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `GET`      | `/`                                          | `home`           | Landingpage fuer Gaeste. Eingeloggte Benutzer werden nach `boards.index` oder direkt auf ihr einziges Board umgeleitet. |
| `GET`      | `/privacy`                                   | `privacy-policy` | Statische Datenschutzseite.                                                                                             |
| `GET/POST` | Auth-, Reset-, Verify-, 2FA-Challenge-Routen | Fortify          | Standard-Laravel-Fortify-Authentifizierung.                                                                             |

## Authentifizierte Settings-Routen

| Methode  | Pfad                   | Name                   | Zweck                        |
| -------- | ---------------------- | ---------------------- | ---------------------------- |
| `GET`    | `/settings/profile`    | `profile.edit`         | Profilseite.                 |
| `PATCH`  | `/settings/profile`    | `profile.update`       | Profil aktualisieren.        |
| `DELETE` | `/settings/profile`    | `profile.destroy`      | Konto loeschen.              |
| `GET`    | `/settings/password`   | `user-password.edit`   | Passwortseite.               |
| `PUT`    | `/settings/password`   | `user-password.update` | Passwort aendern.            |
| `GET`    | `/settings/appearance` | `appearance.edit`      | UI-/Appearance-Seite.        |
| `GET`    | `/settings/two-factor` | `two-factor.show`      | 2FA-Verwaltung.              |
| `GET`    | `/settings/analytics`  | `analytics.edit`       | Analytics-Consent-Seite.     |
| `PATCH`  | `/settings/analytics`  | `analytics.update`     | Analytics-Consent speichern. |

## Board- und Task-Routen

Alle folgenden Routen laufen hinter `auth`, `verified` und fuer Board-Unterpfade zusaetzlich hinter `board.member`.

### Boards

| Methode     | Pfad                     | Name                 | Zweck                                                                                                   |
| ----------- | ------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------- |
| `GET`       | `/boards`                | `boards.index`       | Leitet auf das zuletzt relevante Board um und erstellt bei leerem Konto automatisch ein Standard-Board. |
| `POST`      | `/boards`                | `boards.store`       | Neues Board anlegen.                                                                                    |
| `GET`       | `/boards/{board}`        | `boards.show`        | Board-Ansicht mit Tasks, Mitgliedern und Tags laden.                                                    |
| `PUT/PATCH` | `/boards/{board}`        | `boards.update`      | Board bearbeiten.                                                                                       |
| `DELETE`    | `/boards/{board}`        | `boards.destroy`     | Board loeschen.                                                                                         |
| `POST`      | `/boards/{board}/invite` | `boards.invite`      | Mitglied einladen.                                                                                      |
| `DELETE`    | `/boards/{board}/remove` | `boards.remove`      | Mitglied entfernen.                                                                                     |
| `PATCH`     | `/boards/{board}/role`   | `boards.role`        | Mitgliederrolle aendern.                                                                                |
| `GET`       | `/boards/{board}/users`  | `boards.users.index` | Board-Mitglieder fuer Zuweisungen laden.                                                                |

### Tasks

| Methode     | Pfad                           | Name                   | Zweck                              |
| ----------- | ------------------------------ | ---------------------- | ---------------------------------- |
| `GET`       | `/boards/{board}/tasks`        | `boards.tasks.index`   | Tasks eines Boards als JSON laden. |
| `POST`      | `/boards/{board}/tasks`        | `boards.tasks.store`   | Task anlegen.                      |
| `GET`       | `/boards/{board}/tasks/{task}` | `boards.tasks.show`    | Einzelne Task laden.               |
| `PUT/PATCH` | `/boards/{board}/tasks/{task}` | `boards.tasks.update`  | Task aktualisieren.                |
| `DELETE`    | `/boards/{board}/tasks/{task}` | `boards.tasks.destroy` | Task loeschen.                     |

### Kommentare

| Methode     | Pfad                                              | Name                            | Zweck                         |
| ----------- | ------------------------------------------------- | ------------------------------- | ----------------------------- |
| `GET`       | `/boards/{board}/tasks/{task}/comments`           | `boards.tasks.comments.index`   | Kommentare einer Task laden.  |
| `POST`      | `/boards/{board}/tasks/{task}/comments`           | `boards.tasks.comments.store`   | Kommentar anlegen.            |
| `PUT/PATCH` | `/boards/{board}/tasks/{task}/comments/{comment}` | `boards.tasks.comments.update`  | Eigenen Kommentar bearbeiten. |
| `DELETE`    | `/boards/{board}/tasks/{task}/comments/{comment}` | `boards.tasks.comments.destroy` | Eigenen Kommentar loeschen.   |

### Dateien

| Methode  | Pfad                                        | Name                         | Zweck                        |
| -------- | ------------------------------------------- | ---------------------------- | ---------------------------- |
| `GET`    | `/boards/{board}/tasks/{task}/files`        | `boards.tasks.files.index`   | Dateiliste einer Task laden. |
| `POST`   | `/boards/{board}/tasks/{task}/files`        | `boards.tasks.files.store`   | Datei hochladen.             |
| `GET`    | `/boards/{board}/tasks/{task}/files/{file}` | `boards.tasks.files.show`    | Datei herunterladen.         |
| `DELETE` | `/boards/{board}/tasks/{task}/files/{file}` | `boards.tasks.files.destroy` | Datei loeschen.              |

### Tags

| Methode  | Pfad                                      | Name                       | Zweck                                      |
| -------- | ----------------------------------------- | -------------------------- | ------------------------------------------ |
| `GET`    | `/boards/{board}/tags`                    | `boards.tags.index`        | Im Board verwendete Tags auflisten.        |
| `POST`   | `/boards/{board}/tags`                    | `boards.tags.store`        | Tag erzeugen oder vorhandenen Tag liefern. |
| `POST`   | `/boards/{board}/tasks/{task}/tags`       | `boards.tasks.tags.attach` | Tag an Task haengen.                       |
| `PUT`    | `/boards/{board}/tasks/{task}/tags/{tag}` | `boards.tasks.tags.update` | Tagname aendern.                           |
| `DELETE` | `/boards/{board}/tasks/{task}/tags/{tag}` | `boards.tasks.tags.detach` | Tag von Task loesen.                       |

## Sicherheits- und Strukturhinweise

- Board-Zugriffe werden zentral ueber [`app/Http/Middleware/EnsureBoardMember.php`](/home/ag/codex/oneclicktask/app/Http/Middleware/EnsureBoardMember.php) abgesichert.
- Inertia teilt nur eine User-Whitelist sowie die zugreifbaren Boards an das Frontend.
- Die App ist hybride Inertia-/JSON-Architektur: Shell und Seiten kommen ueber Inertia, Board-Aktionen ueber JSON-Endpunkte.

## Umgesetzte Haertungen

- Nicht implementierte Resource-Routen wurden entfernt. Registriert sind jetzt nur noch Endpunkte, fuer die es auch Controller-Methoden gibt.
- Tags sind jetzt board-scoped statt global.
- Dateianhaenge werden ueber einen privaten Storage-Disk ausgeliefert.

## Handlungsempfehlungen

1. Fuer Board-, Task-, Tag- und Dateioperationen Policies oder dedizierte Action-/Service-Klassen einfuehren.
2. Die Routen bewusst zwischen Inertia-Seiten und API-Endpunkten trennen, damit die App-Struktur fuer weitere Module klarer bleibt.
3. Fuer Uploads langfristig einen expliziten Download-Response-DTO statt eines gespeicherten `url`-Felds verwenden.
