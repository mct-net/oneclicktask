<script setup lang="ts">
import AppContent from '@/components/laravel/AppContent.vue';
import AppShell from '@/components/laravel/AppShell.vue';
import AppSidebar from '@/components/laravel/AppSidebar.vue';
import AppSidebarHeader from '@/components/laravel/AppSidebarHeader.vue';
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '@/components/laravel/ui/toast';
import { useToast } from '@/composables/useToast';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const { toasts, onOpenChange } = useToast();
</script>

<template>
    <ToastProvider>
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" class="overflow-x-hidden">
                <AppSidebarHeader :breadcrumbs="breadcrumbs" />
                <slot />
            </AppContent>
        </AppShell>

        <Toast
            v-for="toast in toasts"
            :key="toast.id"
            :variant="toast.type"
            :duration="toast.duration"
            @update:open="(open) => onOpenChange(toast.id, open)"
        >
            <div class="flex flex-col">
                <ToastTitle>{{
                    toast.type
                        ? toast.type.charAt(0).toUpperCase() +
                          toast.type.slice(1)
                        : 'Notification'
                }}</ToastTitle>
                <ToastDescription>{{ toast.message }}</ToastDescription>
            </div>
            <ToastClose />
        </Toast>
        <ToastViewport />
    </ToastProvider>
</template>
