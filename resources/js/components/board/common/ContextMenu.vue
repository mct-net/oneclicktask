<script setup lang="ts">
import IconOptions from '@/components/board/icons/IconOptions.vue';
import { autoUpdate, hide, useFloating } from '@floating-ui/vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import type { PropType } from 'vue';
import { ref } from 'vue';

type Option = {
    label: string;
    onClick: (close: () => void) => void;
};

defineProps({
    options: {
        type: Array as PropType<Option[]>,
        required: true,
    },
});

const reference = ref(null);
const floating = ref(null);
const { floatingStyles, middlewareData } = useFloating(reference, floating, {
    placement: 'bottom-end',
    whileElementsMounted: autoUpdate,
    middleware: [hide()],
});
</script>

<template>
    <Popover class="relative flex items-center">
        <PopoverButton ref="reference" class="outline-hidden">
            <span class="block h-fit px-2 py-1">
                <IconOptions />
            </span>
        </PopoverButton>

        <Teleport to="body">
            <PopoverPanel v-slot="{ close }">
                <div
                    ref="floating"
                    :style="{
                        ...floatingStyles,
                        visibility: middlewareData.hide?.referenceHidden
                            ? 'hidden'
                            : 'visible',
                    }"
                    class="z-10 w-fit rounded-md bg-surface py-0.5 shadow-popover"
                >
                    <button
                        v-for="option in options"
                        :key="option.label"
                        class="font-ubuntu w-full border-none bg-transparent px-3 py-1.5 text-left text-sm outline-hidden hover:opacity-70 focus:opacity-70"
                        @click="option.onClick(close)"
                    >
                        {{ option.label }}
                    </button>
                </div>
            </PopoverPanel>
        </Teleport>
    </Popover>
</template>
