<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle2,
    Info,
} from 'lucide-vue-next';
import {
    ToastRoot,
    type ToastRootEmits,
    type ToastRootProps,
    useForwardPropsEmits,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import { toastVariants, type ToastVariants } from '.';

const props = defineProps<
    ToastRootProps & {
        class?: HTMLAttributes['class'];
        variant?: ToastVariants['variant'];
    }
>();

const emits = defineEmits<ToastRootEmits>();

const delegatedProps = computed(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { class: _, variant: __, ...delegated } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const iconComponent = computed(() => {
    switch (props.variant) {
        case 'success':
            return CheckCircle2;
        case 'error':
            return AlertCircle;
        case 'warning':
            return AlertTriangle;
        case 'info':
            return Info;
        default:
            return null;
    }
});
</script>

<template>
    <ToastRoot
        v-bind="forwarded"
        data-slot="toast"
        :class="cn(toastVariants({ variant }), props.class)"
    >
        <div
            class="flex w-full items-center justify-between space-x-4 p-4 pr-8 pl-5"
        >
            <div v-if="iconComponent" class="flex items-center gap-3">
                <component
                    :is="iconComponent"
                    class="size-8 shrink-0"
                    :class="{
                        'text-green-500': variant === 'success',
                        'text-red-500': variant === 'error',
                        'text-yellow-500': variant === 'warning',
                        'text-blue-500': variant === 'info',
                    }"
                />
                <slot />
            </div>
            <slot v-else />
        </div>
    </ToastRoot>
</template>
