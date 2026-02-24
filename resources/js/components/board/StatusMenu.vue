<script setup lang="ts">
import IconCircleCheckOutline from '@/components/board/icons/IconCircleCheckOutline.vue';
import IconCircleCheckSolid from '@/components/board/icons/IconCircleCheckSolid.vue';
import IconCircleCloseOutline from '@/components/board/icons/IconCircleCloseOutline.vue';
import IconCircleCloseSolid from '@/components/board/icons/IconCircleCloseSolid.vue';
import IconCirclePlayOutline from '@/components/board/icons/IconCirclePlayOutline.vue';
import IconCirclePlaySolid from '@/components/board/icons/IconCirclePlaySolid.vue';
import IconTelescopeOutline from '@/components/board/icons/IconTelescopeOutline.vue';
import IconTelescopeSolid from '@/components/board/icons/IconTelescopeSolid.vue';
import IconTrashOutline from '@/components/board/icons/IconTrashOutline.vue';

import BasePill from '@/components/board/common/BasePill.vue';
import {
    getStatusLabel,
    useTaskStore,
} from '@/composables/board/stores/useTaskStore';
import { useAnalytics } from '@/composables/useAnalytics';
import type { Task } from '@/lib/board/types/models';

defineEmits(['destroy']);

const taskStore = useTaskStore();
const { selectedTask } = taskStore;
const { trackStatusChange } = useAnalytics();

const setStatus = (status: Task['status']) => {
    if (!selectedTask.value) {
        return;
    }

    if (selectedTask.value.status !== status) {
        trackStatusChange();
    }

    selectedTask.value.status = status;
};
</script>

<template>
    <div
        v-if="selectedTask"
        class="group relative flex items-center"
        role="group"
        aria-label="Status Menu"
    >
        <!-- Button -->
        <button
            class="flex items-center"
            :title="`Task status: ${getStatusLabel(selectedTask.status)}`"
            :aria-label="`Task status: ${getStatusLabel(selectedTask.status)}`"
            aria-roledescription="Hover to see more options"
        >
            <IconCirclePlaySolid
                class="h-5.5 w-5.5"
                v-if="selectedTask.status === 'in_progress'"
            />
            <IconCircleCheckSolid
                class="h-5.5 w-5.5"
                v-else-if="selectedTask.status === 'done'"
            />
            <IconCircleCloseSolid
                class="h-5.5 w-5.5"
                v-else-if="
                    ['duplicate', 'failed'].includes(selectedTask.status)
                "
            />
            <IconTelescopeSolid
                class="h-5.5 w-5.5"
                v-else-if="selectedTask.status === 'backlog'"
            />

            <ul
                v-else-if="selectedTask.status === 'trashed'"
                class="flex h-5.5 gap-x-2 text-sm"
            >
                <BasePill variant="default" @click="setStatus('backlog')">
                    Restore
                </BasePill>
                <BasePill variant="contrast" @click="$emit('destroy')">
                    Destroy
                </BasePill>
            </ul>
        </button>

        <!-- Menu -->
        <section
            v-if="selectedTask.status !== 'trashed'"
            class="invisible absolute right-full opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100"
            aria-label="Task status options"
            role="menu"
        >
            <div
                class="bg-linear-to-r from-transparent to-[rgb(var(--theme-bg-surface))] to-10% py-2 pr-2 pl-10"
            >
                <div class="flex gap-x-2 text-xs text-muted-foreground">
                    <button
                        role="menuitem"
                        :title="getStatusLabel('trashed')"
                        @click="setStatus('trashed')"
                    >
                        <IconTrashOutline />
                    </button>

                    <button
                        v-if="selectedTask.status !== 'in_progress'"
                        role="menuitem"
                        :title="getStatusLabel('in_progress')"
                        @click="setStatus('in_progress')"
                    >
                        <IconCirclePlayOutline />
                    </button>

                    <button
                        v-if="
                            !['failed', 'duplicate'].includes(
                                selectedTask.status,
                            )
                        "
                        role="menuitem"
                        :title="getStatusLabel('failed')"
                        @click="setStatus('failed')"
                    >
                        <IconCircleCloseOutline />
                    </button>

                    <button
                        v-if="selectedTask.status !== 'done'"
                        role="menuitem"
                        :title="getStatusLabel('done')"
                        @click="setStatus('done')"
                    >
                        <IconCircleCheckOutline />
                    </button>

                    <button
                        v-if="selectedTask.status !== 'backlog'"
                        role="menuitem"
                        :title="getStatusLabel('backlog')"
                        @click="setStatus('backlog')"
                    >
                        <IconTelescopeOutline />
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>
