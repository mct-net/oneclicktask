# Workshop-Skript OneClickTask

Stand: 11.10.2026. Dein Leitfaden für den Termin mit Axel. Er folgt Axels Ablauf aus dem Chat
(20 min Allgemein und Check, 15 min Marktanalyse, 20 min Webseite, 15 min Demo und Next Steps).

Wichtig vorab: Zahlen und Fakten sind recherchiert, Bewertungen und Empfehlungen sind Einschätzungen.
Wo etwas eine Einschätzung ist, steht es dabei. Sag das im Termin auch so.

## Vor dem Termin

Zwei PowerShell-Fenster öffnen, in dieser Reihenfolge:

```powershell
# Fenster 1: die App (Login, Registrierung, Startseite in der App)
cd C:\Users\tobo2\repos\oneclicktask
php artisan serve          # http://127.0.0.1:8000

# Fenster 2: die neue Webseite im Template
cd C:\Users\tobo2\repos\oneclicktask\website
pnpm dev                   # http://localhost:3000
```

Tabs vorbereiten:

1. https://oneclicktask.com (die heutige Seite)
2. http://localhost:3000 (der neue Entwurf)
3. Die Workshop-Seite: https://claude.ai/artifact/GuHTGtEQPZHm15c9dcRtdX (vorher über „Teilen“ freigeben, falls Axel sie selbst öffnen soll)
4. Der Branch auf GitHub: https://github.com/mct-net/oneclicktask/tree/feat/landing-page

## Die Kurzfassung in drei Sätzen

Falls Axel nur zwei Minuten hat:

1. Die heutige Seite erklärt die Technik, aber nicht, wem OneClickTask welches Problem löst, und ihr fehlen Impressum und funktionierende Footer-Links.
2. Die beste Zielgruppe sind kleine Digitalteams mit 2–15 Personen, also Web- und Softwareagenturen und Entwicklerteams; im Markt verbindet sonst niemand kostenlos, quelloffen und einfach.
3. Eine neue Webseite dafür ist im Firmen-Template gebaut, gepusht und läuft; vor einer Veröffentlichung fehlen Impressum, Datenschutzseite und Lizenzdatei.

---

## Teil 1: Allgemein, Check, Verstehen (20 min)

Axel zeigt hier seine Mini-Demo. Dein Teil ist kurz: zeigen, was du verstanden hast, und Fragen stellen.

### Was OneClickTask ist

Eine Web-App für Aufgabenlisten, deren Stärke Geschwindigkeit ist. Beim Öffnen ist das Eingabefeld
sofort aktiv, und fast jede Aktion braucht nur einen Klick.

Was die App kann (am Code geprüft):

- **Schnell erfassen:** Ein Feld („Find or create…“) sucht und legt an. Hashtags im Text werden erkannt und filtern die Liste mit einem Klick.
- **Fälligkeit:** feste Schritte statt Kalender: 5 Minuten, 1 Stunde, 1 Tag, 1 Woche, 1 Monat, 3 Monate.
- **Direkt an der Aufgabe:** Stern, Wichtig-Flagge, Farbe, Status, Backlog, Papierkorb, ohne Dialog.
- **Inhalt:** Beschreibung mit Texteditor, Kommentare, Dateianhänge, neue Aufgabe per Drag & Drop einer Datei.
- **Team:** Boards mit Mitgliedern und Rollen (Owner, Admin, Member), Zuweisung von Aufgaben.
- **Sicherheit:** Zwei-Faktor-Anmeldung, Anhänge nur für Board-Mitglieder abrufbar, Statistik (PostHog) nur nach Einwilligung.
- **Betrieb:** Laravel 12 und Vue 3, ein Dockerfile liegt bei, der Code ist öffentlich auf GitHub.

Grenzen, die du offen nennen solltest:

- Die Oberfläche ist nur auf Englisch.
- Es gibt keine native Handy-App.
- Es gibt nur die Listenansicht, kein Kanban, keinen Kalender, kein Gantt.

### Check der heutigen Seite

Geprüft am 11.10.2026 auf https://oneclicktask.com. Zeig den Tab und geh die Punkte durch.

