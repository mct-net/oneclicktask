<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
    NavigationMenuIndicator,
    type NavigationMenuIndicatorProps,
    useForwardProps,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<
    NavigationMenuIndicatorProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <NavigationMenuIndicator
        data-slot="navigation-menu-indicator"
        v-bind="forwardedProps"
        :class="
            cn(
                'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in',
                props.class,
            )
        "
    >
        <div
            class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md"
        />
    </NavigationMenuIndicator>
</template>
