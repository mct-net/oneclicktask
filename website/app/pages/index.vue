<script setup lang="ts">
const { appUrl, repositoryUrl } = useRuntimeConfig().public

const registerLink = {
  label: 'Kostenlos starten',
  to: `${appUrl}/register`,
  color: 'neutral' as const,
  size: 'xl' as const
}

const features = [{
  icon: 'i-lucide-zap',
  title: 'Ein Feld für alles',
  description: 'Das Eingabefeld ist beim Öffnen sofort aktiv. Tippen sucht in deinen Aufgaben, Enter legt eine neue an.'
}, {
  icon: 'i-lucide-hash',
  title: 'Hashtags statt Ordner',
  description: 'Schreib #bug oder #kunde in die Aufgabe. Der Hashtag wird erkannt und filtert die Liste mit einem Klick.'
}, {
  icon: 'i-lucide-mouse-pointer-click',
  title: 'Ein Klick pro Aktion',
  description: 'Stern, Wichtig-Flagge, Farbe, Status, Backlog oder Papierkorb: alles direkt an der Aufgabe, ohne Dialog.'
}, {
  icon: 'i-lucide-clock-3',
  title: 'Fälligkeit in Sekunden',
  description: 'Fünf Minuten, eine Stunde, ein Tag, eine Woche: Fristen setzt du über feste Schritte statt über einen Kalender.'
}]

const teamFeatures = [{
  icon: 'i-lucide-layout-list',
  title: 'Boards mit Rollen',
  description: 'Ein Board pro Projekt oder Kunde. Du lädst Mitglieder ein und legst fest, wer verwalten darf.'
}, {
  icon: 'i-lucide-user-check',
  title: 'Zuweisen und filtern',
  description: 'Aufgaben gehen an eine Person. Jede sieht mit einem Filter, was bei ihr liegt.'
}, {
  icon: 'i-lucide-message-square',
  title: 'Kommentare an der Aufgabe',
  description: 'Rückfragen stehen dort, wo die Arbeit steht, und nicht in einem Chat-Verlauf von letzter Woche.'
}, {
  icon: 'i-lucide-paperclip',
  title: 'Dateien per Drag & Drop',
  description: 'Zieh einen Screenshot auf das Board und er wird zur Aufgabe. Anhänge sind nur für Mitglieder abrufbar.'
}]

const trustPoints = [{
  icon: 'i-lucide-code-2',
  title: 'Quelloffen',
  description: 'Der gesamte Code liegt auf GitHub. Du kannst nachlesen, was mit euren Daten passiert.'
}, {
  icon: 'i-lucide-server',
  title: 'Selbst hostbar',
  description: 'Ein Dockerfile liegt bei. Wer die Daten im eigenen Haus haben will, betreibt die Anwendung selbst.'
}, {
  icon: 'i-lucide-map-pin',
  title: 'In der EU gehostet',
  description: 'Unsere Instanz läuft auf Servern in der EU. Nutzungsstatistik erfassen wir nur mit deiner Einwilligung.'
}, {
  icon: 'i-lucide-shield-check',
  title: 'Zwei-Faktor-Anmeldung',
  description: 'Konten lassen sich mit einer Authenticator-App und Wiederherstellungscodes absichern.'
}]

const questions = [{
  label: 'Kostet OneClickTask etwas?',
  content: 'Nein. Die Nutzung ist kostenlos, unabhängig davon, wie viele Boards oder Mitglieder ihr habt.'
}, {
  label: 'Für wen ist es gedacht?',
  content: 'Für Webagenturen, Softwarestudios, Entwicklerteams und IT-Dienstleister mit etwa zwei bis fünfzehn Personen. Wer Zeiterfassung, Abrechnung oder Gantt-Diagramme braucht, ist mit einer Projektsoftware besser bedient.'
}, {
  label: 'Worin unterscheidet es sich von Trello oder Todoist?',
  content: 'Es gibt ein einziges Feld zum Suchen und Anlegen und kaum Dialoge. Dazu ist der Code offen und ihr könnt die Anwendung selbst betreiben, was bei beiden nicht geht.'
}, {
  label: 'Kann ich es auf einem eigenen Server betreiben?',
  content: 'Ja. Die Anwendung basiert auf Laravel und Vue, ein Dockerfile liegt im Repository. Die Einrichtung ist im Repository beschrieben.'
}, {
  label: 'In welcher Sprache ist die Oberfläche?',
  content: 'Die Anwendung selbst ist derzeit auf Englisch. Die Bedienung kommt mit wenigen Wörtern aus, eine deutsche Oberfläche gibt es aber noch nicht.'
}, {
  label: 'Gibt es eine App fürs Handy?',
  content: 'Nein, OneClickTask läuft im Browser. Eine eigene App für iOS oder Android gibt es nicht.'
}]
</script>

