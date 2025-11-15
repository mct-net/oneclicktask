<script setup lang="ts">
import BaseHashFilter from '@/components/board/common/BaseHashFilter.vue';
import IconCircleCheckOutline from '@/components/board/icons/IconCircleCheckOutline.vue';
import IconCircleCheckSolid from '@/components/board/icons/IconCircleCheckSolid.vue';
import IconCircleCloseOutline from '@/components/board/icons/IconCircleCloseOutline.vue';
import IconCircleCloseSolid from '@/components/board/icons/IconCircleCloseSolid.vue';
import IconCirclePlayOutline from '@/components/board/icons/IconCirclePlayOutline.vue';
import IconCirclePlaySolid from '@/components/board/icons/IconCirclePlaySolid.vue';
import IconEmptyCircle from '@/components/board/icons/IconEmptyCircle.vue';
import IconStarOutline from '@/components/board/icons/IconStarOutline.vue';
import IconStarSolid from '@/components/board/icons/IconStarSolid.vue';
import IconTelescopeOutline from '@/components/board/icons/IconTelescopeOutline.vue';
import IconTelescopeSolid from '@/components/board/icons/IconTelescopeSolid.vue';
import IconTrashOutline from '@/components/board/icons/IconTrashOutline.vue';
import IconTrashSolid from '@/components/board/icons/IconTrashSolid.vue';
import IconUserOutline from '@/components/board/icons/IconUserOutline.vue';
import IconUserSolid from '@/components/board/icons/IconUserSolid.vue';
import IconWarningOutline from '@/components/board/icons/IconWarningOutline.vue';
import IconWarningSolid from '@/components/board/icons/IconWarningSolid.vue';
import ColorPickerPopover from '@/components/board/popovers/ColorPickerPopover.vue';
import TagSearchCreatePopover from '@/components/board/popovers/TagSearchCreatePopover.vue';
import UserSelectPopover from '@/components/board/popovers/UserSelectPopover.vue';

import {
    getStatusLabel,
    useTaskStore,
} from '@/composables/board/stores/useTaskStore';
import { useUIStore } from '@/composables/board/stores/useUIStore';
import { EMPTY_TASK_COLOR } from '@/lib/board/constants';
import type { Tag, User } from '@/lib/board/types/models';
import { addTagIfNotExists, removeTagIfExists } from '@/lib/board/utils/tasks';

/*-------------------------------------
  State
-------------------------------------*/
const taskStore = useTaskStore();
const uiStore = useUIStore();

const { filters } = taskStore;
const { quickTagFilters } = uiStore;

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
                    v-for="tag in uiStore.quickTagFilters.value"
                    :key="tag.id"
                    :tag="tag"
                />
            </div>

            <TagSearchCreatePopover
                :added-tags="uiStore.quickTagFilters.value"
                @add="onAddTag"
                @remove="onRemoveTag"
            />
        </div>
    </div>
</template>
