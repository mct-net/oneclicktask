<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
    variant: {
        type: String as PropType<'default' | 'contrast' | 'error'>,
        default: 'default',
    },
});
</script>

<template>
    <li
        class="rounded-md px-1.5 py-1 leading-none"
        :class="{
            'border bg-surface': variant === 'default',
            'text-on-contrast border border-transparent bg-contrast':
                variant === 'contrast',
            'border border-error bg-error text-error': variant === 'error',
        }"
    >
        <slot />
    </li>
</template>
