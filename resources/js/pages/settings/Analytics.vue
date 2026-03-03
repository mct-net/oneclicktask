<script setup lang="ts">
import { Head, useForm, usePage } from '@inertiajs/vue3';

import HeadingSmall from '@/components/core/HeadingSmall.vue';
import { Checkbox } from '@/components/core/ui/checkbox';
import { Label } from '@/components/core/ui/label';
import { useAnalytics } from '@/composables/useAnalytics';
import type { AppPageProps, BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { edit, update } from '@/routes/analytics';

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Analytics settings',
        href: edit().url,
    },
];

const page = usePage<AppPageProps>();
const { optIn, optOut } = useAnalytics();

const form = useForm({
    analytics_consent: page.props.auth.user.analytics_consent,
});

function toggle(value: boolean | 'indeterminate') {
    if (value === 'indeterminate') return;
    const checked = value;
    form.analytics_consent = checked;

    if (checked) {
        optIn();
    } else {
        optOut();
    }

    form.patch(update().url, {
        preserveScroll: true,
    });
}
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Analytics settings" />

        <SettingsLayout>
            <div class="space-y-6">
                <HeadingSmall
                    title="Analytics settings"
                    description="Manage your usage data sharing preferences"
                />
                <div class="flex items-start space-x-3">
                    <Checkbox
                        id="analytics-consent"
                        :model-value="form.analytics_consent"
                        @update:model-value="toggle"
                    />
                    <div class="space-y-1">
                        <Label
                            for="analytics-consent"
                            class="text-sm font-medium"
                        >
                            Help improve the app by sharing anonymous usage data
                        </Label>
                        <p class="text-sm text-muted-foreground">
                            When enabled, we collect anonymous usage data to
                            help improve the product. No personal content is
                            ever shared. You can change this at any time.
                        </p>
                    </div>
                </div>
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
