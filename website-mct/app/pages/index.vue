<template>
  <div>
    <HeroSection />

    <PageSection
      id="funktionen"
      title="So funktioniert OneClickTask."
      description="Erfassen, zuordnen, terminieren, abarbeiten. Jeder Schritt passiert direkt in der Liste."
    >
      <TaskLifecycle />
    </PageSection>

    <PageSection
      id="team"
      title="Zusammenarbeit im Team."
      description="Ein Board pro Kunde oder Projekt, mit Rollen, Zuständigkeiten und Kommentaren an jeder Aufgabe."
      surface
    >
      <TeamSection />
    </PageSection>

    <PageSection
      id="vergleich"
      title="Der Markt ist voll. Die Ecke oben links ist leer."
      description="Wir haben 14 Aufgaben- und Projekttools verglichen. Einfach und frei zugleich ist bisher nur OneClickTask."
    >
      <MarketComparison />
    </PageSection>

    <PageSection
      id="fuer-wen"
      title="Für wen OneClickTask gedacht ist."
      description="Eine gemeinsame Aufgabenliste, kein Projektmanagement-System. Das passt nicht zu jedem Team."
      surface
    >
      <AudienceFit />
    </PageSection>

    <DataSection />

    <PageSection id="faq" title="Häufige Fragen.">
      <FaqList :items="questions" />
    </PageSection>

    <ClosingSection />
  </div>
</template>

<script setup lang="ts">
import { questions } from '~/content/landing'

definePageMeta({ public: true })

const title = 'OneClickTask – Gemeinsame Aufgabenliste für kleine Teams'
const description = 'Ein Feld zum Suchen und Anlegen, Hashtags statt Ordner, ein Klick pro Aktion. Kostenlos und in der EU gehostet, für Teams mit 2 bis 15 Personen.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
})
</script>
