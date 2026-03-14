# Funktionsliste

Diese Liste beschreibt die aktuell im Code sichtbaren Funktionen der Software. Sie trennt zwischen bereits real vorhandenen Funktionen und dem, was noch nicht vorhanden ist.

## Vorhandene Kernfunktionen

1. Benutzerregistrierung
   Benutzer koennen ein neues Konto mit Name, E-Mail und Passwort anlegen.

2. Login / Logout
   Benutzer koennen sich anmelden und wieder abmelden.

3. Passwort-Reset per E-Mail-Flow
   Die Anwendung unterstuetzt das Anfordern eines Reset-Links und das Setzen eines neuen Passworts per Token.

4. E-Mail-Verifikation
   Neu angelegte Benutzer muessen ihre E-Mail bestaetigen, bevor sie verifizierte Bereiche voll nutzen.

5. Dashboard
   Es gibt eine einfache geschuetzte Dashboard-Seite als Ziel nach erfolgreichem Login.

6. Profilverwaltung
   Benutzer koennen ihren Namen und ihre E-Mail-Adresse im Settings-Bereich aendern.

7. Passwortaenderung im eingeloggten Zustand
   Benutzer koennen ihr Passwort nach Eingabe des aktuellen Passworts aktualisieren.

8. Konto-Loeschung
   Benutzer koennen ihr Konto nach Passwortbestaetigung selbst loeschen.

9. Zwei-Faktor-Authentifizierung
   2FA kann aktiviert, bestaetigt und deaktiviert werden.

10. QR-Code- und Secret-Key-basierte 2FA-Einrichtung
    Die App liefert sowohl einen QR-Code als auch einen manuellen Secret-Key fuer Authenticator-Apps.

11. Recovery-Codes fuer 2FA
    Recovery-Codes koennen angezeigt und neu generiert werden.

12. Passwortbestaetigung vor sensiblen Aktionen
    Bestimmte Aktionen, insbesondere 2FA-Einstellungen, koennen eine frische Passwortbestaetigung verlangen.

13. Login-Rate-Limiting
    Login-Versuche sind limitiert, um brute-force-artige Zugriffe abzufangen.

14. Two-Factor-Rate-Limiting
    Auch die 2FA-Challenge ist limitiert.

15. Appearance-Einstellung
    Es gibt eine einfache Einstellung fuer die Oberflaechendarstellung, die ueber Cookies gespeichert wird.

16. Inertia-/Vue-Frontend
    Die Benutzeroberflaeche ist als moderne SPA-artige App mit Laravel, Inertia und Vue aufgebaut.

17. Preview-Betrieb mit Hot Reload
    Die Anwendung ist so vorbereitet, dass die Preview-Instanz ueber Vite mit HMR betrieben werden kann.

18. Produktionsbetrieb mit gebauten Assets
    Eine separate Produktionsinstanz kann mit vorgebauten Vite-Assets stabil ausgeliefert werden.

## Vorhandene technische Qualitaetsmerkmale

1. Feature-Tests mit Pest
   Auth, Dashboard und Settings sind per automatisierten Tests abgedeckt.

2. Typpruefung und Linting
   Frontend-Code kann per `vue-tsc`, ESLint und Prettier geprueft werden.

3. Sicherheitsgrundlage
   Sichere Cookies, HTTPS-Setup, Proxy-Unterstuetzung und reduzierte Inertia-User-Props sind vorbereitet.

4. Caddy- und systemd-Betrieb
   Das Projekt ist fuer den Betrieb hinter Caddy mit separaten systemd-Diensten vorbereitet.

## Was aktuell noch nicht vorhanden ist

1. Keine Aufgabenlogik
   Trotz des Namens `oneclicktask` gibt es noch keine eigentliche Task-, Projekt- oder Ticket-Funktionalitaet.

2. Keine Rollen / Rechte ausser Basis-Auth
   Es existiert derzeit kein ausgearbeitetes Rollen- oder Berechtigungssystem.

3. Keine Admin-Oberflaeche
   Es gibt keinen separaten Administrationsbereich.

4. Keine API fuer Fachobjekte
   Es existiert keine dedizierte JSON-API fuer Anwendungsobjekte wie Tasks, Projekte oder Kommentare.

5. Keine Mandanten- oder Teamstruktur
   Es gibt keine Organisationen, Teams oder Mehrbenutzer-Fachlogik.

6. Keine Zahlungs-, Reporting- oder Exportfunktionen
   Weder Billing noch Reporting, Im-/Export oder aehnliche Business-Funktionen sind vorhanden.

## Kurzfazit

Die Software ist aktuell ein solides, sauber abgesichertes Benutzerkonto- und Authentifizierungs-Scaffold. Die eigentliche fachliche Produktlogik fuer ein System namens `oneclicktask` ist noch weitgehend offen.
