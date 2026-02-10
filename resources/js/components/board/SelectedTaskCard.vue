<script setup lang="ts">
import BaseCard from '@/components/board/common/BaseCard.vue';
import EditableText from '@/components/board/common/EditableText.vue';
import TimeAdderMenu from '@/components/board/common/TimeAdderMenu.vue';
import EditableTagList from '@/components/board/EditableTagList.vue';
import IconAddTime from '@/components/board/icons/IconAddTime.vue';
import IconCircle from '@/components/board/icons/IconCircle.vue';
import IconMaximize from '@/components/board/icons/IconMaximize.vue';
import IconStarOutline from '@/components/board/icons/IconStarOutline.vue';
import IconStarSolid from '@/components/board/icons/IconStarSolid.vue';
import IconTagOutline from '@/components/board/icons/IconTagOutline.vue';
import IconUserOutline from '@/components/board/icons/IconUserOutline.vue';
import IconWarningOutline from '@/components/board/icons/IconWarningOutline.vue';
import IconWarningSolid from '@/components/board/icons/IconWarningSolid.vue';
import ColorPickerPopover from '@/components/board/popovers/ColorPickerPopover.vue';
import TagSearchCreatePopover from '@/components/board/popovers/TagSearchCreatePopover.vue';
import UserSelectPopover from '@/components/board/popovers/UserSelectPopover.vue';
import StatusMenu from '@/components/board/StatusMenu.vue';
import UserInfo from '@/components/core/UserInfo.vue';
import { useDialogStore } from '@/composables/board/stores/useDialogStore';
import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import { EMPTY_TASK_COLOR } from '@/lib/board/constants';
import type { Tag } from '@/lib/board/types/models';
import { formatDueDate } from '@/lib/board/utils/date';
import type { User } from '@/types';
import { computed, watch } from 'vue';

const {
    selectedTask,
    updateTask,
    destroyTask,
    addTag,
    removeTag,
    addTime,
    selectNextUrgentTask,
} = useTaskStore();
const dialogStore = useDialogStore();

const onPickAssignee = (user: User) => {
    if (selectedTask.value) {
        selectedTask.value.assignee = user;
    }
};

const onRemoveAssignee = () => {
    if (selectedTask.value) {
        selectedTask.value.assignee = undefined;
    }
};

const onAddTag = async (tag: Tag) => {
    if (selectedTask.value) {
        await addTag(selectedTask.value, tag.name);
    }
};

const onRemoveTag = (tag: Tag) => {
    if (selectedTask.value) {
        removeTag(selectedTask.value, tag.id);
    }
};

const onAddTime = async (minutes: number) => {
    if (selectedTask.value) {
        await addTime(selectedTask.value, minutes);
        selectNextUrgentTask({
            currentTask: selectedTask.value,
        });
    }
};

const onDestroyTask = () => {
    if (selectedTask.value) {
        destroyTask(selectedTask.value);
    }
};

const assignee = computed(() => selectedTask.value?.assignee);

const formattedDueDate = computed(() => {
    return formatDueDate(selectedTask.value?.due_date);
});

// Update the selected task when it changes.
watch(
    [
        () => selectedTask.value?.id,
        () => selectedTask.value?.color,
        () => selectedTask.value?.name,
        () => selectedTask.value?.due_date,
        () => selectedTask.value?.is_important,
        () => selectedTask.value?.is_starred,
        () => selectedTask.value?.status,
        () => selectedTask.value?.assignee,
    ],
    (new_, old) => {
        const taskJustGotInitialized = !old.some(
            (value) => value !== undefined,
        );
        const taskJustChanged = new_[0] !== old[0];

        if (taskJustGotInitialized || taskJustChanged) return;

        if (selectedTask.value) {
            updateTask(selectedTask.value);
        }
    },
);
</script>

<template>
    <BaseCard
        v-if="selectedTask"
        class="@container/card flex gap-x-3 p-4"
        aria-label="Selected task card"
    >
        <!-- Status Toggles -->
        <div class="flex shrink-0 flex-col items-center gap-y-3">
            <ColorPickerPopover
                :selected-color="selectedTask.color"
                @pick="(color) => (selectedTask!.color = color)"
            >
                <div
                    v-if="selectedTask.color !== EMPTY_TASK_COLOR"
                    class="h-4 w-4 rounded-full"
                    :style="{ backgroundColor: selectedTask.color }"
                />

                <IconCircle v-else class="text-muted-foreground" />
            </ColorPickerPopover>

            <button @click="selectedTask.is_starred = !selectedTask.is_starred">
                <IconStarSolid
                    v-if="selectedTask.is_starred"
                    class="text-muted-foreground"
                />
                <IconStarOutline v-else class="text-muted-foreground" />
            </button>

            <button
                @click="selectedTask.is_important = !selectedTask.is_important"
            >
                <IconWarningSolid
                    v-if="selectedTask.is_important"
                    class="text-muted-foreground"
                />
                <IconWarningOutline v-else class="text-muted-foreground" />
            </button>

            <TagSearchCreatePopover
                placement="left"
                :added-tags="selectedTask.tags"
                @add="onAddTag"
                @remove="onRemoveTag"
            >
                <template #trigger>
                    <button aria-label="Manage tags">
                        <IconTagOutline class="text-muted-foreground" />
                    </button>
                </template>
            </TagSearchCreatePopover>
        </div>

        <!-- Featured Info -->
        <div class="grow">
            <time
                v-if="selectedTask.due_date"
                class="sr-only"
                aria-label="Due date"
            >
                {{ formattedDueDate }}
            </time>

            <EditableText
                :title="formattedDueDate"
                class="mb-2 text-lg leading-none font-bold outline-hidden"
                v-model="selectedTask.name"
                save-on-enter
                default-value="Untitled"
                role="textbox"
                :aria-label="`Task name: ${selectedTask.name}`"
            />

            <EditableTagList :tags="selectedTask.tags" />
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
                        <IconAddTime class="w-5.5 text-muted-foreground" />
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
                        class="text-muted-foreground"
                        :aria-label="
                            assignee
                                ? `Change assignee: ${assignee.name}`
                                : 'Set assignee'
                        "
                    >
                        <UserInfo
                            v-if="assignee"
                            :user="assignee"
                            class="h-5.5 w-5.5 shrink-0 rounded-full text-xs"
                        />
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
