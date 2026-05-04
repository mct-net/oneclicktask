<script setup lang="ts">
import { autoUpdate, hide, offset, useFloating } from '@floating-ui/vue';
import { useElementHover } from '@vueuse/core';
import type { PropType } from 'vue';
import { computed, ref } from 'vue';

import ContextMenu from '@/components/board/common/ContextMenu.vue';
import IconFileGeneric from '@/components/board/icons/IconFileGeneric.vue';
import IconFileImage from '@/components/board/icons/IconFileImage.vue';

import { useDialogStore } from '@/composables/board/stores/useDialogStore';
import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import { IMAGE_EXTENSIONS } from '@/lib/board/constants';
import type { Task } from '@/lib/board/types/models';

const dialogStore = useDialogStore();

const props = defineProps({
    task: {
        type: Object as PropType<Task>,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

/*-------------------------------------
  Context Menu
-------------------------------------*/
const contextMenu = [
    {
        label: 'Download',
        onClick: async (close: () => void) => {
            close();
            const url = await useTaskStore().getFileDownloadURL({
                task: props.task,
                fileId: props.id,
            });
            window.open(url, '_blank');
        },
    },
    {
        label: 'Delete',
        onClick: (close: () => void) => {
            dialogStore.open('confirm-delete-file', () => {
                close();
                useTaskStore().removeFile({
                    task: props.task,
                    fileId: props.id,
                });
            });
        },
    },
];

/*-------------------------------------
  Thumbnail
-------------------------------------*/
const thumbnailRef = ref();
const zoomedThumbnailRef = ref();

const isThumbnailHovered = useElementHover(thumbnailRef);
const isZoomedThumbnailHovered = useElementHover(zoomedThumbnailRef);

const { floatingStyles, middlewareData } = useFloating(
    thumbnailRef,
    zoomedThumbnailRef,
    {
        whileElementsMounted: autoUpdate,
        middleware: [
            hide(),
            offset(
                ({ rects }) =>
                    -rects.reference.height / 2 - rects.floating.height / 2,
            ),
        ],
    },
);

const areThumbnailsHovered = computed(
    () => isThumbnailHovered.value || isZoomedThumbnailHovered.value,
);

const isImage = computed(
    () =>
        IMAGE_EXTENSIONS.includes(props.type) ||
        IMAGE_EXTENSIONS.some((ext) => props.name.endsWith(ext)),
);

/*-------------------------------------
  Overlay
-------------------------------------*/
const isOverlayOpen = ref(false);
</script>

<template>
    <article
        class="@container w-fit min-w-[18rem] rounded-md bg-interactive-secondary"
        :title="name"
    >
        <!-- Header -->
        <div class="flex gap-x-2 px-2">
            <IconFileImage v-if="isImage" class="my-2 shrink-0" />
            <IconFileGeneric v-else class="my-2 shrink-0" />

            <!-- Separator -->
            <div class="w-px shrink-0 bg-surface" />

            <div class="grow overflow-hidden py-2">
                <p class="line-clamp-1">
                    {{ name }}
                </p>
            </div>

            <ContextMenu class="shrink-0" :options="contextMenu" />
        </div>

        <!-- Preview -->
        <div
            v-show="isImage"
            ref="thumbnailRef"
            class="relative hidden h-32 cursor-pointer p-0.5 pt-0 @[18rem]:block"
            @click="isOverlayOpen = true"
        >
            <img
                v-if="isImage"
                :src="url"
                alt="File preview"
                class="h-full w-full rounded-b-md object-cover"
            />

            <!-- Zoomed Preview -->
            <Teleport to="body">
                <div
                    ref="zoomedThumbnailRef"
                    :style="
                        areThumbnailsHovered && {
                            ...floatingStyles,
                            visibility: middlewareData.hide?.referenceHidden
                                ? 'hidden'
                                : 'visible',
                        }
                    "
                    :class="{ hidden: !areThumbnailsHovered }"
                    class="cursor-pointer"
                    @click="isOverlayOpen = true"
                >
                    <img
                        v-if="isImage"
                        :src="url"
                        alt="File preview"
                        class="max-h-[900px] max-w-[900px] rounded-md object-contain"
                    />
                </div>
            </Teleport>
        </div>
    </article>

    <!-- Overlay -->
    <Teleport to="body">
        <div
            v-if="isOverlayOpen"
            class="bg-black/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
            @click="isOverlayOpen = false"
        >
            <button
                class="bg-white/20 text-white hover:bg-white/40 absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full"
                @click="isOverlayOpen = false"
            >
                ✕
            </button>
            <img
                :src="url"
                :alt="name"
                class="max-h-[70vh] max-w-[70vw] rounded-md object-contain"
                @click.stop
            />
        </div>
    </Teleport>
</template>
