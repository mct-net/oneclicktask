<script setup lang="ts">
import { storeToRefs } from 'pinia';

import BaseHashFilter from '@/components/common/BaseHashFilter.vue';
import IconCircleCheckOutline from '@/components/icons/IconCircleCheckOutline.vue';
import IconCircleCheckSolid from '@/components/icons/IconCircleCheckSolid.vue';
import IconCircleCloseOutline from '@/components/icons/IconCircleCloseOutline.vue';
import IconCircleCloseSolid from '@/components/icons/IconCircleCloseSolid.vue';
import IconCirclePlayOutline from '@/components/icons/IconCirclePlayOutline.vue';
import IconCirclePlaySolid from '@/components/icons/IconCirclePlaySolid.vue';
import IconEmptyCircle from '@/components/icons/IconEmptyCircle.vue';
import IconStarOutline from '@/components/icons/IconStarOutline.vue';
import IconStarSolid from '@/components/icons/IconStarSolid.vue';
import IconTelescopeOutline from '@/components/icons/IconTelescopeOutline.vue';
import IconTelescopeSolid from '@/components/icons/IconTelescopeSolid.vue';
import IconTrashOutline from '@/components/icons/IconTrashOutline.vue';
import IconTrashSolid from '@/components/icons/IconTrashSolid.vue';
import IconUserOutline from '@/components/icons/IconUserOutline.vue';
import IconUserSolid from '@/components/icons/IconUserSolid.vue';
import IconWarningOutline from '@/components/icons/IconWarningOutline.vue';
import IconWarningSolid from '@/components/icons/IconWarningSolid.vue';
import ColorPickerPopover from '@/components/popovers/ColorPickerPopover.vue';
import TagSearchCreatePopover from '@/components/popovers/TagSearchCreatePopover.vue';
import UserSelectPopover from '@/components/popovers/UserSelectPopover.vue';

import { EMPTY_TASK_COLOR } from '@/lib/constants';
import type { Tag, User } from '@/lib/types/models';
import { addTagIfNotExists, removeTagIfExists } from '@/lib/utils/tasks';
import { getStatusLabel, useTaskStore } from '@/stores/task';
import { useUIStore } from '@/stores/ui';

/*-------------------------------------
  State
-------------------------------------*/
const taskStore = useTaskStore();
const uiStore = useUIStore();

const { filters } = storeToRefs(taskStore);
const { quickTagFilters } = storeToRefs(uiStore);

/*-------------------------------------
  Methods
-------------------------------------*/
const onAddTag = (tag: Tag, activate?: boolean) => {
    addTagIfNotExists(quickTagFilters.value, tag);

    if (activate) {
        filters.value.tags.push(tag);
    }
};

const onRemoveTag = (tag: Tag) => {
    removeTagIfExists(quickTagFilters.value, tag);
    filters.value.tags = filters.value.tags.filter((t) => t.id !== tag.id);
    filters.value.excludeTags = filters.value.excludeTags.filter(
        (t) => t.id !== tag.id,
    );
};

const onAddCollaborator = (user: User) => {
    filters.value.assignees.push(user);
};

const onRemoveCollaborator = (user: User) => {
    filters.value.assignees = filters.value.assignees.filter(
        (u) => u.id !== user.id,
    );
};
</script>

<template>
    <div
        class="flex flex-col items-end justify-between gap-x-5 gap-y-2.5 @5xl/main:flex-row @5xl/main:items-start"
        role="group"
        aria-label="Filters Bar"
    >
        <!-- Left -->
        <div
            class="flex h-6 w-full items-center justify-start gap-x-3 @5xl/main:w-auto"
        >
            <ColorPickerPopover
                :selected-color="filters.color"
                include-transparent
                @pick="(color) => (filters.color = color)"
            >
                <div
                    v-if="filters.color !== EMPTY_TASK_COLOR"
                    class="h-4 w-4 rounded-full"
                    :style="{ backgroundColor: filters.color }"
                />
                <IconEmptyCircle v-else class="text-subtle" />
            </ColorPickerPopover>

            <button
                title="Starred"
                @click="filters.isStarred = !filters.isStarred"
            >
                <IconStarSolid v-if="filters.isStarred" class="text-subtle" />
                <IconStarOutline v-else class="text-subtle" />
            </button>

            <button
                title="Important"
                @click="filters.isImportant = !filters.isImportant"
            >
                <IconWarningSolid
                    v-if="filters.isImportant"
                    class="text-subtle"
                />
                <IconWarningOutline v-else class="text-subtle" />
            </button>

            <div class="border-subtle h-5 border-l" />

            <button
                :title="getStatusLabel('in_progress')"
                @click="filters.inProgress = !filters.inProgress"
                class="text-subtle"
            >
                <IconCirclePlaySolid v-if="filters.inProgress" />
                <IconCirclePlayOutline v-else />
            </button>

            <button
                :title="getStatusLabel('failed')"
                @click="
                    filters.failedOrDuplicated = !filters.failedOrDuplicated
                "
                class="text-subtle"
            >
                <IconCircleCloseSolid v-if="filters.failedOrDuplicated" />
                <IconCircleCloseOutline v-else />
            </button>

            <button
                :title="getStatusLabel('done')"
                @click="filters.done = !filters.done"
                class="text-subtle"
            >
                <IconCircleCheckSolid v-if="filters.done" />
                <IconCircleCheckOutline v-else />
            </button>

            <div class="border-subtle h-5 border-l" />

            <button
                :title="getStatusLabel('backlog')"
                @click="filters.backlog = !filters.backlog"
                class="text-subtle"
            >
                <IconTelescopeSolid v-if="filters.backlog" />
                <IconTelescopeOutline v-else />
            </button>

            <button
                :title="getStatusLabel('trashed')"
                @click="filters.trashed = !filters.trashed"
                class="text-subtle"
            >
                <IconTrashSolid v-if="filters.trashed" />
                <IconTrashOutline v-else />
            </button>

            <div class="border-subtle h-5 border-l" />

            <UserSelectPopover
                :selected-users="filters.assignees || []"
                with-unassigned-option
                @add="onAddCollaborator"
                @remove="onRemoveCollaborator"
            >
                <span class="text-subtle" title=" Assignees">
                    <IconUserSolid v-if="filters.assignees.length" />
                    <IconUserOutline v-else />
                </span>
            </UserSelectPopover>
        </div>

        <!-- Right -->
        <div class="flex items-start gap-x-2">
            <div
                class="flex grow flex-wrap justify-end gap-1 @5xl/main:max-w-112.5"
            >
                <BaseHashFilter
                    v-for="tag in uiStore.quickTagFilters"
                    :key="tag.id"
                    :tag="tag"
                />
            </div>

            <TagSearchCreatePopover
                :added-tags="uiStore.quickTagFilters"
                @add="onAddTag"
                @remove="onRemoveTag"
            />
        </div>
    </div>
</template>
