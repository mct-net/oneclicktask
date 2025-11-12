<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import EmptyState from '@/components/EmptyState.vue';
import FilterBar from '@/components/FilterBar.vue';
import ImageDropZone from '@/components/ImageDropZone.vue';
import LayoutPaginated from '@/components/LayoutPaginated.vue';
import LayoutResume from '@/components/LayoutResume.vue';
import LoadingState from '@/components/LoadingState.vue';
import SearchCreateInput from '@/components/SearchCreateInput.vue';
import SelectedTaskCard from '@/components/SelectedTaskCard.vue';
import SelectedTaskPanelDiscussion from '@/components/SelectedTaskPanelDiscussion.vue';
import SelectedTaskPanelEditor from '@/components/SelectedTaskPanelEditor.vue';

import { useTaskStore } from '@/stores/task';
import { useUIStore } from '@/stores/ui';

const taskStore = useTaskStore();
const { selectedTask, filters, filteredTasks } = storeToRefs(taskStore);

const noTasks = computed(() => !filteredTasks.value.length);

const uiStore = useUIStore();
const { clearSelectedTask } = uiStore;
const { loading, layout } = storeToRefs(uiStore);
</script>

<template>
    <main
        class="mx-auto flex h-full max-w-325 gap-x-6 p-5 @4xl/main:px-10"
        data-testid="deselection-area"
        @click.self="clearSelectedTask"
    >
        <!-- Main Area -->
        <section class="flex grow flex-col" @click.self="clearSelectedTask">
            <!-- Search / Create Bar -->
            <div
                class="flex items-start justify-between gap-x-12"
                @click.self="clearSelectedTask"
            >
                <SearchCreateInput />
                <ImageDropZone />
            </div>

            <!-- Filters Bar -->
            <FilterBar class="mt-5" @click.self="clearSelectedTask" />

            <!-- Selected Task's Area -->
            <article
                v-if="!filters.search"
                class="mt-8 min-h-33"
                aria-label="Selected task area"
            >
                <SelectedTaskCard :class="{ invisible: !selectedTask }" />
                <EmptyState
                    v-if="!selectedTask && !noTasks"
                    class="mt-0 mb-0 box-border h-full w-full"
                    :messages="['No task selected.']"
                    hide-icon
                />
            </article>

            <!-- Filtered Tasks -->
            <LoadingState v-if="loading" class="grow" />
            <EmptyState
                v-else-if="noTasks"
                role="heading"
                aria-label="No tasks found"
            />
            <template v-else>
                <LayoutResume
                    v-if="layout === 'resume' && !filters.search"
                    :tasks="filteredTasks"
                />
                <LayoutPaginated v-else :tasks="filteredTasks" />
            </template>
        </section>

        <!-- Selected Task's Panel -->
        <section
            class="hidden h-full w-76 shrink-0 flex-col rounded-md @3xl/main:flex @4xl/main:w-5/12"
            :class="{
                'border-subtle border-2 border-dashed': !selectedTask,
                'bg-surface': selectedTask,
            }"
        >
            <template v-if="selectedTask">
                <SelectedTaskPanelEditor />
                <SelectedTaskPanelDiscussion />
            </template>
        </section>
    </main>
</template>
