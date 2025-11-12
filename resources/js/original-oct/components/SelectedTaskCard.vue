<script setup lang="ts">
import BaseCard from '@/components/common/BaseCard.vue';
import EditableText from '@/components/common/EditableText.vue';
import TimeAdderMenu from '@/components/common/TimeAdderMenu.vue';
import EditableTagList from '@/components/EditableTagList.vue';
import IconAddTime from '@/components/icons/IconAddTime.vue';
import IconCircle from '@/components/icons/IconCircle.vue';
import IconMaximize from '@/components/icons/IconMaximize.vue';
import IconStarOutline from '@/components/icons/IconStarOutline.vue';
import IconStarSolid from '@/components/icons/IconStarSolid.vue';
import IconUserOutline from '@/components/icons/IconUserOutline.vue';
import IconWarningOutline from '@/components/icons/IconWarningOutline.vue';
import IconWarningSolid from '@/components/icons/IconWarningSolid.vue';
import ColorPickerPopover from '@/components/popovers/ColorPickerPopover.vue';
import UserSelectPopover from '@/components/popovers/UserSelectPopover.vue';
import StatusMenu from '@/components/StatusMenu.vue';
import { EMPTY_TASK_COLOR } from '@/lib/constants';
import type { User } from '@/lib/types/models';
import { formatDueDate } from '@/lib/utils/date';
import { useDialogStore } from '@/stores/dialog';
import { useTaskStore } from '@/stores/task';
import { computed, watch } from 'vue';

const taskStore = useTaskStore();
const dialogStore = useDialogStore();

const onPickAssignee = (user: User) => {
    if (taskStore.selectedTask) {
        taskStore.selectedTask.assignee = user;
    }
};

const onRemoveAssignee = () => {
    if (taskStore.selectedTask) {
        taskStore.selectedTask.assignee = undefined;
    }
};

const onDeleteTag = (id: number) => {
    if (taskStore.selectedTask) {
        taskStore.removeTag(taskStore.selectedTask, id);
    }
};

const onUpdateTag = (newName: string, id: number) => {
    if (taskStore.selectedTask) {
        taskStore.updateTag(taskStore.selectedTask, newName, id);
    }
};

const onInsertTag = async (tag: string) => {
    if (taskStore.selectedTask) {
        await taskStore.addTag(taskStore.selectedTask, tag);
    }
};

const onAddTime = (minutes: number) => {
    if (taskStore.selectedTask) {
        taskStore.addTime(taskStore.selectedTask, minutes);
        taskStore.selectNextUrgentTask({
            currentTask: taskStore.selectedTask,
        });
    }
};

const onDestroyTask = () => {
    if (taskStore.selectedTask) {
        taskStore.destroyTask(taskStore.selectedTask);
    }
};

const assignee = computed(() => taskStore.selectedTask?.assignee);

const formattedDueDate = computed(() => {
    return formatDueDate(taskStore.selectedTask?.due_date);
});

// Update the selected task when it changes.
watch(
    [
        () => taskStore.selectedTask?.id,
        () => taskStore.selectedTask?.color,
        () => taskStore.selectedTask?.name,
        () => taskStore.selectedTask?.due_date,
        () => taskStore.selectedTask?.is_important,
        () => taskStore.selectedTask?.is_starred,
        () => taskStore.selectedTask?.status,
        () => taskStore.selectedTask?.assignee,
    ],
    (new_, old) => {
        const taskJustGotInitialized = !old.some(
            (value) => value !== undefined,
        );
        const taskJustChanged = new_[0] !== old[0];

        if (taskJustGotInitialized || taskJustChanged) return;

        if (taskStore.selectedTask) {
            taskStore.updateTask(taskStore.selectedTask);
        }
    },
);
</script>

