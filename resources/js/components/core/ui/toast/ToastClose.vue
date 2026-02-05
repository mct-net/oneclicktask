<script setup lang="ts">
import { cn } from '@/lib/utils';
import { X } from 'lucide-vue-next';
import { ToastClose, type ToastCloseProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<
    ToastCloseProps & {
        class?: HTMLAttributes['class'];
    }
>();
</script>

<template>
    <ToastClose
        data-slot="toast-close"
        :class="
            cn(
                'absolute top-2 right-2 rounded-md p-1 text-foreground/50 transition-opacity hover:text-foreground focus:ring-2 focus:ring-offset-0 focus:outline-none',
                props.class,
            )
        "
    >
        <X class="h-4 w-4" />
    </ToastClose>
</template>
