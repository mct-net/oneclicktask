<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ToastDescription, type ToastDescriptionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<
    ToastDescriptionProps & {
        class?: HTMLAttributes['class'];
    }
>();
</script>

<template>
    <ToastDescription
        data-slot="toast-description"
        :class="cn('text-sm opacity-90', props.class)"
    >
        <slot />
    </ToastDescription>
</template>
