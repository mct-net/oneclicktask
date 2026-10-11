<script setup lang="ts">
import AppLogoIcon from '@/components/core/AppLogoIcon.vue';
import { Button } from '@/components/core/ui/button';
import LandingCta from '@/components/landing/LandingCta.vue';
import { home, login } from '@/routes';
import type { AppPageProps } from '@/types';
import { Link, usePage } from '@inertiajs/vue3';

defineProps<{
    canRegister: boolean;
}>();

const page = usePage<AppPageProps>();

const sections = [
    { href: '#funktionen', label: 'Funktionen' },
    { href: '#teams', label: 'Für Teams' },
    { href: '#open-source', label: 'Open Source' },
    { href: '#faq', label: 'FAQ' },
];
</script>

<template>
    <header
        class="sticky top-0 z-20 border-b border-border bg-background/90 px-5 py-3 backdrop-blur"
    >
        <div
            class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4"
        >
            <Link :href="home()" class="flex items-center gap-2 font-semibold">
                <AppLogoIcon class="size-7 text-foreground" />
                <span>OneClickTask</span>
            </Link>

            <nav
                aria-label="Seitenabschnitte"
                class="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
            >
                <a
                    v-for="section in sections"
                    :key="section.href"
                    :href="section.href"
                    class="transition hover:text-foreground"
                >
                    {{ section.label }}
                </a>
            </nav>

            <div class="flex items-center gap-2">
                <Button
                    v-if="!page.props.auth.user && canRegister"
                    as-child
                    variant="ghost"
                    size="sm"
                    class="hidden sm:inline-flex"
                >
                    <Link :href="login()">Anmelden</Link>
                </Button>
                <LandingCta :can-register="canRegister" size="sm" />
            </div>
        </div>
    </header>
</template>
