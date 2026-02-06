<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ToastViewport, type ToastViewportProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<
    ToastViewportProps & {
        class?: HTMLAttributes['class'];
    }
>();
</script>

<template>
    <ToastViewport
        data-slot="toast-viewport"
        :class="
            cn(
                'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]',
                props.class,
            )
        "
    />
</template>
