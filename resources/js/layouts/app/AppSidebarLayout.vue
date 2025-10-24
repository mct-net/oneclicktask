<script setup lang="ts">
import AppContent from '@/components/laravel/AppContent.vue';
import AppShell from '@/components/laravel/AppShell.vue';
import AppSidebar from '@/components/laravel/AppSidebar.vue';
import AppSidebarHeader from '@/components/laravel/AppSidebarHeader.vue';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <AppShell variant="sidebar">
        <AppSidebar />
        <AppContent variant="sidebar" class="overflow-x-hidden">
            <AppSidebarHeader :breadcrumbs="breadcrumbs" />
            <slot />
        </AppContent>
    </AppShell>
</template>
