<script setup lang="ts">
import { onBeforeMount, toRef } from 'vue';
import { useRouter } from 'vue-router';

import { useRecentTasks, useUrgentTasks } from '@/composables/filter';
import type { Task } from '@/lib/types/models';
import { useTaskStore } from '@/stores/task';
import { useUIStore } from '@/stores/ui';

import TaskList from '@/components/common/TaskList.vue';

/*-------------------------------------
  State
-------------------------------------*/
const props = defineProps<{
    tasks: Task[];
}>();

const tasks = toRef(props, 'tasks');
const urgentTasks = useUrgentTasks(tasks);
const recentTasks = useRecentTasks(tasks);

const router = useRouter();

/*-------------------------------------
  Methods
-------------------------------------*/
const { clearSelectedTask, changeLayout } = useUIStore();

const onSelectTask = (task: Task) => {
    useTaskStore().selectedTask = task;
    router.replace(`/${task.id}`);
};

/*-------------------------------------
  Lifecycle
-------------------------------------*/
onBeforeMount(() => {
    if (!useTaskStore().selectedTask) {
        useTaskStore().selectedTask = urgentTasks.value.top5[0];
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
            class="mt-3"
            :tasks="recentTasks.top5"
            :stats="recentTasks.stats"
            disable-time-menu
            @maximize="changeLayout('paginated', 'recent_first')"
            @select-task="onSelectTask"
        />
    </section>
</template>
