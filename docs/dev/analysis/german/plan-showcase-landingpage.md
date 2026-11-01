# Plan: Showcase „OneClickTask – Entwicklung der Startseite“

Ziel: Ein privates Artefakt (Webseite auf claude.ai), in dem alle Versionen der Startseite zu sehen sind und man zwischen ihnen wechseln kann. Gedacht als Demo für Axel.

Stand: 01.11.2026. Gebaut und als privates Artefakt veröffentlicht: https://claude.ai/artifact/UHHXiYv8janNjLhdLuGLoS. Die offenen Entscheidungen wurden nach den Vorschlägen umgesetzt. Arbeitsdateien (Aufnahme-Skript, Bildaufbereitung, Quelltext der Seite) liegen im Scratchpad der Sitzung `ca7962d0-…` unter `showcase/`.

## 1. Die Versionen als Geschichte

| Kapitel             | Version                              | Was sie war                                         | Warum es weiterging                        |
| ------------------- | ------------------------------------ | --------------------------------------------------- | ------------------------------------------ |
| A Ausgangslage      | V0 oneclicktask.com heute            | Englisch, technisch, kein Impressum                 | Anlass für den Workshop                    |
| B Erste Fassungen   | V1 Startseite in der App (`86084f0`) | Deutsche Seite direkt in Laravel/Vue                | Eigenständige Website gewünscht            |
|                     | V2 Nuxt-UI-Fassung (`7178a0d`)       | Eigenständig, Nuxt-UI-Starter                       | Fassung im MCT-Template gebaut             |
|                     | V3 MCT-Template (`179b3d0`)          | Gleicher Inhalt, schlichtes CSS                     | Grundlage für alles Weitere                |
| C Workshop-Inhalte  | V4 MCT + Workshop                    | Enter-Taste, Marktkarte, Preisrechner               | Als „sehr generisch“ bewertet              |
| D Gestaltung finden | V5 Ultramarin hell                   | App-Nachbau, Ablauf einer Aufgabe                   | Texte teils zu bemüht, Marktanalyse fehlte |
|                     | V6 Polarlicht dunkel                 | Lichteffekte, Animationen, geprüfter Marktvergleich | Blau-Lila-Neon wirkt wie KI-Look           |
| E Farbrichtung      | V7a Signalorange                     | Orange und Graphit                                  | An die App-Farben angeglichen              |
|                     | V7c Kobalt flach                     | Flaches Kobaltblau                                  | Vergleichsvariante                         |
|                     | V8 App-Farben                        | Farben der echten App, Orange nur als Signal        | **Aktueller Stand**                        |

## 2. Woher die Bilder kommen

| Version | Quelle                                                    | Desktop hell | Desktop dunkel | Handy                               |
| ------- | --------------------------------------------------------- | ------------ | -------------- | ----------------------------------- |
| V0      | Live-Seite, neu aufgenommen                               | ja           | ja             | ja                                  |
| V1      | App lokal mit Demo-Datenbank                              | ja           | prüfen         | ja                                  |
| V2      | `website/` lokal                                          | ja           | prüfen         | ja                                  |
| V3      | temporäre Git-Kopie von `179b3d0`                         | ja           | prüfen         | ja                                  |
| V4      | nur Archivbilder                                          | ja           | ja             | ja                                  |
| V5      | nur Archivbilder                                          | ja           | ja             | ja (mit sichtbarem Überlauf-Fehler) |
| V6      | nur Archivbilder, zusammengesetzt                         | ja           | ja             | ja                                  |
| V7a     | rekonstruiert: alte Farben über die aktuelle Seite gelegt | ja           | gab es nie     | ja                                  |
| V7c     | `localhost:3101/?look=c`                                  | ja           | ja             | ja                                  |
| V8      | `localhost:3101`                                          | ja           | ja             | ja                                  |

Jede Version zeigt im Showcase, ob ihr Bild neu aufgenommen, ein Archivbild oder rekonstruiert ist. Fehlende Varianten stehen ehrlich als „nicht vorhanden“ da.

Einheitlicher Standard für neue Aufnahmen: Desktop 1440 px, Handy 390 px, ganze Seite, Animationen aus, Entwickler-Overlays ausgeblendet, nicht eingeloggt.

## 3. Bedienung des Showcase

- Zeitleiste links mit den Kapiteln, Mitte ein Browser- oder Handyrahmen, in dem die ganze Seite scrollt, rechts ein Infopanel mit Idee, Änderungen, Entscheidung und Quelle
- Version wechseln per Klick oder ←/→, Direktlinks wie `#v8`
- Umschalter Desktop/Handy und Hell/Dunkel pro Version
- Vergleichsmodus: zwei Versionen übereinander mit Schieberegler, voreingestellt V0 gegen V8
- Präsentationsmodus: Vollbild mit Taste F, weiter mit der Leertaste
- Übersicht aller Versionen als Raster, Abschlussfolie mit Empfehlung und nächsten Schritten
- Look im aktuellen OneClickTask-Stil (App-Schwarz, Orange als einziger Akzent), hell und dunkel, ab 360 px Breite

## 4. Umfang und Technik

- Rund 100 Bilddateien als WebP, insgesamt etwa 16 MB
- Eine live bedienbare V8 im Showcase ist eine optionale zweite Phase, weil unklar ist, ob sie in der Artefakt-Umgebung läuft
- Arbeitsordner im Scratchpad, die temporäre Git-Kopie wird am Ende entfernt, das Repo bleibt unverändert

## 5. Bauschritte

1. Lokale Server starten: App mit Demo-Datenbank, `website/`, Git-Kopie für V3, `website-mct`
2. Aufnahme-Skript schreiben und an V8 testen
3. Neue Aufnahmen machen: V0 bis V3, V7c, V8, V7a rekonstruieren
4. Archivbilder aufbereiten: V4, V5, V6, dazu das V0-Bild aus dem Workshop-Artefakt
5. Bilder komprimieren und Größe prüfen
6. Texte pro Version schreiben, von Tobias freigeben lassen
7. Showcase-Seite bauen
8. Showcase prüfen: Desktop, Tablet, Handy, hell und dunkel, Tastatur, alle Direktlinks
9. Aufräumen: Git-Kopie entfernen, Server stoppen
10. Als privates Artefakt veröffentlichen

## 6. Offene Entscheidungen

1. **V0 (heutige Live-Seite) zeigen?** Vorschlag: ja, als neutrale Ausgangslage.
2. **Marktvergleich mit echten Konkurrenznamen und Preisen zeigen?** Vorschlag: ja, mit „Stand 1.11.2026“.
3. **Inspirationsbilder (Stripe, Linear, Raycast, Vercel) einbauen?** Vorschlag: weglassen.
4. **Begründungen in Abschnitt 1 so in Ordnung?** Axel liest sie, zum Beispiel „wirkt wie KI-Look“.
