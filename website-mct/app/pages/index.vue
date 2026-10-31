<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="hero-headline">Kostenlos · Open Source · Selbst hostbar</p>
          <h1 class="hero-title">Aufgabe eintippen. Enter. Weiterarbeiten.</h1>
          <p class="hero-description">
            OneClickTask ist die Aufgabenliste für kleine Web- und Entwicklerteams, denen ein Ticketsystem
            zu schwer und eine geteilte Notiz zu chaotisch ist. Ein Feld zum Suchen und Anlegen, Hashtags
            zum Sortieren, ein Klick zum Verschieben.
          </p>
          <div class="btn-group hero-links">
            <a :href="registerUrl" class="btn btn-lg btn-solid">Kostenlos starten</a>
            <a :href="repositoryUrl" target="_blank" rel="noopener" class="btn btn-lg btn-subtle">
              <GithubIcon class="icon" />
              Quellcode ansehen
            </a>
          </div>
        </div>
        <TaskDemo />
      </div>
    </section>

    <PageSection
      id="funktionen"
      title="Gebaut für den Moment, in dem dir etwas einfällt"
      description="Viele Tools verlangen Projekt, Spalte, Verantwortliche und Datum, bevor eine Aufgabe überhaupt existiert. Hier steht sie nach einem Tastendruck in der Liste. Details kommen später, wenn du sie brauchst."
    >
      <FeatureList :items="features" />
      <figure class="screenshot">
        <img
          src="/images/oct-dashboard.png"
          alt="Ein Board in OneClickTask: links die Aufgabenliste mit Eingabefeld und Hashtag-Filtern, rechts die Beschreibung der ausgewählten Aufgabe."
          width="876"
          height="566"
          loading="lazy"
        >
        <figcaption>Links die Liste, rechts Beschreibung, Kommentare und Anhänge der ausgewählten Aufgabe.</figcaption>
      </figure>
    </PageSection>

    <PageSection
      id="teams"
      title="Für Teams, denen ein Ticketsystem zu viel ist"
      description="Webagenturen, Softwarestudios und kleine Entwicklerteams brauchen selten Gantt-Diagramme oder Sprint-Boards. Sie brauchen eine gemeinsame Liste, auf die sich alle verlassen."
    >
      <FeatureList :items="teamFeatures" variant="card" />
    </PageSection>

    <PageSection
      id="open-source"
      title="Eure Aufgaben gehören euch"
      description="OneClickTask ist kostenlos und Open Source. Es gibt keinen Preis pro Kopf und keine Funktion hinter einer Bezahlstufe."
      tinted
    >
      <FeatureList :items="trustPoints" :columns="4" />
      <div class="section-links">
        <a :href="repositoryUrl" target="_blank" rel="noopener" class="btn btn-subtle">
          <GithubIcon class="icon" />
          Auf GitHub ansehen
        </a>
      </div>
    </PageSection>

    <PageSection id="faq" title="Häufige Fragen">
      <FaqList :items="questions" />
    </PageSection>

    <PageSection>
      <div class="cta">
        <h2 class="cta-title">Die erste Aufgabe steht in zehn Sekunden</h2>
        <p class="cta-description">Konto anlegen, Board benennen, lostippen.</p>
        <a :href="registerUrl" class="btn btn-lg btn-solid">Kostenlos starten</a>
      </div>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
import {
  Clock3, CodeXml, Hash, LayoutList, MapPin, MessageSquare,
  MousePointerClick, Paperclip, Server, ShieldCheck, UserCheck, Zap,
} from '@lucide/vue'
import type { Feature } from '~/components/FeatureList.vue'

definePageMeta({ public: true })

const { appUrl, repositoryUrl } = useRuntimeConfig().public
const registerUrl = `${appUrl}/register`

const title = 'OneClickTask – Die schnelle Aufgabenliste für Web- und Entwicklerteams'
const description = 'OneClickTask ist die kostenlose Open-Source-Aufgabenliste für kleine Web- und Entwicklerteams: ein Feld zum Suchen und Anlegen, Hashtags als Filter, selbst hostbar.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
})

const features: Feature[] = [{
  icon: Zap,
  title: 'Ein Feld für alles',
  description: 'Das Eingabefeld ist beim Öffnen sofort aktiv. Tippen sucht in deinen Aufgaben, Enter legt eine neue an.',
}, {
  icon: Hash,
  title: 'Hashtags statt Ordner',
  description: 'Schreib #bug oder #kunde in die Aufgabe. Der Hashtag wird erkannt und filtert die Liste mit einem Klick.',
}, {
  icon: MousePointerClick,
  title: 'Ein Klick pro Aktion',
  description: 'Stern, Wichtig-Flagge, Farbe, Status, Backlog oder Papierkorb: alles direkt an der Aufgabe, ohne Dialog.',
}, {
  icon: Clock3,
  title: 'Fälligkeit in Sekunden',
  description: 'Fünf Minuten, eine Stunde, ein Tag, eine Woche: Fristen setzt du über feste Schritte statt über einen Kalender.',
}]

