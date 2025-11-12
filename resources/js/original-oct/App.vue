<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';

import ErrorState from '@/components/ErrorState.vue';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';
import ExpandedEditorDialog from '@/components/dialogs/ExpandedEditorDialog.vue';
import { useNoty } from '@/composables/noty';
import { addTagIfNotExists } from '@/lib/utils/tasks';
import { useTaskStore } from '@/stores/task';
import { useUIStore } from '@/stores/ui';
import { useUserStore } from '@/stores/user';

const error = ref();
const router = useRouter();
const route = useRoute();
const { clearSelectedTask, updateRoute } = useUIStore();

const selectTaskFromRoute = () => {
    const taskId = route.params.id;
    if (taskId) {
        const taskStore = useTaskStore();
        const task = taskStore.tasks.find((t) => t.id === Number(taskId));
        if (task) {
            taskStore.selectedTask = task;
            return true;
        } else {
            useNoty({
                message: `Task with ID ${taskId} not found`,
                type: 'error',
            }).setNoty();
            router.push('/');
        }
    }
    return false;
};

onBeforeMount(async () => {
    const [taskResult, tagResult, userResult, currenUserResult] =
        await Promise.all([
            useTaskStore().loadTasks(),
            useTaskStore().loadTags(),
            useUserStore().loadUsers(),
            useUserStore().loadCurrentUser(),
        ]);

    error.value =
        taskResult.error ||
        tagResult.error ||
        userResult.error ||
        currenUserResult.error;

    if (!error.value) {
        useTaskStore().fiveMostUsedTags.forEach((tag) => {
            addTagIfNotExists(useUIStore().quickTagFilters, tag);
        });

        const validRouteId = selectTaskFromRoute();
        if (!validRouteId) {
            updateRoute();
        }
    }
});
</script>

<template>
    <div id="app-root" class="@container/main flex h-full w-full grow">
        <section class="grow overflow-y-scroll" @click.self="clearSelectedTask">
            <ErrorState
                v-if="error"
                class="flex h-full items-center justify-center"
            />
            <RouterView v-else />
        </section>

        <!-- Modals -->
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
</template>