| Befund                 | Detail                                                                                                                                                                               | Gewicht |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| Kein Nutzenversprechen | Die Überschrift lautet „Manage Everything with a Single Click“, darunter steht ein langer Beschreibungstext aus der README. Zielgruppe, Preise und Team-Funktionen kommen nicht vor. | hoch    |
| Recht                  | Kein Impressum. `/privacy-policy` und `/contact` im Footer liefern 404. Die Datenschutzseite existiert unter `/privacy`, enthält aber Platzhalter wie `[Your Company Name]`.         | hoch    |
| Sprache und SEO        | Nur Englisch, Seitentitel „Welcome“, keine Meta-Description.                                                                                                                         | mittel  |
| Füllinhalte            | Zwei Sektionen zur Entstehungsidee, die dasselbe sagen, und eine Reihe Technik-Logos (HTML5, CSS3, Docker).                                                                          | mittel  |
| Technik                | Ein Hero-Bild mit 2,2 MB, Farben fest im Code statt aus dem Theme der App.                                                                                                           | niedrig |

Die Gewichtung ist eine Einschätzung.

### Fragen an Axel

Diese Antworten brauchst du, weil die Webseite sie behauptet:

1. Bleibt das Produkt kostenlos, und wird es als Open Source vermarktet?
2. Läuft die Produktion von oneclicktask.com in der EU?
3. Gibt es schon echte Nutzer oder Teams, und was sagen sie?
4. Was unterscheidet die eigenständige App vom OneClickTask-Modul in Cosmos?
5. Wer ist der Betreiber für Impressum und Datenschutz?

---

## Teil 2: Marktanalyse und Zielgruppe (15 min)

### Der Markt in einem Satz

Keiner der betrachteten Wettbewerber verbindet kostenlos, quelloffen und einfach.

### Vier Gruppen von Wettbewerbern

| Gruppe                       | Beispiele                                  | Preis                           | Lücke für OneClickTask                                |
| ---------------------------- | ------------------------------------------ | ------------------------------- | ----------------------------------------------------- |
| Persönliche To-do-Apps       | Todoist, TickTick, Things, Microsoft To Do | gratis bis ca. 4–5 $ pro Monat  | geschlossen, US-Anbieter, Teamfunktionen kosten extra |
| Deutsche Team-Tools          | Stackfield, awork, MeisterTask             | ca. 5–22 € pro Nutzer und Monat | teuer und für kleine Teams überladen                  |
| Projektsoftware              | Trello, Asana, ClickUp                     | ab ca. 5 $ pro Nutzer           | gilt als komplex, viele Klicks pro Aufgabe            |
| Open Source, selbst gehostet | Vikunja, Planka, Kanboard                  | kostenlos                       | viele Ansichten, aber keine setzt auf Geschwindigkeit |

### Details zu den einzelnen Wettbewerbern

Die Angaben stammen aus Vergleichsportalen, nicht von den Anbieterseiten, und widersprechen sich teilweise.

| Tool            | Was die Quellen sagen                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Todoist         | Kostenlose Stufe; Pro je nach Quelle 4–5 $ pro Monat. Erinnerungen und Spracheingabe sind kostenpflichtig.                           |
| TickTick        | Kostenlose Stufe; Premium rund 36 $ pro Jahr. Hat Pomodoro und Zeitmessung.                                                          |
| Things 3        | Einmalkauf, rund 50 $ für die größte Ausgabe, keine Gratisversion, nur Apple-Geräte.                                                 |
| Microsoft To Do | Kostenlos, weniger Funktionen als TickTick.                                                                                          |
| Trello          | Gilt als die einfache Kanban-Lösung; kostenlose Stufe, bezahlt ab rund 5 $ pro Nutzer.                                               |
| Asana           | Gilt als aufgeräumter als ClickUp, bleibt aber Projektsoftware.                                                                      |
| ClickUp         | Wird von Testern als überwältigend und unter Last langsam beschrieben.                                                               |
| Stackfield      | Serverstandort Deutschland, Ende-zu-Ende-Verschlüsselung; Starter 9 € pro Nutzer (bis 10 Nutzer), Business 14 €.                     |
| awork           | Kernzielgruppe Kreativagenturen mit 5–50 Personen, Hosting in Deutschland, ISO 27001; je nach Quelle 5 / 11–12 / 19–22 € pro Nutzer. |
| MeisterTask     | Kostenlose Stufe mit bis zu 3 Projekten; bezahlt 13–25 $ pro Nutzer.                                                                 |
| Vikunja         | Open Source (AGPL), gilt als nächster selbst gehosteter Ersatz für Todoist; Listen-, Kanban-, Gantt- und Tabellenansicht, CalDAV.    |
| Planka          | Open Source, Trello-ähnliches Kanban-Board.                                                                                          |
| Kanboard        | Open Source, bewusst minimales Kanban.                                                                                               |
| Linear          | Schnell und tastaturgesteuert, aber ein Ticketsystem für Softwareteams.                                                              |

