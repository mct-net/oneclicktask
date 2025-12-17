<script setup lang="ts">
import { computed } from 'vue';

import TimeAdderMenu from '@/components/board/common/TimeAdderMenu.vue';
import IconCircle from '@/components/board/icons/IconCircle.vue';
import IconStarOutline from '@/components/board/icons/IconStarOutline.vue';
import IconStarSolid from '@/components/board/icons/IconStarSolid.vue';
import IconWarningOutline from '@/components/board/icons/IconWarningOutline.vue';
import IconWarningSolid from '@/components/board/icons/IconWarningSolid.vue';

import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import { EMPTY_TASK_COLOR } from '@/lib/board/constants';
import type { Task } from '@/lib/board/types/models';
import { formatDueDate } from '@/lib/board/utils/date';

/*-------------------------------------
  State
-------------------------------------*/
const props = defineProps<{
    task: Task;
    isActive?: boolean;
    disableTimeMenu?: boolean;
}>();

const formattedDueDate = computed(() => {
    return formatDueDate(props.task.due_date);
});

/*-------------------------------------
  Methods
-------------------------------------*/
const onAddTime = (minutes: number) => {
    const { addTime } = useTaskStore();
    addTime(props.task, minutes);
};
</script>

<template>
    <li
        class="group relative flex cursor-pointer items-center gap-x-3 px-4 py-[0.3rem]"
        :title="formattedDueDate"
        role="listitem"
        :aria-label="task.name"
    >
        <div class="flex items-center gap-x-2">
            <IconStarSolid v-if="task.is_starred" class="text-border" />
            <IconStarOutline v-else class="text-muted-foreground" />

            <IconWarningSolid
                v-if="task.is_important"
                class="text-muted-foreground"
            />
            <IconWarningOutline v-else class="text-muted-foreground" />

            <span
                v-if="task.color !== EMPTY_TASK_COLOR"
                class="size-4 rounded-full"
                :style="{ backgroundColor: task.color }"
            />

            <IconCircle v-else class="text-muted-foreground" />
        </div>

        <span :class="{ 'font-bold': isActive }" aria-label="Task name">
            {{ task.name }}
        </span>

        <div
            class="invisible absolute right-10 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
        >
            <TimeAdderMenu
                v-if="!disableTimeMenu"
                class="bg-linear-to-r from-transparent to-[rgb(var(--theme-bg-surface))] to-10% px-4 pl-10"
                @add="onAddTime"
            />
        </div>
    </li>
</template>
