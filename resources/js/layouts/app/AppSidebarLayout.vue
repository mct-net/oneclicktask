<script setup lang="ts">
import AnalyticsConsentDialog from '@/components/core/AnalyticsConsentDialog.vue';
import AppContent from '@/components/core/AppContent.vue';
import AppShell from '@/components/core/AppShell.vue';
import AppSidebar from '@/components/core/AppSidebar.vue';
import AppSidebarHeader from '@/components/core/AppSidebarHeader.vue';
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from '@/components/core/ui/toast';
import { useAnalytics } from '@/composables/useAnalytics';
import { useToast } from '@/composables/useToast';
import type { AppPageProps, BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/vue3';
import { onMounted } from 'vue';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const { toasts, onOpenChange } = useToast();
const { identify, capture, optIn, optOut } = useAnalytics();
const page = usePage<AppPageProps>();

onMounted(() => {
    if (page.props.auth?.user) {
        if (page.props.auth.user.analytics_consent) {
            optIn();
            identify(page.props.auth.user);
            capture('session_started');
        } else {
            optOut();
        }
    }
});
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

    <AnalyticsConsentDialog />
</template>
