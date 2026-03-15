<script setup lang="ts">
defineEmits(['add']);
</script>

<template>
    <div>
        <div class="flex gap-x-2 text-xs">
            <button
                class="rounded-md bg-interactive-secondary px-2 py-1 leading-none"
                role="menuitem"
                @click="$emit('add', 5)"
            >
                <span class="opacity-35">+</span>5m
            </button>

            <button
                class="rounded-md bg-interactive-secondary px-2 py-1 leading-none"
                role="menuitem"
                @click="$emit('add', 60)"
            >
                <span class="opacity-35">+</span>1h
            </button>

            <button
                class="rounded-md bg-interactive-secondary px-2 py-1 leading-none"
                role="menuitem"
                @click="$emit('add', 60 * 24)"
            >
                <span class="opacity-35">+</span>1d
            </button>

            <button
                class="rounded-md bg-interactive-secondary px-2 py-1 leading-none"
                role="menuitem"
                @click="$emit('add', 60 * 24 * 7)"
            >
                <span class="opacity-35">+</span>1w
            </button>

            <button
                class="rounded-md bg-interactive-secondary px-2 py-1 leading-none"
                role="menuitem"
                @click="$emit('add', 60 * 24 * 30)"
            >
                <span class="opacity-35">+</span>1mo
            </button>

            <button
                class="rounded-md bg-interactive-secondary px-2 py-1 leading-none"
                role="menuitem"
                @click="$emit('add', 60 * 24 * 90)"
            >
                <span class="opacity-35">+</span>90d
            </button>
        </div>
    </div>
</template>
