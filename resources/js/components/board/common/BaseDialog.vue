<script setup lang="ts">
import {
    DIALOGS_AND_MENUS,
    useDialogStore,
} from '@/composables/board/stores/useDialogStore';
import { onKeyStroke } from '@vueuse/core';
import type { PropType } from 'vue';

defineProps({
    dialogId: {
        type: String as PropType<keyof typeof DIALOGS_AND_MENUS>,
        required: true,
    },
});

const dialogStore = useDialogStore();

const close = () => {
    dialogStore.closeLastOpened();
};

const confirm = () => {
    dialogStore.state.callback();
    close();
};

onKeyStroke('Escape', close);
</script>

<template>
    <transition
        as="template"
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-show="dialogStore.state[dialogId]"
            class="absolute top-0 left-0 z-20 flex h-full w-full items-center"
        >
            <!-- Overlay -->
            <div
                class="fixed top-0 left-0 h-full w-full bg-[#000]/50"
                @click.self="close"
            />

            <div
                class="relative mx-auto flex w-full items-center justify-center"
                @click.self="close"
            >
                <slot :close="close" :confirm="confirm" />
            </div>
        </div>
    </transition>
</template>
