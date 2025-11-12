<script setup lang="ts">
import { storeToRefs } from 'pinia';

import IconCircleCheckOutline from '@/components/icons/IconCircleCheckOutline.vue';
import IconCircleCheckSolid from '@/components/icons/IconCircleCheckSolid.vue';
import IconCircleCloseOutline from '@/components/icons/IconCircleCloseOutline.vue';
import IconCircleCloseSolid from '@/components/icons/IconCircleCloseSolid.vue';
import IconCirclePlayOutline from '@/components/icons/IconCirclePlayOutline.vue';
import IconCirclePlaySolid from '@/components/icons/IconCirclePlaySolid.vue';
import IconTelescopeOutline from '@/components/icons/IconTelescopeOutline.vue';
import IconTelescopeSolid from '@/components/icons/IconTelescopeSolid.vue';
import IconTrashOutline from '@/components/icons/IconTrashOutline.vue';

import BasePill from '@/components/common/BasePill.vue';
import type { Task } from '@/lib/types/models';
import { getStatusLabel, useTaskStore } from '@/stores/task';

defineEmits(['destroy']);

const taskStore = useTaskStore();
const { selectedTask } = storeToRefs(taskStore);

const setStatus = (status: Task['status']) => {
    if (!selectedTask.value) {
        return;
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
                class="flex h-5.5 gap-x-2"
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
                <div class="text-subtle flex gap-x-2 text-xs">
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
