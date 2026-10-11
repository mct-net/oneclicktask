<script setup lang="ts">
import { index as boardsIndex } from '@/actions/App/Http/Controllers/BoardController';
import type { ButtonVariants } from '@/components/core/ui/button';
import { Button } from '@/components/core/ui/button';
import { login, register } from '@/routes';
import type { AppPageProps } from '@/types';
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        canRegister: boolean;
        size?: ButtonVariants['size'];
    }>(),
    {
        size: 'lg',
    },
);

const page = usePage<AppPageProps>();

const target = computed(() => {
    if (page.props.auth.user) {
        return { href: boardsIndex(), label: 'Zu meinen Boards' };
    }

    if (props.canRegister) {
        return { href: register(), label: 'Kostenlos starten' };
    }

    return { href: login(), label: 'Anmelden' };
});
</script>

<template>
    <Button as-child :size="size">
        <Link :href="target.href">{{ target.label }}</Link>
    </Button>
</template>
