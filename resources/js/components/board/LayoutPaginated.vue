<script setup lang="ts">
import { toRefs, watch } from 'vue';

import TaskList from '@/components/board/common/TaskList.vue';
import { usePagination } from '@/composables/board/pagination';
import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import { useUIStore } from '@/composables/board/stores/useUIStore';
import type { Task } from '@/lib/board/types/models';

/*-------------------------------------
  State
-------------------------------------*/
const props = defineProps<{
    tasks: Task[];
}>();

const { tasks } = toRefs(props);

const {
    currentPage,
    totalPages,
    paginatedItems,
    isLastPage,
    isFirstPage,
    goToNextPage,
    goToPreviousPage,
    totalCounter,
} = usePagination({
    items: tasks,
    itemsPerPage: 10,
});

/*-------------------------------------
  Methods
-------------------------------------*/
const { changeLayout } = useUIStore();

const onInputPage = (value: number) => {
    /*
    Discard numbers that are not in the range
    of the total pages.
  */
    if (value > totalPages.value) {
        currentPage.value = totalPages.value;
    } else if (value < 1) {
        currentPage.value = 1;
    } else {
        currentPage.value = value;
    }
};

const onSelectTask = (task: Task) => {
    useTaskStore().selectedTask.value = task;
    useUIStore().updateRoute();
};

/*-------------------------------------
  Lifecycle
-------------------------------------*/
watch(useTaskStore().filters, () => {
    currentPage.value = 1;
});
</script>

<template>
    <section class="flex grow flex-col">
        <TaskList
            class="mt-3 grow"
            aria-label="Search results"
            role="listbox"
            :tasks="paginatedItems"
            :stats="[
                {
                    name: 'Results',
                    count: totalCounter,
                    toggle: () => {},
                    active: false,
                },
            ]"
            @minimize="changeLayout('resume', 'recent_first')"
            @select-task="onSelectTask"
        />

        <!-- Pagination -->
        <div class="flex justify-center">
            <div class="flex items-center gap-x-3">
                <div class="flex items-center gap-x-2">
                    <input
                        class="h-full w-10 rounded-md border bg-surface px-1 py-2 text-center"
                        type="number"
                        :value="currentPage"
                        @input="
                            onInputPage(
                                Number(
                                    ($event.target as HTMLInputElement).value,
                                ),
                            )
                        "
                    />
                    <p>of {{ totalPages }}</p>
                </div>

                <button
                    class="rounded-md bg-interactive-primary px-1.5 py-1 text-primary-foreground"
                    :class="[
                        isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer',
                        'disabled:opacity-50',
                    ]"
                    :disabled="isFirstPage"
                    @click="goToPreviousPage"
                >
                    Prev
                </button>
                <button
                    class="rounded-md bg-interactive-primary px-1.5 py-1 text-primary-foreground"
                    :class="[
                        isLastPage ? 'cursor-not-allowed' : 'cursor-pointer',
                        'disabled:opacity-50',
                    ]"
                    :disabled="isLastPage"
                    @click="goToNextPage"
                >
                    Next
                </button>
            </div>
        </div>
    </section>
</template>
