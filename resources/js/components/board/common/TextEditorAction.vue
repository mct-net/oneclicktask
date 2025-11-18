<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

defineProps({
    isActive: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <button
        :class="[
            twMerge(
                'flex h-8 w-8 items-center justify-center rounded-md',
                ($attrs.class as string) || '',
            ),
            isActive ? 'bg-contrast text-primary-foreground' : 'border',
        ]"
    >
        <slot />
    </button>
</template>
