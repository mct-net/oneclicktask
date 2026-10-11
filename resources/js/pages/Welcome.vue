<script setup lang="ts">
import LandingFaq from '@/components/landing/LandingFaq.vue';
import LandingFeatures from '@/components/landing/LandingFeatures.vue';
import LandingFooter from '@/components/landing/LandingFooter.vue';
import LandingHeader from '@/components/landing/LandingHeader.vue';
import LandingHero from '@/components/landing/LandingHero.vue';
import LandingTeams from '@/components/landing/LandingTeams.vue';
import { Head } from '@inertiajs/vue3';

withDefaults(
    defineProps<{
        canRegister: boolean;
    }>(),
    {
        canRegister: true,
    },
);

const repositoryUrl = 'https://github.com/mct-net/oneclicktask';
const description =
    'OneClickTask ist die kostenlose Open-Source-Aufgabenliste für kleine Web- und Entwicklerteams: ein Feld zum Suchen und Anlegen, Hashtags als Filter, selbst hostbar.';
</script>

<template>
    <Head title="Die schnelle Aufgabenliste für Web- und Entwicklerteams">
        <meta
            head-key="description"
            name="description"
            :content="description"
        />
        <meta
            head-key="og:title"
            property="og:title"
            content="OneClickTask – Die schnelle Aufgabenliste für Web- und Entwicklerteams"
        />
        <meta
            head-key="og:description"
            property="og:description"
            :content="description"
        />
    </Head>

    <div lang="de" class="min-h-screen bg-background text-foreground">
        <LandingHeader :can-register="canRegister" />
        <main>
            <LandingHero
                :can-register="canRegister"
                :repository-url="repositoryUrl"
            />
            <LandingFeatures />
            <LandingTeams :repository-url="repositoryUrl" />
            <LandingFaq :can-register="canRegister" />
        </main>
        <LandingFooter :repository-url="repositoryUrl" />
    </div>
</template>
