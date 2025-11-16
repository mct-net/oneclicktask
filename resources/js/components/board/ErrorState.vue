<script setup lang="ts">
import IconUnplug from '@/components/board/icons/IconUnplug.vue';

const messages = [
    'Oops! Technical difficulties. Please refresh or try later.',
    'Please check your internet and try again.',
    "Oops! Can't fetch tasks right now.",
    'Technical glitch! Retry in a moment.',
    'Connection lost! Please retry.',
];

const message = messages[Math.floor(Math.random() * messages.length)];
</script>

<template>
    <section class="flex grow items-center justify-center">
        <div
            class="mt-10 mb-40 flex w-fit flex-col items-center gap-x-3 rounded-md border-2 border-dashed p-5 pb-7"
        >
            <IconUnplug />
            <p class="mt-2 w-44 text-center">{{ message }}</p>
        </div>
    </section>
</template>
