<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import type { PropType } from 'vue';
import { ref } from 'vue';

import BaseTextarea from '@/components/board/common/BaseTextarea.vue';
import CommentOptionsPopover from '@/components/board/popovers/CommentOptionsPopover.vue';
import type { Comment } from '@/lib/board/types/models';
import { formatRelativeTime } from '@/lib/board/utils/date';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    user: {
        type: Object as PropType<Comment['user']>,
        required: true,
    },
    isEditable: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['delete', 'update']);

const editMode = ref(false);
const editableContent = ref('');

const enableEditMode = () => {
    editMode.value = true;
    editableContent.value = props.content;
};

const disableEditMode = () => {
    editMode.value = false;
};

const onSave = () => {
    emit('update', editableContent.value);
    editMode.value = false;
};

onKeyStroke('Escape', disableEditMode);
</script>

<template>
    <article class="flex gap-x-3">
        <!-- Avatar -->
        <div class="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-canvas">
            <img class="h-full w-full object-cover" :src="user.avatarUrl" />
        </div>

        <!-- Info -->
        <div class="grow">
            <div class="mb-1 flex items-center gap-3 leading-none">
                <p class="font-bold">
                    {{ user.firstName }} {{ user.lastName }}
                </p>
                <p class="text-xs opacity-80">
                    {{ formatRelativeTime(createdAt) }}
                </p>
            </div>
            <p v-if="!editMode">
                {{ content }}
            </p>
            <div v-else>
                <BaseTextarea
                    class="w-full rounded-md"
                    v-model="editableContent"
                />

                <div class="mt-2 flex justify-end gap-x-2">
                    <button
                        class="rounded-md px-3 py-1.5 text-sm"
                        @click="editMode = false"
                    >
                        Cancel
                    </button>
                    <button
                        class="border-subtle text-on-contrast rounded-md border bg-interactive-primary px-3 py-1.5 text-sm leading-none"
                        @click="onSave"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>

        <!-- Options -->
        <div class="flex w-5 shrink-0 flex-col">
            <CommentOptionsPopover
                v-if="isEditable"
                @delete="$emit('delete')"
                @edit="enableEditMode"
            />
        </div>
    </article>
</template>