const teamFeatures: Feature[] = [{
  icon: LayoutList,
  title: 'Boards mit Rollen',
  description: 'Ein Board pro Projekt oder Kunde. Du lädst Mitglieder ein und legst fest, wer verwalten darf.',
}, {
  icon: UserCheck,
  title: 'Zuweisen und filtern',
  description: 'Aufgaben gehen an eine Person. Jede sieht mit einem Filter, was bei ihr liegt.',
}, {
  icon: MessageSquare,
  title: 'Kommentare an der Aufgabe',
  description: 'Rückfragen stehen dort, wo die Arbeit steht, und nicht in einem Chat-Verlauf von letzter Woche.',
}, {
  icon: Paperclip,
  title: 'Dateien per Drag & Drop',
  description: 'Zieh einen Screenshot auf das Board und er wird zur Aufgabe. Anhänge sind nur für Mitglieder abrufbar.',
}]

const trustPoints: Feature[] = [{
  icon: CodeXml,
  title: 'Quelloffen',
  description: 'Der gesamte Code liegt auf GitHub. Du kannst nachlesen, was mit euren Daten passiert.',
}, {
  icon: Server,
  title: 'Selbst hostbar',
  description: 'Ein Dockerfile liegt bei. Wer die Daten im eigenen Haus haben will, betreibt die Anwendung selbst.',
}, {
  icon: MapPin,
  title: 'In der EU gehostet',
  description: 'Unsere Instanz läuft auf Servern in der EU. Nutzungsstatistik erfassen wir nur mit deiner Einwilligung.',
}, {
  icon: ShieldCheck,
  title: 'Zwei-Faktor-Anmeldung',
  description: 'Konten lassen sich mit einer Authenticator-App und Wiederherstellungscodes absichern.',
}]

const questions = [{
  question: 'Kostet OneClickTask etwas?',
  answer: 'Nein. Die Nutzung ist kostenlos, unabhängig davon, wie viele Boards oder Mitglieder ihr habt.',
}, {
  question: 'Für wen ist es gedacht?',
  answer: 'Für Webagenturen, Softwarestudios, Entwicklerteams und IT-Dienstleister mit etwa zwei bis fünfzehn Personen. Wer Zeiterfassung, Abrechnung oder Gantt-Diagramme braucht, ist mit einer Projektsoftware besser bedient.',
}, {
  question: 'Worin unterscheidet es sich von Trello oder Todoist?',
  answer: 'Es gibt ein einziges Feld zum Suchen und Anlegen und kaum Dialoge. Dazu ist der Code offen und ihr könnt die Anwendung selbst betreiben, was bei beiden nicht geht.',
}, {
  question: 'Kann ich es auf einem eigenen Server betreiben?',
  answer: 'Ja. Die Anwendung basiert auf Laravel und Vue, ein Dockerfile liegt im Repository. Die Einrichtung ist im Repository beschrieben.',
}, {
  question: 'In welcher Sprache ist die Oberfläche?',
  answer: 'Die Anwendung selbst ist derzeit auf Englisch. Die Bedienung kommt mit wenigen Wörtern aus, eine deutsche Oberfläche gibt es aber noch nicht.',
}, {
  question: 'Gibt es eine App fürs Handy?',
  answer: 'Nein, OneClickTask läuft im Browser. Eine eigene App für iOS oder Android gibt es nicht.',
}]
</script>

<style scoped>
.hero {
  padding-block: 64px;
}

.hero-grid {
  display: grid;
  gap: 48px;
  align-items: center;
}

.hero-headline {
  margin-bottom: 16px;
  color: var(--color-primary);
  font-weight: 600;
}

.hero-title {
  color: var(--color-highlighted);
  font-size: clamp(2.25rem, 7vw + 0.5rem, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.025em;
  overflow-wrap: break-word;
  hyphens: auto;
  text-wrap: pretty;
}

.hero-description {
  margin-top: 24px;
  color: var(--color-muted);
  font-size: 1.125rem;
  text-wrap: pretty;
}

.hero-links {
  margin-top: 40px;
}

.screenshot {
  max-width: 56rem;
  margin: 64px auto 0;
}

.screenshot img {
  width: 100%;
  border-radius: 12px;
}

.screenshot figcaption {
  margin-top: 12px;
  color: var(--color-muted);
  font-size: 0.875rem;
  text-align: center;
}

.section-links {
  display: flex;
  justify-content: center;
  margin-top: 48px;
}

.cta {
  display: grid;
  justify-items: center;
  gap: 24px;
  padding: 48px 24px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--color-elevated) 50%, transparent);
  box-shadow: inset 0 0 0 1px var(--color-accented);
  text-align: center;
}

.cta-title {
  color: var(--color-highlighted);
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.cta-description {
  margin-top: -8px;
  color: var(--color-muted);
  font-size: 1.125rem;
}

@media (min-width: 640px) {
  .hero {
    padding-block: 96px;
  }

  .hero-description {
    font-size: 1.25rem;
    line-height: 2rem;
  }

  .cta {
    padding-block: 96px;
  }

  .cta-title {
    font-size: 2.25rem;
  }
}

@media (min-width: 1024px) {
  .hero {
    padding-block: 128px;
  }

  .hero-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 64px;
  }
}
</style>
