<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ToastAction, type ToastActionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<
    ToastActionProps & {
        class?: HTMLAttributes['class'];
    }
>();
</script>

<template>
    <ToastAction
        :alt-text="altText"
        data-slot="toast-action"
        :class="
            cn(
                'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.error]:border-muted/40 hover:bg-secondary group-[.error]:hover:border-destructive/30 group-[.error]:hover:bg-destructive group-[.error]:hover:text-destructive-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none group-[.error]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50',
                props.class,
            )
        "
    >
        <slot />
    </ToastAction>
</template>
