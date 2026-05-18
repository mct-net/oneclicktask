<script setup lang="ts">
import Breadcrumbs from '@/components/core/Breadcrumbs.vue';
import { Button } from '@/components/core/ui/button';
import { SidebarTrigger } from '@/components/core/ui/sidebar';
import { useAppearance } from '@/composables/useAppearance';
import type { BreadcrumbItemType } from '@/types';
import { Monitor, Moon, Sun } from 'lucide-vue-next';

withDefaults(
    defineProps<{
        breadcrumbs?: BreadcrumbItemType[];
    }>(),
    {
        breadcrumbs: () => [],
    },
);

const { appearance, updateAppearance } = useAppearance();

const appearanceOptions = [
    { value: 'light', label: 'Light mode', icon: Sun },
    { value: 'dark', label: 'Dark mode', icon: Moon },
    { value: 'system', label: 'System theme', icon: Monitor },
] as const;
</script>

<template>
    <header
        data-testid="app-header"
        class="group/header mb-4 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4"
    >
        <div
            data-testid="app-header-breadcrumbs"
            class="flex min-w-0 items-center gap-2"
        >
            <SidebarTrigger class="-ml-1" />
            <template v-if="breadcrumbs && breadcrumbs.length > 0">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </template>
        </div>
        <div
            data-testid="appearance-toggle"
            class="pointer-events-none flex translate-x-2 items-center rounded-full border border-sidebar-border/80 bg-background/90 p-1 opacity-0 shadow-xs transition-all duration-200 group-focus-within/header:pointer-events-auto group-focus-within/header:translate-x-0 group-focus-within/header:opacity-100 group-hover/header:pointer-events-auto group-hover/header:translate-x-0 group-hover/header:opacity-100"
        >
            <Button
                v-for="option in appearanceOptions"
                :key="option.value"
                variant="ghost"
                size="icon"
                class="size-8 rounded-full"
                :class="
                    appearance === option.value
                        ? 'bg-accent text-foreground'
                        : 'text-muted-foreground'
                "
                :aria-label="option.label"
                @click="updateAppearance(option.value)"
            >
                <component :is="option.icon" class="size-4" />
            </Button>
        </div>
    </header>
</template>