<template>
  <div>
    <UPageHero
      headline="Kostenlos · Open Source · Selbst hostbar"
      title="Aufgabe eintippen. Enter. Weiterarbeiten."
      description="OneClickTask ist die Aufgabenliste für kleine Web- und Entwicklerteams, denen ein Ticketsystem zu schwer und eine geteilte Notiz zu chaotisch ist. Ein Feld zum Suchen und Anlegen, Hashtags zum Sortieren, ein Klick zum Verschieben."
      orientation="horizontal"
      :links="[registerLink, {
        label: 'Quellcode ansehen',
        to: repositoryUrl,
        target: '_blank',
        icon: 'i-simple-icons-github',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
    >
      <TaskDemo />
    </UPageHero>

    <UPageSection
      id="funktionen"
      title="Gebaut für den Moment, in dem dir etwas einfällt"
      description="Viele Tools verlangen Projekt, Spalte, Verantwortliche und Datum, bevor eine Aufgabe überhaupt existiert. Hier steht sie nach einem Tastendruck in der Liste. Details kommen später, wenn du sie brauchst."
      :features="features"
      :ui="{ features: 'sm:grid-cols-2 lg:grid-cols-2' }"
    >
      <figure>
        <img
          src="/images/oct-dashboard.png"
          alt="Ein Board in OneClickTask: links die Aufgabenliste mit Eingabefeld und Hashtag-Filtern, rechts die Beschreibung der ausgewählten Aufgabe."
          width="876"
          height="566"
          loading="lazy"
          class="mx-auto h-auto w-full max-w-4xl rounded-xl"
        >
        <figcaption class="mt-3 text-center text-sm text-muted">
          Links die Liste, rechts Beschreibung, Kommentare und Anhänge der ausgewählten Aufgabe.
        </figcaption>
      </figure>
    </UPageSection>

    <UPageSection
      id="teams"
      title="Für Teams, denen ein Ticketsystem zu viel ist"
      description="Webagenturen, Softwarestudios und kleine Entwicklerteams brauchen selten Gantt-Diagramme oder Sprint-Boards. Sie brauchen eine gemeinsame Liste, auf die sich alle verlassen."
    >
      <UPageGrid class="lg:grid-cols-2">
        <UPageCard
          v-for="item in teamFeatures"
          :key="item.title"
          v-bind="item"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      id="open-source"
      title="Eure Aufgaben gehören euch"
      description="OneClickTask ist kostenlos und Open Source. Es gibt keinen Preis pro Kopf und keine Funktion hinter einer Bezahlstufe."
      :features="trustPoints"
      :links="[{
        label: 'Auf GitHub ansehen',
        to: repositoryUrl,
        target: '_blank',
        icon: 'i-simple-icons-github',
        color: 'neutral',
        variant: 'subtle'
      }]"
      :ui="{ root: 'bg-elevated/50', features: 'sm:grid-cols-2 lg:grid-cols-4' }"
    />

    <UPageSection
      id="faq"
      title="Häufige Fragen"
    >
      <UAccordion
        :items="questions"
        class="mx-auto w-full max-w-3xl"
      />
    </UPageSection>

    <UPageSection>
      <UPageCTA
        title="Die erste Aufgabe steht in zehn Sekunden"
        description="Konto anlegen, Board benennen, lostippen."
        variant="subtle"
        :links="[registerLink]"
      />
    </UPageSection>
  </div>
</template>
