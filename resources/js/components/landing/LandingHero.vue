<script setup lang="ts">
import { Button } from '@/components/core/ui/button';
import LandingCta from '@/components/landing/LandingCta.vue';
import LandingDemo from '@/components/landing/LandingDemo.vue';
import { Github } from 'lucide-vue-next';

defineProps<{
    canRegister: boolean;
    repositoryUrl: string;
}>();
</script>

<template>
    <section class="px-5 pt-14 pb-16 md:pt-20 md:pb-24">
        <div
            class="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14"
        >
            <div>
                <p class="text-sm font-medium text-muted-foreground">
                    Kostenlos · Open Source · Selbst hostbar
                </p>
                <h1
                    class="mt-4 text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
                >
                    Aufgabe eintippen. Enter. Weiterarbeiten.
                </h1>
                <p class="mt-5 max-w-xl text-lg text-muted-foreground">
                    OneClickTask ist die Aufgabenliste für kleine Web- und
                    Entwicklerteams, denen ein Ticketsystem zu schwer und eine
                    geteilte Notiz zu chaotisch ist. Ein Feld zum Suchen und
                    Anlegen, Hashtags zum Sortieren, ein Klick zum Verschieben.
                </p>
                <div class="mt-8 flex flex-wrap items-center gap-3">
                    <LandingCta :can-register="canRegister" />
                    <Button as-child variant="outline" size="lg">
                        <a
                            :href="repositoryUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github />
                            Quellcode ansehen
                        </a>
                    </Button>
                </div>
            </div>

            <LandingDemo />
        </div>
    </section>
</template>
