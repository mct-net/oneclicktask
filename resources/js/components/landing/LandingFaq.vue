<script setup lang="ts">
import LandingCta from '@/components/landing/LandingCta.vue';

defineProps<{
    canRegister: boolean;
}>();

const questions = [
    {
        question: 'Kostet OneClickTask etwas?',
        answer: 'Nein. Die Nutzung ist kostenlos, unabhängig davon, wie viele Boards oder Mitglieder ihr habt.',
    },
    {
        question: 'Für wen ist es gedacht?',
        answer: 'Für Webagenturen, Softwarestudios, Entwicklerteams und IT-Dienstleister mit etwa zwei bis fünfzehn Personen. Wer Zeiterfassung, Abrechnung oder Gantt-Diagramme braucht, ist mit einer Projektsoftware besser bedient.',
    },
    {
        question: 'Worin unterscheidet es sich von Trello oder Todoist?',
        answer: 'Es gibt ein einziges Feld zum Suchen und Anlegen und kaum Dialoge. Dazu ist der Code offen und ihr könnt die Anwendung selbst betreiben, was bei beiden nicht geht.',
    },
    {
        question: 'Kann ich es auf einem eigenen Server betreiben?',
        answer: 'Ja. Die Anwendung basiert auf Laravel und Vue, ein Dockerfile liegt im Repository. Die Einrichtung ist im Repository beschrieben.',
    },
    {
        question: 'In welcher Sprache ist die Oberfläche?',
        answer: 'Die Anwendung selbst ist derzeit auf Englisch. Die Bedienung kommt mit wenigen Wörtern aus, eine deutsche Oberfläche gibt es aber noch nicht.',
    },
    {
        question: 'Gibt es eine App fürs Handy?',
        answer: 'Nein, OneClickTask läuft im Browser. Eine eigene App für iOS oder Android gibt es nicht.',
    },
];
</script>

<template>
    <section id="faq" class="scroll-mt-20 bg-card px-5 py-16 md:py-24">
        <div class="mx-auto w-full max-w-3xl">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                Häufige Fragen
            </h2>

            <div class="mt-8 divide-y divide-border border-y border-border">
                <details
                    v-for="item in questions"
                    :key="item.question"
                    class="group py-4"
                >
                    <summary
                        class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden"
                    >
                        {{ item.question }}
                        <span
                            aria-hidden="true"
                            class="text-xl leading-none text-muted-foreground transition group-open:rotate-45"
                        >
                            +
                        </span>
                    </summary>
                    <p class="mt-2 text-muted-foreground">{{ item.answer }}</p>
                </details>
            </div>
        </div>
    </section>

    <section class="px-5 py-16 text-center md:py-24">
        <h2
            class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
            Die erste Aufgabe steht in zehn Sekunden
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Konto anlegen, Board benennen, lostippen.
        </p>
        <div class="mt-8">
            <LandingCta :can-register="canRegister" />
        </div>
    </section>
</template>
