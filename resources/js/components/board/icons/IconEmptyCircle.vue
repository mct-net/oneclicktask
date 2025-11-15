<script setup lang="ts">
defineProps<{
    strokeWidth?: number;
}>();
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
    >
        <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            :stroke-width="strokeWidth || 1.2"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM12.9 3.1l-9.8 9.8"
        />
    </svg>
</template>
