# Routenuebersicht

Diese Datei beschreibt die aktuell registrierten Laravel-Routen der Anwendung. Stand der Analyse: Das Projekt ist funktional ein Laravel-/Inertia-Starter mit Authentifizierung, Benutzerprofil, Passwortverwaltung, 2FA und einer einfachen Dashboard-/Welcome-Oberflaeche.

## Oeffentliche Seiten

| Methode | Pfad | Name | Zweck |
| --- | --- | --- | --- |
| `GET` | `/` | `home` | Startseite / Welcome-Seite. Zeigt Einstieg in die App und verlinkt Login bzw. Registrierung. |
| `GET` | `/login` | `login` | Login-Formular fuer bestehende Benutzer. |
| `POST` | `/login` | `login.store` | Verarbeitet den Login. Rate-limitiert ueber Fortify. |
| `POST` | `/logout` | `logout` | Meldet den aktuellen Benutzer ab. |
| `GET` | `/register` | `register` | Registrierungsformular. |
| `POST` | `/register` | `register.store` | Erstellt einen neuen Benutzer. |
| `GET` | `/forgot-password` | `password.request` | Formular zum Anfordern eines Passwort-Reset-Links. |
| `POST` | `/forgot-password` | `password.email` | Versendet den Passwort-Reset-Link. |
| `GET` | `/reset-password/{token}` | `password.reset` | Formular zum Setzen eines neuen Passworts per Token. |
| `POST` | `/reset-password` | `password.update` | Speichert das neue Passwort. |
| `GET` | `/email/verify` | `verification.notice` | Hinweis-Seite fuer noch nicht bestaetigte E-Mail-Adressen. |
| `POST` | `/email/verification-notification` | `verification.send` | Sendet Verifikationsmail erneut. |
| `GET` | `/email/verify/{id}/{hash}` | `verification.verify` | Bestaetigt E-Mail-Adresse ueber Verifizierungslink. |
| `GET` | `/two-factor-challenge` | `two-factor.login` | Zweiter Faktor beim Login, falls 2FA aktiv ist. |
| `POST` | `/two-factor-challenge` | `two-factor.login.store` | Prueft den eingegebenen 2FA-Code oder Recovery-Code. |

## Geschuetzte App-Routen

| Methode | Pfad | Name | Zweck |
| --- | --- | --- | --- |
| `GET` | `/dashboard` | `dashboard` | Geschuetzte Hauptseite nach Login. Nur fuer authentifizierte und verifizierte Benutzer. |
| `ANY` | `/settings` | - | Redirect auf `/settings/profile`. Dient als Einstieg in den Einstellungsbereich. |
| `GET` | `/settings/profile` | `profile.edit` | Profilseite des Benutzers. |
| `PATCH` | `/settings/profile` | `profile.update` | Aktualisiert Name und E-Mail-Adresse. |
| `DELETE` | `/settings/profile` | `profile.destroy` | Loescht das Benutzerkonto nach Passwortbestaetigung. |
| `GET` | `/settings/password` | `user-password.edit` | Formular zum Aendern des aktuellen Passworts. |
| `PUT` | `/settings/password` | `user-password.update` | Speichert ein neues Passwort. Zusatzzugriffsschutz via `throttle:6,1`. |
| `GET` | `/settings/appearance` | `appearance.edit` | Oberflaecheneinstellung fuer Darstellung / Appearance. |
| `GET` | `/settings/two-factor` | `two-factor.show` | 2FA-Einstellungsseite. Erfordert je nach Fortify-Konfiguration Passwortbestaetigung. |

## Geschuetzte 2FA- und Sicherheitsrouten

| Methode | Pfad | Name | Zweck |
| --- | --- | --- | --- |
| `GET` | `/user/confirm-password` | `password.confirm` | Formular zur Passwortbestaetigung vor sensiblen Aktionen. |
| `POST` | `/user/confirm-password` | `password.confirm.store` | Prueft das Passwort fuer die Sicherheitsbestaetigung. |
| `GET` | `/user/confirmed-password-status` | `password.confirmation` | Liefert Status, ob Passwort kuerzlich bestaetigt wurde. |
| `POST` | `/user/two-factor-authentication` | `two-factor.enable` | Aktiviert 2FA fuer den Benutzer. |
| `DELETE` | `/user/two-factor-authentication` | `two-factor.disable` | Deaktiviert 2FA. |
| `POST` | `/user/confirmed-two-factor-authentication` | `two-factor.confirm` | Bestaetigt 2FA nach Eingabe des Authenticator-Codes. |
| `GET` | `/user/two-factor-qr-code` | `two-factor.qr-code` | Liefert den QR-Code fuer das Einrichten von 2FA. |
| `GET` | `/user/two-factor-secret-key` | `two-factor.secret-key` | Liefert den manuellen Setup-Key fuer 2FA. |
| `GET` | `/user/two-factor-recovery-codes` | `two-factor.recovery-codes` | Liefert Recovery-Codes. |
| `POST` | `/user/two-factor-recovery-codes` | `two-factor.regenerate-recovery-codes` | Generiert neue Recovery-Codes. |

## Interne oder framework-nahe Routen

| Methode | Pfad | Name | Zweck |
| --- | --- | --- | --- |
| `GET` | `/up` | - | Health-Check-Route von Laravel. Gut fuer Monitoring oder Reverse-Proxy-Checks. |
| `GET` | `/storage/{path}` | `storage.local` | Zugriff auf lokale Storage-Dateien. Framework-seitig vorhanden. |
| `PUT` | `/storage/{path}` | `storage.local.upload` | Upload in lokale Storage-Ziele. Framework-seitig vorhanden. |

## Architekturhinweise zu den Routen

- Die HTML-/SPA-Oberflaeche wird ueber Inertia gerendert.
- Eigene Fachrouten gibt es aktuell fast nur im Bereich `settings/*`.
- Authentifizierung, Passwort-Reset, E-Mail-Verifikation und 2FA kommen ueber Laravel Fortify.
- Es gibt derzeit keine CRUD-Routen fuer fachliche Objekte wie Projekte, Aufgaben, Kunden, Reports oder Abrechnungen.
- Die App ist daher aktuell eher ein abgesichertes Benutzer- und Account-Scaffold als eine fertige Fachanwendung.