Der direkteste Konkurrent ist Vikunja: ebenfalls kostenlos, quelloffen und selbst hostbar. Es kann mehr,
wirkt aber deutlich schwerer. OneClickTask gewinnt dort nur über Einfachheit und Tempo.

### Zielgruppe: so wurde sie hergeleitet

Sieben Segmente, jeweils nach denselben fünf Kriterien mit 1 bis 3 Punkten bewertet. Die Punkte sind
eine Einschätzung, die Fakten daneben sind recherchiert.

| Segment                           | Problem | Passt heute | Erreichbar | Wenig Konkurrenz | Zahlt | Summe |
| --------------------------------- | :-----: | :---------: | :--------: | :--------------: | :---: | :---: |
| Entwicklerteams und Selbst-Hoster |    2    |      3      |     3      |        1         |   2   |  11   |
| Agenturen und Kreativteams        |    3    |      2      |     2      |        1         |   3   |  11   |
| Vereine und Ehrenamt              |    2    |      2      |     2      |        3         |   1   |  10   |
| Kleine Büros und Dienstleister    |    2    |      2      |     1      |        2         |   2   |   9   |
| Handwerksbetriebe                 |    2    |      1      |     2      |        2         |   2   |   9   |
| Öffentliche Hand und Schulen      |    2    |      1      |     1      |        2         |   3   |   9   |
| Solo-Selbstständige               |    2    |      2      |     2      |        1         |   1   |   8   |

Die Begründung pro Segment:

- **Entwicklerteams und Selbst-Hoster:** Englische Oberfläche, Docker und GitHub sind hier kein Hindernis. Erreichbar über GitHub und Selbst-Hosting-Foren. Konkurrenz ist stark: Linear, Jira, GitHub Issues, Vikunja.
- **Agenturen und Kreativteams:** Hoher Problemdruck und Zahlungsbereitschaft. Aber awork zielt genau auf sie, und Agenturen verlangen in Ausschreibungen Zeiterfassung, Abrechnung und Kundeneinbindung, die OneClickTask nicht hat.
- **Vereine und Ehrenamt:** Rund 615.750 eingetragene Vereine (ZiviZ, 2022), kaum spezialisierte Konkurrenz, ein kostenloses Tool passt zum Budget. Hürden sind die englische Oberfläche und fehlende Zahlungsbereitschaft.
- **Kleine Büros und Dienstleister:** Von rund 2,5 Millionen Unternehmen in Deutschland hat die große Mehrheit unter 10 Beschäftigte. Riesiger Markt, aber ohne Branchenfokus kaum gezielt ansprechbar.
- **Handwerksbetriebe:** Rund 1,04 Millionen Betriebe (ZDH, 2025), 68 % nutzen digitale Technologien (Bitkom und ZDH). Sie brauchen eine Handy-App für die Baustelle, und Branchenlösungen wie Craftnote sind etabliert.
- **Öffentliche Hand und Schulen:** Der Wunsch nach Open Source ist da, wird aber von openDesk mit OpenProject bedient, laut einem Bericht für 8.600 Schulen. Beschaffung dauert lange und verlangt Nachweise.
- **Solo-Selbstständige:** Rund 3,5 Millionen im Haupterwerb (Eurostat, 2025). Todoist, TickTick und Things sind stark und günstig, und alle haben Handy-Apps.

