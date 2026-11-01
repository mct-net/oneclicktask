// Texte der Startseite, getrennt vom Layout in pages/index.vue.
// Nur belegte Aussagen: kostenlos (kein Bezahltarif im Code), in der EU gehostet (bestätigt),
// Code öffentlich auf GitHub. "Open Source" erst, wenn eine LICENSE-Datei im Repository liegt.

export const fitsWell = [
  'Webagenturen, Softwarestudios und IT-Dienstleister mit 2 bis 15 Personen',
  'Teams, die Aufgaben schnell erfassen und abhaken wollen, ohne Projektplanung',
  'Teams, die keine Lizenzkosten pro Person zahlen wollen',
  'Teams, deren Aufgaben auf Servern in der EU liegen sollen',
]

export const fitsPoorly = [{
  title: 'Kanban und Gantt',
  text: 'OneClickTask ist eine Liste. Für Spalten und Zeitleisten ist Vikunja oder eine Projektsoftware besser geeignet.',
}, {
  title: 'Mobile App',
  text: 'OneClickTask läuft im Browser. Eine eigene App für iOS oder Android gibt es nicht.',
}, {
  title: 'Deutsche Oberfläche',
  text: 'Menüs und Schaltflächen sind auf Englisch. Aufgaben und Kommentare schreibst du in jeder Sprache.',
}, {
  title: 'Zeiterfassung und Abrechnung',
  text: 'Gibt es nicht. Wer Stunden abrechnet, braucht dafür ein eigenes Tool.',
}]

export const dataPoints = [{
  title: 'Server in der EU',
  text: 'Die Instanz auf oneclicktask.com läuft auf Servern in der EU.',
}, {
  title: 'Statistik nur mit Zustimmung',
  text: 'Nutzungsstatistik wird nur erfasst, wenn du ausdrücklich zustimmst.',
}, {
  title: 'Zwei-Faktor-Anmeldung',
  text: 'Konten lassen sich mit Authenticator-App und Wiederherstellungscodes absichern.',
}, {
  title: 'Anhänge nur für Mitglieder',
  text: 'Dateien an einer Aufgabe kann nur abrufen, wer Mitglied des Boards ist.',
}]

export const questions = [{
  question: 'Was kostet OneClickTask?',
  answer: 'Nichts. Es gibt keinen Bezahltarif und keine Kosten pro Person.',
}, {
  question: 'Für wen ist OneClickTask gedacht?',
  answer: 'Für Teams mit 2 bis 15 Personen, etwa in Webagenturen, Softwarestudios oder bei IT-Dienstleistern. Für Projektplanung mit Abhängigkeiten und Zeitleisten ist es nicht ausgelegt.',
}, {
  question: 'Was unterscheidet OneClickTask von Trello oder Todoist?',
  answer: 'Trello organisiert Aufgaben in Spalten, Todoist ist vor allem eine persönliche Liste. OneClickTask ist eine gemeinsame Liste, in der ein einziges Feld sucht und anlegt.',
}, {
  question: 'Wo werden meine Daten gespeichert?',
  answer: 'Auf Servern in der EU. Dateianhänge sind nur für Mitglieder des jeweiligen Boards abrufbar.',
}, {
  question: 'Was brauche ich für die Registrierung?',
  answer: 'Name, E-Mail-Adresse und Passwort. Eine Kreditkarte ist nicht nötig.',
}, {
  question: 'Ist der Quellcode einsehbar?',
  answer: 'Ja, der Quellcode liegt öffentlich auf GitHub. Dort kannst du auch Fehler melden und Funktionen vorschlagen.',
}]
