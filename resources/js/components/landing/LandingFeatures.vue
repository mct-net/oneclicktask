<script setup lang="ts">
import { Clock3, Hash, MousePointerClick, Zap } from 'lucide-vue-next';

const features = [
    {
        icon: Zap,
        title: 'Ein Feld für alles',
        description:
            'Das Eingabefeld ist beim Öffnen sofort aktiv. Tippen sucht in deinen Aufgaben, Enter legt eine neue an.',
    },
    {
        icon: Hash,
        title: 'Hashtags statt Ordner',
        description:
            'Schreib #bug oder #kunde in die Aufgabe. Der Hashtag wird erkannt und filtert die Liste mit einem Klick.',
    },
    {
        icon: MousePointerClick,
        title: 'Ein Klick pro Aktion',
        description:
            'Stern, Wichtig-Flagge, Farbe, Status, Backlog oder Papierkorb: alles direkt an der Aufgabe, ohne Dialog.',
    },
    {
        icon: Clock3,
        title: 'Fälligkeit in Sekunden',
        description:
            'Fünf Minuten, eine Stunde, ein Tag, eine Woche: Fristen setzt du über feste Schritte statt über einen Kalender.',
    },
];
</script>

<template>
    <section id="funktionen" class="scroll-mt-20 bg-card px-5 py-16 md:py-24">
        <div class="mx-auto w-full max-w-6xl">
            <div class="max-w-2xl">
                <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                    Gebaut für den Moment, in dem dir etwas einfällt
                </h2>
                <p class="mt-4 text-lg text-muted-foreground">
                    Viele Tools verlangen Projekt, Spalte, Verantwortliche und
                    Datum, bevor eine Aufgabe überhaupt existiert. Hier steht
                    sie nach einem Tastendruck in der Liste. Details kommen
                    später, wenn du sie brauchst.
                </p>
            </div>

            <ul class="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                <li v-for="feature in features" :key="feature.title">
                    <component :is="feature.icon" class="size-6" />
                    <h3 class="mt-3 text-lg font-semibold">
                        {{ feature.title }}
                    </h3>
                    <p class="mt-1.5 text-muted-foreground">
                        {{ feature.description }}
                    </p>
                </li>
            </ul>

            <figure class="mt-14">
                <img
                    src="/images/landing/oct-dashboard.png"
                    alt="Ein Board in OneClickTask: links die Aufgabenliste mit Eingabefeld und Hashtag-Filtern, rechts die Beschreibung der ausgewählten Aufgabe."
                    width="876"
                    height="566"
                    loading="lazy"
                    class="mx-auto h-auto w-full max-w-4xl rounded-xl"
                />
                <figcaption
                    class="mt-3 text-center text-sm text-muted-foreground"
                >
                    Links die Liste, rechts Beschreibung, Kommentare und Anhänge
                    der ausgewählten Aufgabe.
                </figcaption>
            </figure>
        </div>
    </section>
</template>
