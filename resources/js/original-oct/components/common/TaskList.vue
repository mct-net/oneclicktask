<script setup lang="ts">
import { storeToRefs } from 'pinia';

import BaseCard from '@/components/common/BaseCard.vue';
import TaskListItem from '@/components/common/TaskListItem.vue';
import EmptyState from '@/components/EmptyState.vue';
import IconMaximize from '@/components/icons/IconMaximize.vue';
import IconMinimize from '@/components/icons/IconMinimize.vue';

import type { Task } from '@/lib/types/models';
import { useTaskStore } from '@/stores/task';
import { useUIStore } from '@/stores/ui';

/*-------------------------------------
  State
-------------------------------------*/
type Stats = {
    name: string;
    count: number;
    toggle: () => void;
    active: boolean;
}[];

defineProps<{
    stats: Stats;
    tasks: Task[];
    emptyStateMessages?: string[];
    disableTimeMenu?: boolean;
}>();

const taskStore = useTaskStore();
const uiStore = useUIStore();

const { selectedTask } = storeToRefs(taskStore);
const { layout } = storeToRefs(uiStore);

/*-------------------------------------
  Emits
-------------------------------------*/
const emit = defineEmits<{
    minimize: [];
    maximize: [];
    selectTask: [task: Task];
}>();

/*-------------------------------------
  Methods
-------------------------------------*/
const { clearSelectedTask } = uiStore;

const onToggleLayout = () => {
    if (layout.value === 'paginated') {
        emit('minimize');
    } else {
        emit('maximize');
    }
};
</script>

<template>
    <section role="listbox" class="relative" @click.self="clearSelectedTask">
        <div class="relative h-37 pb-2">
            <div
                class="border-subtle absolute inset-0 box-border size-full rounded-md border-2 border-dashed"
            />

            <div class="relative">
                <BaseCard v-if="tasks.length" class="py-1">
                    <ul aria-label="Task list">
                        <TaskListItem
                            v-for="task in tasks"
                            :key="task.id"
                            :task="task"
                            :is-active="selectedTask?.id === task.id"
                            :disable-time-menu="disableTimeMenu"
                            @click="$emit('selectTask', task)"
                        />
                    </ul>
                </BaseCard>

                <EmptyState
                    v-if="!tasks.length"
                    :messages="emptyStateMessages"
                    class="my-0 h-36 w-full border-none"
                />
            </div>
        </div>

        <!-- Stats -->
        <ul
            v-if="stats.length"
            class="mt-4 flex grow items-end justify-end gap-x-5 text-right"
            @click.self="clearSelectedTask"
        >
            <li v-for="entry in stats" :key="entry.name">
                <button
                    class="rounded-md px-2 py-1 transition-opacity hover:opacity-70"
                    :class="{ 'text-on-contrast bg-contrast': entry.active }"
                    @click="entry.toggle"
                >
                    <span class="font-bold">{{ entry.name }}</span
                    >: {{ entry.count }}
                </button>
            </li>
        </ul>

        <button
            v-if="tasks.length"
            class="absolute top-1 right-2 p-2"
            @click="onToggleLayout"
        >
            <IconMinimize v-if="layout === 'paginated'" />
            <IconMaximize v-else />
        </button>
    </section>
</template>
