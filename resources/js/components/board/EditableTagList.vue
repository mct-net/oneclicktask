<script setup lang="ts">
import BaseHash from '@/components/board/common/BaseHash.vue';
import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import type { Task } from '@/lib/board/types/models';

defineProps<{
    tags: Task['tags'];
}>();

const taskStore = useTaskStore();
</script>

<template>
    <div
        v-if="taskStore.selectedTask"
        class="flex flex-wrap items-center gap-2"
        role="region"
        aria-label="Tags"
    >
        <BaseHash v-for="tag in tags" :key="tag.id">
            <span>{{ tag.name }}</span>
        </BaseHash>
    </div>
</template>
