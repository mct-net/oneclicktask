<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ToastTitle, type ToastTitleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<
    ToastTitleProps & {
        class?: HTMLAttributes['class'];
    }
>();
</script>

<template>
    <ToastTitle
        data-slot="toast-title"
        :class="cn('text-sm font-semibold', props.class)"
    >
        <slot />
    </ToastTitle>
</template>
