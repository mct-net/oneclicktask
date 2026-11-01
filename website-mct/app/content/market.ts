// Marktvergleich. Fakten laut den offiziellen Seiten der Anbieter, geprüft am 01.11.2026.
// Vergleichende Werbung (§ 6 UWG): Werte nur aus Herstellerangaben, mit Stichtag, regelmäßig neu prüfen.
// Quellen: atlassian.com/de/software/jira/pricing, support.atlassian.com (data residency), trello.com/de/pricing,
// support.atlassian.com/trello (GDPR), asana.com/de/pricing, help.asana.com (data residency),
// clickup.com/de/pricing, clickup.com/contact/dataresidency, todoist.com/de/pricing, todoist.com/security,
// stackfield.com/de/pricing, vikunja.io/pricing, vikunja.io/features, github.com/go-vikunja/app

export type Currency = 'EUR' | 'USD'

export const marketGroups = [{
  title: 'To-do-Apps',
  examples: 'Todoist, TickTick, Things 3, Microsoft To Do',
  text: 'Schnell und gut gemacht, aber vor allem für Einzelne gedacht.',
}, {
  title: 'Projektsoftware',
  examples: 'Jira, Asana, ClickUp, Trello, MeisterTask',
  text: 'Viele Ansichten und Funktionen. Dafür Einrichtung und Kosten pro Person.',
}, {
  title: 'Open Source',
  examples: 'Vikunja, Planka, Kanboard',
  text: 'Frei und selbst hostbar, aber umfangreicher in Betrieb und Bedienung.',
}, {
  title: 'OneClickTask',
  examples: 'Gemeinsame Aufgabenliste',
  text: 'Ein Feld, Hashtags, ein Klick pro Aktion. Kostenlos und in der EU gehostet.',
  us: true,
}]

export const insights = [{
  kicker: 'Am nächsten dran',
  title: 'Vikunja',
  text: 'Ebenfalls frei verfügbar und in der EU gehostet, mit Liste, Kanban, Gantt und Tabelle. Vikunja kann mehr und ist dafür umfangreicher. OneClickTask setzt auf Tempo und eine einzige Liste.',
}, {
  kicker: 'Datenschutz kostet anderswo extra',
  title: 'EU-Hosting ist meist ein Bezahltarif',
  text: 'Jira bietet Datenhaltung in der EU ab dem Standard-Tarif, Asana und ClickUp nur im Enterprise-Tarif. Trello speichert Daten in den USA. Bei OneClickTask ist die EU der Normalfall, ohne Kosten.',
}]

// Günstigster Tarif mit Datenhaltung in der EU. price() liefert den Preis pro Person und Monat.
export const costTools: Array<{
  name: string
  plan: string
  currency: Currency
  price: (size: number) => number
}> = [
  { name: 'OneClickTask', plan: 'kostenlos', currency: 'EUR', price: () => 0 },
  { name: 'Vikunja', plan: 'Cloud Organization', currency: 'EUR', price: () => 5 },
  { name: 'Jira', plan: 'Standard', currency: 'USD', price: () => 8.48 },
  { name: 'Stackfield', plan: 'Starter bis 10, dann Business', currency: 'EUR', price: size => (size <= 10 ? 9 : 14) },
]

export const costWithoutPrice = [
  { name: 'Asana', text: 'EU nur im Enterprise-Tarif, Preis auf Anfrage' },
  { name: 'ClickUp', text: 'EU nur im Enterprise-Tarif, Preis auf Anfrage' },
  { name: 'Trello', text: 'keine Datenhaltung in der EU' },
]

export const costNote = 'Listenpreise pro Person und Monat laut Preisseiten der Anbieter, Stand 1. November 2026. Dollarpreise nicht umgerechnet. Stackfield zzgl. MwSt. Vikunja lässt sich alternativ kostenlos selbst hosten.'

export const compareTools = ['OneClickTask', 'Jira', 'Trello', 'Asana', 'ClickUp', 'Todoist', 'Stackfield', 'Vikunja']

type Cell = boolean | string

export const compareRows: Array<{ label: string, values: Cell[] }> = [
  { label: 'Kostenlos mit Daten in der EU', values: [true, false, false, false, false, 'nicht angegeben', false, 'selbst gehostet'] },
  { label: 'Gratis für 8 Personen', values: [true, true, true, false, true, 'bis 5 pro Projekt', false, 'selbst gehostet'] },
  { label: 'Daten in der EU', values: [true, 'ab Standard', false, 'Enterprise', 'Enterprise', 'nicht angegeben', true, true] },
  { label: 'Quellcode öffentlich', values: [true, false, false, false, false, false, false, true] },
  { label: 'Kanban-Board', values: [false, true, true, true, true, true, true, true] },
  { label: 'Gantt oder Zeitleiste', values: [false, true, 'ab Premium', 'ab Starter', 'ab Core', 'nicht angegeben', true, true] },
  { label: 'Mobile App', values: [false, true, true, true, true, true, true, 'Beta'] },
]

export const marketSource = 'Herstellerangaben laut offiziellen Preis- und Hilfeseiten, Stand 1. November 2026. Ein Strich bedeutet: auf den offiziellen Seiten nicht angeboten.'