### Die Empfehlung

**Kleine Digitalteams mit 2–15 Personen:** Web- und Softwareagenturen, Entwicklerteams, IT-Dienstleister.

So begründest du es:

- Die beiden bestbewerteten Segmente überschneiden sich genau dort.
- Das Produkt passt für sie schon heute, ohne dass erst eine deutsche Oberfläche oder eine App gebaut werden muss.
- Klassische Werbeagenturen gehören nicht dazu, weil sie Zeiterfassung und Abrechnung erwarten und bei awork gut bedient sind.
- Vereine wären ein zweiter Schritt, sobald es eine deutsche Oberfläche gibt.

Typische Person (ein Beispiel, kein echter Kunde): technische Leitung eines Web-Studios mit acht Leuten.
Aufgaben kommen aus Kundenanrufen, Chat und Code-Reviews. Ein Ticketsystem ist dem Team zu schwer, eine
geteilte Notiz zu chaotisch. Kundendaten sollen nicht bei einem US-Anbieter liegen.

Kernbotschaft: **„Aufgabe eintippen. Enter. Weiterarbeiten.“**

Ehrlich dazusagen: Die Abstände sind klein (8 bis 11 Punkte). Wenn Axel ein Kriterium anders gewichtet,
kann die Reihenfolge kippen. Mit echten Nutzern hat niemand gesprochen.

### Die offene Frage: Womit verdienen wir?

Axel fragt, an wen wir „verkaufen“. Wenn das Produkt kostenlos und quelloffen bleibt, braucht das ein
anderes Modell. Drei Optionen zur Diskussion (Vorschläge, nicht recherchiert):

1. Gehostete Instanz mit kostenpflichtigem Team-Tarif, Selbst-Hosting bleibt frei.
2. Einrichtung, Betrieb und Support für Firmen, die selbst hosten wollen.
3. Kostenloser Einstieg, der Kunden zu anderen Produkten wie Cosmos führt.

---

## Teil 3: Webseite mit unserem Template (20 min)

### Was gebaut wurde

Derselbe Inhalt in zwei Fassungen, beide auf dem Branch `feat/landing-page`, committet und gepusht.

| Fassung                         | Ort                                                                  | Technik                              |
| ------------------------------- | -------------------------------------------------------------------- | ------------------------------------ |
| Eigenständige Seite im Template | `website/`                                                           | Nuxt 4, Nuxt UI 4, Tailwind 4        |
| Startseite in der App           | `resources/js/pages/Welcome.vue`, `resources/js/components/landing/` | Vue 3, Inertia, Theme-Farben der App |

Das Template ist das Nuxt-UI-Starter-Template, auf dem auch `cosmos/frontend` basiert.

### So führst du es vor

1. Tab mit oneclicktask.com zeigen: „So sieht es heute aus.“
2. Tab mit localhost:3000 zeigen: „So sieht der Entwurf aus.“
3. In die Demo im Hero tippen: `Changelog schreiben #release`, Enter drücken. Die Aufgabe erscheint oben.
4. Auf den Hashtag `#release` klicken: Die Liste filtert. „Das ist das Alleinstellungsmerkmal, direkt zum Anfassen statt beschrieben.“
5. Runterscrollen und die Abschnitte nennen: vier Kernfunktionen, Team-Funktionen, Open Source und Datenschutz, FAQ, Abschluss.
6. Oben rechts den Dark Mode umschalten.
7. Fenster schmal ziehen: Handy-Ansicht mit Menü.
8. Auf „Kostenlos starten“ klicken: führt zur Registrierung der App.

### Was sich inhaltlich geändert hat

- Deutsch in Du-Form statt Englisch.
- Ein Nutzenversprechen statt einer Beschreibung, zugeschnitten auf Web- und Entwicklerteams.
- Team-Funktionen, Selbst-Hosting und „kostenlos“ werden genannt.
- Die FAQ sagt offen, dass die Oberfläche Englisch ist und es keine Handy-App gibt.
- Technik-Logos und Füll-Sektionen sind weg, die Footer-Links funktionieren.

### Christians Regeln

