<script setup lang="ts">
import { Button } from '@/components/core/ui/button';
import { Github } from 'lucide-vue-next';

defineProps<{
    repositoryUrl: string;
}>();

const teamFeatures = [
    {
        title: 'Boards mit Rollen',
        description:
            'Ein Board pro Projekt oder Kunde. Du lädst Mitglieder ein und legst fest, wer verwalten darf.',
    },
    {
        title: 'Zuweisen und filtern',
        description:
            'Aufgaben gehen an eine Person. Jede sieht mit einem Filter, was bei ihr liegt.',
    },
    {
        title: 'Kommentare an der Aufgabe',
        description:
            'Rückfragen stehen dort, wo die Arbeit steht, und nicht in einem Chat-Verlauf von letzter Woche.',
    },
    {
        title: 'Dateien per Drag & Drop',
        description:
            'Zieh einen Screenshot auf das Board und er wird zur Aufgabe. Anhänge sind nur für Mitglieder abrufbar.',
    },
];

const trustPoints = [
    {
        title: 'Quelloffen',
        description:
            'Der gesamte Code liegt auf GitHub. Du kannst nachlesen, was mit euren Daten passiert.',
    },
    {
        title: 'Selbst hostbar',
        description:
            'Ein Dockerfile liegt bei. Wer die Daten im eigenen Haus haben will, betreibt die Anwendung selbst.',
    },
    {
        title: 'In der EU gehostet',
        description:
            'Unsere Instanz läuft auf Servern in der EU. Nutzungsstatistik erfassen wir nur mit deiner Einwilligung.',
    },
    {
        title: 'Zwei-Faktor-Anmeldung',
        description:
            'Konten lassen sich mit einer Authenticator-App und Wiederherstellungscodes absichern.',
    },
];
</script>

<template>
    <section id="teams" class="scroll-mt-20 px-5 py-16 md:py-24">
        <div class="mx-auto w-full max-w-6xl">
            <div class="max-w-2xl">
                <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                    Für Teams, denen ein Ticketsystem zu viel ist
                </h2>
                <p class="mt-4 text-lg text-muted-foreground">
                    Webagenturen, Softwarestudios und kleine Entwicklerteams
                    brauchen selten Gantt-Diagramme oder Sprint-Boards. Sie
                    brauchen eine gemeinsame Liste, auf die sich alle verlassen.
                </p>
            </div>

            <dl class="mt-12 grid gap-4 sm:grid-cols-2">
                <div
                    v-for="item in teamFeatures"
                    :key="item.title"
                    class="rounded-xl border border-border bg-card p-6"
                >
                    <dt class="text-lg font-semibold">{{ item.title }}</dt>
                    <dd class="mt-1.5 text-muted-foreground">
                        {{ item.description }}
                    </dd>
                </div>
            </dl>
        </div>
    </section>

    <section
        id="open-source"
        class="scroll-mt-20 bg-primary px-5 py-16 text-primary-foreground md:py-24"
    >
        <div class="mx-auto w-full max-w-6xl">
            <div class="max-w-2xl">
                <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                    Eure Aufgaben gehören euch
                </h2>
                <p class="mt-4 text-lg opacity-80">
                    OneClickTask ist kostenlos und Open Source. Es gibt keinen
                    Preis pro Kopf und keine Funktion hinter einer Bezahlstufe.
                </p>
            </div>

            <dl
                class="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
            >
                <div v-for="point in trustPoints" :key="point.title">
                    <dt class="font-semibold">{{ point.title }}</dt>
                    <dd class="mt-1.5 text-sm opacity-80">
                        {{ point.description }}
                    </dd>
                </div>
            </dl>

            <Button as-child variant="secondary" size="lg" class="mt-10">
                <a
                    :href="repositoryUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Github />
                    Auf GitHub ansehen
                </a>
            </Button>
        </div>
    </section>
</template>
