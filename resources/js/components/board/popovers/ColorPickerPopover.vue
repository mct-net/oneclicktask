<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

import IconEmptyCircle from '@/components/board/icons/IconEmptyCircle.vue';
import { EMPTY_TASK_COLOR, TASK_COLORS } from '@/lib/board/constants';

defineProps({
    selectedColor: {
        type: String,
    },
});

defineEmits(['pick']);

const palette = [
    TASK_COLORS.red,
    TASK_COLORS.orange,
    TASK_COLORS.yellow,
    TASK_COLORS.green,
    TASK_COLORS.blue,
    TASK_COLORS.lilac,
    TASK_COLORS.purple,
    TASK_COLORS.gray,
    TASK_COLORS.darkGray,
];
</script>

<template>
    <Popover class="relative flex items-center">
        <PopoverButton class="outline-hidden" title="Color">
            <slot />
        </PopoverButton>

        <PopoverPanel class="absolute top-[calc(100%+0.4rem)] -left-2 z-10">
            <div class="w-fit rounded-md bg-surface p-3 shadow-popover">
                <div class="grid w-24 grid-cols-5 gap-1">
                    <button
                        v-for="color in palette"
                        :key="color"
                        class="h-4 w-4 rounded-full"
                        :style="{ backgroundColor: color }"
                        @click="$emit('pick', color)"
                    />

                    <button
                        class="rounded-full text-muted-foreground"
                        @click="$emit('pick', EMPTY_TASK_COLOR)"
                        title="No color"
                    >
                        <IconEmptyCircle />
                    </button>
                </div>
            </div>
        </PopoverPanel>
    </Popover>
</template>
