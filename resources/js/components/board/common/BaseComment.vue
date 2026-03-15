<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import { ref } from 'vue';

import BaseTextarea from '@/components/board/common/BaseTextarea.vue';
import CommentOptionsPopover from '@/components/board/popovers/CommentOptionsPopover.vue';
import UserInfo from '@/components/core/UserInfo.vue';

import { formatRelativeTime } from '@/lib/board/utils/date';
import type { User } from '@/types';

const props = defineProps<{
    id: number;
    content: string;
    createdAt: string;
    user: User;
    isEditable: boolean;
}>();

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
        <!-- User Info -->
        <UserInfo :user="user" class="rounded-full" />

        <!-- Info -->
        <div class="grow">
            <div class="mb-1 flex items-center gap-3 text-sm leading-none">
                <p class="font-bold">
                    {{ user.name }}
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
                        class="rounded-md border bg-interactive-primary px-3 py-1.5 text-sm leading-none text-primary-foreground"
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
