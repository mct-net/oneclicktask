<script setup lang="ts">
import IconImage from '@/components/board/icons/IconImage.vue';
import { useDropZone, useFileDialog } from '@/composables/board/file';

const { dropZoneRef, isOverDropZone } = useDropZone({ addNewTask: true });
const { openFileDialog } = useFileDialog({ addNewTask: true });
</script>

<template>
    <div
        ref="dropZoneRef"
        class="flex h-14 w-fit shrink-0 cursor-pointer items-center gap-x-3 rounded-md border-2 border-dashed bg-interactive-secondary px-5 py-3 text-xs"
        :class="isOverDropZone ? 'border-primary' : ''"
        @click="openFileDialog()"
    >
        <IconImage class="shrink-0" />
        <p class="leading-[1.15]">
            <span class="block font-medium">New task from file</span>
            (Drag and drop)
        </p>
    </div>
</template>
