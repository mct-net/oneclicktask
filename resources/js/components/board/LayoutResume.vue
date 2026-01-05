<script setup lang="ts">
import { onBeforeMount, toRef } from 'vue';

import { useRecentTasks, useUrgentTasks } from '@/composables/board/filter';
import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import { useUIStore } from '@/composables/board/stores/useUIStore';
import type { Task } from '@/lib/board/types/models';

import TaskList from '@/components/board/common/TaskList.vue';

/*-------------------------------------
  State
-------------------------------------*/
const props = defineProps<{
    tasks: Task[];
}>();

const tasks = toRef(props, 'tasks');
const urgentTasks = useUrgentTasks(tasks);
const recentTasks = useRecentTasks(tasks);

/*-------------------------------------
  Methods
-------------------------------------*/
const { clearSelectedTask, changeLayout, updateRoute } = useUIStore();
const taskStore = useTaskStore();

const onSelectTask = (task: Task) => {
    taskStore.selectedTask.value = task;
    updateRoute();
};

/*-------------------------------------
  Lifecycle
-------------------------------------*/
onBeforeMount(() => {
    if (!useTaskStore().selectedTask.value) {
        useTaskStore().selectedTask.value = urgentTasks.value.top5[0];
    }
});
</script>

<template>
    <section @click.self="clearSelectedTask">
        <TaskList
            aria-label="Five most urgent tasks"
            class="mt-3"
            :tasks="urgentTasks.top5"
            :stats="urgentTasks.stats"
            :empty-state-messages="urgentTasks.emptyStateMessages"
            @maximize="changeLayout('paginated', 'most_urgent_first')"
            @select-task="onSelectTask"
        />

        <TaskList
            aria-label="Five most recent tasks"
            class="mt-8"
            :tasks="recentTasks.top5"
            :stats="recentTasks.stats"
            disable-time-menu
            @maximize="changeLayout('paginated', 'recent_first')"
            @select-task="onSelectTask"
        />
    </section>
</template>