Quelle: `AGENTS.md` und `cosmos_docs/agent-harness/` im Repo `cosmos/new_repos/cosmos`, dazu die CI von `cosmos/frontend`.

| Regel                                       | Stand                                                                  |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| Lint und Typprüfung bei jedem Push          | eingerichtet, der Workflow für `website/` ist auf GitHub grün gelaufen |
| Maximal 400 Zeilen pro Datei                | eingehalten, größte neue Datei hat rund 180 Zeilen                     |
| Keine KI-Signatur in Commits                | eingehalten                                                            |
| Kein Commit auf `main`                      | eingehalten, eigener Branch                                            |
| Keine neue Geschäftslogik ohne Test         | nicht betroffen, es sind nur Inhalt und Gestaltung                     |
| Commit-Präfix mit Jira-Ticket               | nicht eingehalten, es gab keine Ticketnummer                           |
| Branch-Name `feature/<TICKET>-beschreibung` | nicht eingehalten, der Branch heißt `feat/landing-page`                |

Sag die zwei Abweichungen von dir aus an und frag, ob die Cosmos-Regeln für dieses Repo überhaupt gelten sollen.

### Bekannte Schwächen des Entwurfs

- Bei 320 px Breite ragt der Header leicht über den Rand.
- Die Nuxt-Seite schreibt die Adresse der App beim Build fest.
- Das Template liefert Nuxt 4.6.0, das unter Windows nicht rendert; die Seite nutzt 4.6.1.
- Es gibt noch keine englische Fassung, obwohl sie für die Zielgruppe sinnvoll wäre.
- Die bestehenden Lint- und Test-Workflows des Repos sind für den Branch nicht gelaufen. Lokal bestehen 47 Feature- und Unit-Tests; die Browser-Tests wurden nicht ausgeführt.

---

## Teil 4: Demo und Next Steps (15 min)

### Was Axel entscheiden muss

1. **Annahmen:** Kostenlos, Open Source, EU-Hosting: stimmt das alles?
2. **Zielgruppe:** Einverstanden mit kleinen Digitalteams?
3. **Erlösmodell:** Welche der drei Optionen, oder eine andere?
4. **Zwei Fassungen:** Bleibt die Startseite in der App, oder wird nur die eigenständige Seite gepflegt? Unter welcher Domain läuft sie?

### Blocker vor einer Veröffentlichung

| Punkt            | Befund                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| Impressum        | fehlt, die Firmendaten sind nicht bekannt                                                                  |
| Datenschutzseite | enthält Platzhalter und ist auf Englisch                                                                   |
| Lizenz           | `composer.json` nennt MIT, aber es gibt keine `LICENSE`-Datei; die Webseite sagt deshalb nur „Open Source“ |

### Weitere Funde

- **PostHog** läuft über den US-Host. Das passt schlecht zu „in der EU gehostet“; es gibt auch eine EU-Instanz.
- **Pint** (PHP-Format) schlägt lokal in sieben Dateien fehl, die nicht Teil dieser Arbeit sind.
- **Kein `README.md`:** Die Installationsanleitung steht in `product-overview.md`.
- **Alte Bilder:** rund 3 MB in `public/images/landing/` werden von der neuen Startseite nicht mehr verwendet.

### Vorgeschlagene Reihenfolge

1. Annahmen, Zielgruppe und Erlösmodell entscheiden.
2. Entscheiden, welche Fassung der Webseite weiterverfolgt wird.
3. Impressum, Datenschutzseite und `LICENSE` ergänzen.
4. PostHog auf die EU-Instanz umstellen.
5. Merge Request anlegen und mergen.
6. Danach fein: Preise auf den Anbieterseiten gegenprüfen, mit zwei bis drei Teams sprechen, englische Fassung.
7. Dasselbe Vorgehen für Cosmos wiederholen.

---

## Wenn Axel nachfragt

