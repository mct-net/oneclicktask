<script setup lang="ts">
import BasePill from '@/components/board/common/BasePill.vue';
import type { PillVariant } from '@/lib/board/types/ui';
import type { PropType } from 'vue';

defineProps({
    variant: {
        type: String as PropType<PillVariant>,
        default: 'default',
    },
});
</script>

<template>
    <BasePill :variant="variant" class="flex cursor-pointer gap-x-0.5">
        <span class="opacity-35">#</span>
        <span class="relative whitespace-nowrap">
            <slot />

            <span
                v-if="variant === 'error'"
                class="absolute top-0 left-0 flex h-full w-full items-center"
            >
                <span class="w-full border-b text-error" />
            </span>
        </span>
    </BasePill>
</template>