<template>
    <BaseCard
        v-if="taskStore.selectedTask"
        class="@container/card flex gap-x-3 p-4"
        aria-label="Selected task card"
    >
        <!-- Status Toggles -->
        <div class="flex shrink-0 flex-col items-center gap-y-3">
            <ColorPickerPopover
                :selected-color="taskStore.selectedTask.color"
                @pick="(color) => (taskStore.selectedTask!.color = color)"
            >
                <div
                    v-if="taskStore.selectedTask.color !== EMPTY_TASK_COLOR"
                    class="h-4 w-4 rounded-full"
                    :style="{ backgroundColor: taskStore.selectedTask.color }"
                />

                <IconCircle v-else class="text-subtle" />
            </ColorPickerPopover>

            <button
                @click="
                    taskStore.selectedTask.is_starred =
                        !taskStore.selectedTask.is_starred
                "
            >
                <IconStarSolid
                    v-if="taskStore.selectedTask.is_starred"
                    class="text-subtle"
                />
                <IconStarOutline v-else class="text-subtle" />
            </button>

            <button
                @click="
                    taskStore.selectedTask.is_important =
                        !taskStore.selectedTask.is_important
                "
            >
                <IconWarningSolid
                    v-if="taskStore.selectedTask.is_important"
                    class="text-subtle"
                />
                <IconWarningOutline v-else class="text-subtle" />
            </button>
        </div>

        <!-- Featured Info -->
        <div class="grow">
            <time
                v-if="taskStore.selectedTask.due_date"
                class="sr-only"
                aria-label="Due date"
            >
                {{ formattedDueDate }}
            </time>

            <EditableText
                :title="formattedDueDate"
                class="mb-2 text-lg leading-none font-bold outline-hidden"
                v-model="taskStore.selectedTask.name"
                save-on-enter
                default-value="Untitled"
                role="textbox"
                :aria-label="`Task name: ${taskStore.selectedTask.name}`"
            />

            <EditableTagList
                :tags="taskStore.selectedTask.tags"
                @delete-tag="onDeleteTag"
                @update-tag="onUpdateTag"
                @insert-tag="onInsertTag"
            />
        </div>

        <!-- Meta -->
        <div
            class="flex shrink-0 flex-col items-end justify-between @xl/card:w-56"
        >
            <!-- Status Menu -->
            <div class="group flex w-full justify-end">
                <StatusMenu
                    class="hidden @3xl/main:flex"
                    @destroy="onDestroyTask"
                />

                <button
                    class="mr-1 flex @3xl/main:hidden"
                    @click="dialogStore.open('expanded-editor')"
                >
                    <IconMaximize />
                </button>
            </div>

            <!-- Time Adder Menu -->
            <div
                aria-label="Postpone task area"
                role="group"
                class="group relative flex w-full items-center justify-end py-4"
            >
                <div class="relative flex items-center">
                    <button label="Postpone task">
                        <IconAddTime class="text-subtle w-5.5" />
                    </button>
                    <div
                        role="menu"
                        label="Postpone task options"
                        class="invisible absolute right-full opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100"
                    >
                        <TimeAdderMenu
                            class="mt-1 bg-linear-to-r from-transparent to-[rgb(var(--theme-bg-surface))] to-10% py-2 pr-2 pl-10"
                            @add="onAddTime"
                        />
                    </div>
                </div>
            </div>

            <!-- Assignee Picker -->
            <section class="flex items-center gap-x-4">
                <StatusMenu
                    class="flex @3xl/main:hidden"
                    @destroy="onDestroyTask"
                />

                <UserSelectPopover
                    :selected-users="assignee ? [assignee] : []"
                    @add="onPickAssignee"
                    @remove="onRemoveAssignee"
                >
                    <span
                        class="text-subtle"
                        :aria-label="
                            assignee
                                ? `Change assignee: ${assignee.firstName} ${assignee.lastName || ''}`
                                : 'Set assignee'
                        "
                    >
                        <div
                            v-if="assignee"
                            class="h-5.5 w-5.5 shrink-0 overflow-hidden rounded-full bg-canvas"
                        >
                            <img
                                class="block h-full w-full object-cover"
                                :src="assignee.avatarUrl"
                                :alt="` Profile picture of ${assignee.firstName} ${assignee.lastName || ''}`"
                                :title="` Assignee: ${assignee.firstName} ${assignee.lastName || ''}`"
                            />
                        </div>
                        <span
                            v-else
                            title=" Set assignee"
                            class="block h-5.5 w-5.5"
                        >
                            <IconUserOutline />
                        </span>
                    </span>
                </UserSelectPopover>
            </section>
        </div>
    </BaseCard>
</template>