| Frage                                                           | Antwort                                                                                                                      |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Warum nicht Einzelnutzer?                                       | Dort sind Todoist, TickTick und Things stark und günstig, und alle haben Handy-Apps. Ohne App ist das schwer zu gewinnen.    |
| Warum nicht Handwerk, das sind doch über eine Million Betriebe? | Sie brauchen eine Handy-App für die Baustelle, und Branchenlösungen wie Craftnote sind etabliert.                            |
| Warum nicht alle Agenturen?                                     | Klassische Agenturen erwarten Zeiterfassung und Abrechnung. awork bietet das, hostet in Deutschland und zielt genau auf sie. |
| Was ist mit Vikunja?                                            | Der direkteste Konkurrent. Kann mehr, wirkt aber schwerer. Unser Argument ist Tempo und Einfachheit.                         |
| Wie belastbar sind die Preise?                                  | Grob. Sie stammen aus Vergleichsportalen und müssen vor einer Verwendung nach außen gegengeprüft werden.                     |
| Wie belastbar ist die Zielgruppe?                               | Eine begründete Einschätzung aus Produkt und Recherche, ohne Kundengespräche.                                                |
| Warum zwei Fassungen der Webseite?                              | Die erste entstand in der App, bevor das Template gefunden war. Der Inhalt ist identisch, eine davon kann weg.               |
| Warum steht „in der EU gehostet“ nicht mehr ganz oben?          | Weil es noch nicht bestätigt ist und PostHog über die USA läuft. „Selbst hostbar“ ist belegbar.                              |

## Quellen

Vergleichsportale, Blogs, Verbands- und Amtsstatistiken, abgerufen am 11.10.2026.

Markt:

- [unstar.app – To-do-Apps im Vergleich 2026](https://unstar.app/de/blog/todoist-ticktick-things-3-microsoft-todo-apple-reminders-todo-apps-ranked-2026)
- [TechRepublic – TickTick vs. Things 3](https://www.techrepublic.com/de/article/ticktick-vs-things-3/)
- [toolradar – TickTick Pricing](https://toolradar.com/tools/ticktick/pricing)
- [Super Productivity – Open-Source-Task-Apps 2026](https://super-productivity.com/blog/open-source-productivity-apps-comparison/)
- [selfhosting.sh – Self-Hosted Task Management](https://selfhosting.sh/best/task-management/)
- [OMR Reviews – Task Management](https://omr.com/de/reviews/category/task-management)
- [OMR – Projektmanagement-Tools](https://omr.com/de/beste-projektmanagement-tools-fuer-unternehmen/)
- [The Digital Project Manager – MeisterTask Preise](https://thedigitalprojectmanager.com/de/tools/meistertask-preise/)
- [toolsforhumans – ClickUp-Alternativen 2026](https://www.toolsforhumans.ai/alternatives/clickup)
- [wbcomdesigns – ClickUp vs. Trello vs. Asana](https://wbcomdesigns.com/clickup-vs-trello-vs-asana/)

Zielgruppe:

- [ZDH – Betriebe, Beschäftigte, Umsätze im Handwerk](https://www.zdh.de/daten-und-fakten/betriebe/beschaeftigte/umsaetze/)
- [Bitkom und ZDH – Digitalisierung im Handwerk](https://www.bitkom.org/print/pdf/node/25019)
- [ZiviZ-Survey 2023 – eingetragene Vereine](https://www.land.nrw/pressemitteilung/ziviz-survey-2023-zahl-der-eingetragenen-vereine-nordrhein-westfalen-waechst)
- [ING – Unternehmensgrößen in Deutschland](https://www.ing.de/ueber-uns/presse/carsten-brzeskis-blog/chart-of-the-week-2022-10-07-immer-auf-die-kleinen/)
- [Bundestag – Solo-Selbstständige 2016–2025](https://dserver.bundestag.de/btd/21/066/2106666.pdf)
- [ki-syndikat – awork: Zielgruppe und Preise](https://www.ki-syndikat.de/tools/awork/)
- [OMR – Agentursoftware im Vergleich](https://omr.com/de/reviews/contenthub/beste-agentursoftware)
- [SoftGuide – Ausschreibung einer Agentur](https://www.softguide.de/ausschreibungen/werbe-und-marketingagentur-sucht-projektmanagementsoftware)
- [borncity – openDesk Edu für 8.600 Schulen](https://borncity.com/news/opendesk-edu-bund-integriert-open-source-tools-fuer-8-600-schulen/)
