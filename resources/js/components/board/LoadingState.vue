<script setup lang="ts">
import IconLoading from '@/components/board/icons/IconLoading.vue';

const messages = [
    'Fetching tasks... Please wait.',
    'Just a moment... Tasks are loading.',
    'Loading... Your tasks are on the horizon.',
];

const message = messages[Math.floor(Math.random() * messages.length)];
</script>

<template>
    <section class="flex grow items-center justify-center">
        <div
            class="mb-40 flex w-fit flex-col items-center gap-x-3 rounded-md p-5 pb-7"
        >
            <IconLoading />
            <p class="mt-2 w-44 text-center">{{ message }}</p>
        </div>
    </section>
</template>
