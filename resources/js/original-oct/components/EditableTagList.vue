<script setup lang="ts">
import type { PropType } from 'vue';

import BaseHash from '@/components/common/BaseHash.vue';
import EditableText from '@/components/common/EditableText.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import type { Task } from '@/lib/types/models';
import { useTaskStore } from '@/stores/task';

defineProps({
    tags: {
        type: Array as PropType<Task['tags']>,
        required: true,
    },
});

const emit = defineEmits(['update-tag', 'delete-tag', 'insert-tag']);

const taskStore = useTaskStore();

const onUpdateTag = (newName: string, id: number) => {
    !newName.trim() ? emit('delete-tag', id) : emit('update-tag', newName, id);
};

const onBackspaceWithEmptyText = (id: number) => {
    emit('delete-tag', id);
};

const onAddTag = () => {
    emit('insert-tag', 'New Tag');
};
</script>

<template>
    <ul
        v-if="taskStore.selectedTask"
        class="flex flex-wrap items-center gap-2"
        role="region"
        aria-label="Tags"
    >
        <BaseHash v-for="tag in tags" :key="tag.id">
            <EditableText
                :model-value="tag.name"
                save-on-enter
                @update:model-value="
                    (newValue) => onUpdateTag(newValue, tag.id)
                "
                @backspace-with-empty-text="onBackspaceWithEmptyText(tag.id)"
            />
        </BaseHash>

        <button
            class="flex h-4 w-4 items-center justify-center rounded-md bg-interactive-secondary"
            aria-label="Add tag"
            @click="onAddTag"
        >
            <IconPlus />
        </button>
    </ul>
</template>
