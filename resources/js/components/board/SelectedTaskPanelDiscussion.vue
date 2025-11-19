<script setup lang="ts">
import { ref } from 'vue';

import BaseComment from '@/components/board/common/BaseComment.vue';
import BaseInput from '@/components/board/common/BaseInput.vue';
import SpeechInput from '@/components/board/common/SpeechInput.vue';
import IconSend from '@/components/board/icons/IconSend.vue';

import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import { useUserStore } from '@/composables/board/stores/useUserStore';
import { formatRelativeTime } from '@/lib/board/utils/date';
import { formatAuthorFullName } from '@/lib/board/utils/string';

/*-------------------------------------
  State
-------------------------------------*/
defineProps<{
    isExpanded?: boolean;
}>();

const taskStore = useTaskStore();
const { selectedTask } = taskStore;
const { currentUser } = useUserStore();

const newComment = ref('');
const commentsRef = ref<HTMLElement | null>(null);
const speechInputRef = ref<InstanceType<typeof SpeechInput>>();

/*-------------------------------------
  Methods
-------------------------------------*/
const scrollToBottomOfComments = () => {
    if (commentsRef.value) {
        commentsRef.value.scrollTo({
            top: commentsRef.value.scrollHeight,
            behavior: 'smooth',
        });
    }
};

const onDeleteComment = (id: number) => {
    if (!selectedTask.value?.comments) return;
    taskStore.removeComment(selectedTask.value, id);
};

const onUpdateComment = (id: number, content: string) => {
    if (!selectedTask.value?.comments) return;

    taskStore.updateComment(selectedTask.value, id, content);
};

const onInsertComment = async () => {
    if (!selectedTask.value) return;

    await taskStore.addComment(selectedTask.value, newComment.value);
    newComment.value = '';

    speechInputRef.value?.stopListening();

    scrollToBottomOfComments();
};
</script>

<template>
    <section
        v-if="selectedTask"
        class="flex flex-col rounded-b-md border-t border-canvas bg-surface"
    >
        <section
            ref="commentsRef"
            class="flex grow flex-col gap-y-3 overflow-y-scroll p-5 pt-0 pr-0.5"
            :class="[{ 'max-h-64': !isExpanded }, isExpanded ? 'mr-3' : 'mr-5']"
        >
            <!-- Creation Date and Author -->
            <p class="pt-5 text-sm">
                <span class="font-bold">
                    {{ formatAuthorFullName(selectedTask.author) }}
                </span>
                created this task
                {{ formatRelativeTime(selectedTask.created_at) }}.
            </p>

            <!-- Comments -->
            <BaseComment
                v-for="comment in selectedTask.comments"
                :key="comment.id"
                :id="comment.id"
                :content="comment.content"
                :createdAt="comment.created_at"
                :user="comment.user"
                :is-editable="comment.user.id === currentUser?.id"
                @delete="onDeleteComment(comment.id)"
                @update="(content) => onUpdateComment(comment.id, content)"
            />
        </section>

        <!-- Input -->
        <section
            class="p-5 pt-0"
            :class="[isExpanded ? 'flex' : 'hidden @4xl/main:flex']"
        >
            <BaseInput
                class="grow"
                v-model="newComment"
                placeholder="Add a comment..."
                @enter="onInsertComment"
            >
                <button
                    class="relative -right-2 rounded-md p-2 hover:opacity-70"
                    @click="onInsertComment"
                >
                    <IconSend />
                </button>
            </BaseInput>

            <div class="flex w-12 items-center justify-center pr-1">
                <SpeechInput
                    ref="speechInputRef"
                    class="h-auto w-auto border-none"
                    v-model="newComment"
                />
            </div>
        </section>
    </section>
</template>
