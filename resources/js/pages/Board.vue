<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';

import { index as boardsIndex } from '@/actions/App/Http/Controllers/BoardController';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';

// Board Components
import EmptyState from '@/components/board/EmptyState.vue';
import ErrorState from '@/components/board/ErrorState.vue';
import FilterBar from '@/components/board/FilterBar.vue';
import ImageDropZone from '@/components/board/ImageDropZone.vue';
import LayoutPaginated from '@/components/board/LayoutPaginated.vue';
import LayoutResume from '@/components/board/LayoutResume.vue';
import LoadingState from '@/components/board/LoadingState.vue';
import SearchCreateInput from '@/components/board/SearchCreateInput.vue';
import SelectedTaskCard from '@/components/board/SelectedTaskCard.vue';
import SelectedTaskPanelDiscussion from '@/components/board/SelectedTaskPanelDiscussion.vue';
import SelectedTaskPanelEditor from '@/components/board/SelectedTaskPanelEditor.vue';

// Dialogs
import ConfirmDialog from '@/components/board/dialogs/ConfirmDialog.vue';
import ExpandedEditorDialog from '@/components/board/dialogs/ExpandedEditorDialog.vue';

// Composables
import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import { useUIStore } from '@/composables/board/stores/useUIStore';
import { useUserStore } from '@/composables/board/stores/useUserStore';
import { useToast } from '@/composables/useToast';
import { setCurrentBoardId } from '@/lib/board/api';
import { addTagIfNotExists } from '@/lib/board/utils/tasks';

interface Board {
    id: number;
    name: string;
    description: string | null;
    color: string | null;
    owner_id: number;
    created_at: string;
    updated_at: string;
}

const props = defineProps<{
    board: Board;
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Boards',
        href: boardsIndex().url,
    },
    {
        title: props.board.name,
    },
];

// Initialize stores
const taskStore = useTaskStore();
const { selectedTask, filters, filteredTasks } = taskStore;

const noTasks = computed(() => !filteredTasks.value.length);

const uiStore = useUIStore();
const { clearSelectedTask, loading, layout } = uiStore;

const error = ref(false);

const { toast } = useToast();

// Select task from URL query parameter
const selectTaskFromRoute = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('task');

    if (taskId) {
        const task = taskStore.tasks.value.find((t) => t.id === Number(taskId));
        if (task) {
            taskStore.selectedTask.value = task;
            return true;
        } else {
            toast({
                message: `Task with ID ${taskId} not found`,
                type: 'error',
            });
            router.visit(window.location.pathname, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }
    return false;
};

// Load data on mount
onMounted(async () => {
    // Set the current board ID for the API client
    setCurrentBoardId(props.board.id);

    const userStore = useUserStore();

    const [taskResult, tagResult, usersResult, currentUserResult] =
        await Promise.all([
            taskStore.loadTasks(),
            taskStore.loadTags(),
            userStore.loadUsers(),
            userStore.loadCurrentUser(),
        ]);

    error.value =
        taskResult.error ||
        tagResult.error ||
        usersResult.error ||
        currentUserResult.error;

    if (!error.value) {
        taskStore.fiveMostUsedTags.value.forEach((tag) => {
            addTagIfNotExists(uiStore.quickTagFilters.value, tag);
        });

        const validRouteId = selectTaskFromRoute();
        if (!validRouteId) {
            uiStore.updateRoute();
        }
    }
});
</script>

<template>
    <Head :title="board.name" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div
            class="@container/main flex h-full flex-1"
            @click.self="clearSelectedTask"
        >
            <!-- Error State -->
            <ErrorState
                v-if="error"
                class="flex h-full w-full items-center justify-center"
            />

            <!-- Main Board Area -->
            <main
                v-else
                class="mx-auto flex h-full w-full max-w-325 gap-x-6 p-5 @4xl/main:px-10"
                @click.self="clearSelectedTask"
            >
                <!-- Main Content Area -->
                <section
                    class="flex grow flex-col"
                    @click.self="clearSelectedTask"
                >
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

                    <!-- E2E Deselection Area -->
                    <div
                        class="h-8"
                        data-testid="deselection-area"
                        @click.self="clearSelectedTask"
                    />

                    <!-- Selected Task's Area -->
                    <article
                        v-if="!filters.search"
                        class="min-h-34"
                        aria-label="Selected task area"
                    >
                        <SelectedTaskCard
                            :class="{ invisible: !selectedTask }"
                        />
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
                        'border-2 border-dashed': !selectedTask,
                        'bg-surface': selectedTask,
                    }"
                >
                    <template v-if="selectedTask">
                        <SelectedTaskPanelEditor />
                        <SelectedTaskPanelDiscussion />
                    </template>
                </section>
            </main>

            <!-- Global Modals -->
            <ExpandedEditorDialog />

            <ConfirmDialog
                dialog-id="confirm-delete-comment"
                title="Delete comment"
                description="You will lose it forever. Do you want to continue?"
                confirmation-button-label="Yes, delete it"
            />

            <ConfirmDialog
                dialog-id="confirm-delete-file"
                title="Delete file"
                description="You will lose it forever. Do you want to continue?"
                confirmation-button-label="Yes, delete it"
            />
        </div>
    </AppLayout>
</template>
