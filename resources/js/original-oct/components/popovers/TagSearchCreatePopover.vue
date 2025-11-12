<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import type { PropType } from 'vue';
import { computed, onMounted, ref } from 'vue';

import BaseInput from '@/components/common/BaseInput.vue';
import IconCircleMinus from '@/components/icons/IconCircleMinus.vue';
import IconCirclePlus from '@/components/icons/IconCirclePlus.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconOptions from '@/components/icons/IconOptions.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import { restClient } from '@/lib/api';
import type { Tag } from '@/lib/types/models';
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';

const props = defineProps({
    addedTags: {
        type: Array as PropType<Tag[]>,
        required: true,
    },
});

const emit = defineEmits(['add', 'remove']);

const { tags } = storeToRefs(useTaskStore());

const query = ref('');
const filteredTags = computed(() => {
    const matchedTags = query.value
        ? tags.value.filter((tag) =>
              tag.name.toLowerCase().includes(query.value.toLowerCase()),
          )
        : tags.value;

    const sortedTags = matchedTags.sort((a, b) => {
        if (isTagAdded(a) && !isTagAdded(b)) return -1;
        if (!isTagAdded(a) && isTagAdded(b)) return 1;
        return 0;
    });

    return sortedTags;
});

const onClearInput = (inputRef: HTMLInputElement | null) => {
    if (inputRef) {
        query.value = '';
        inputRef.focus();
    }
};

const isTagAdded = (tag: Tag) => {
    return props.addedTags.some((tag_) => tag.name === tag_.name);
};

const onEnter = (close: () => void) => {
    if (query.value.trim()) {
        emit('add', query.value);
        query.value = '';
        close();
    }
};

onMounted(async () => {
    const { data } = await restClient.tags.getAll();
    tags.value = data;
});
</script>

<template>
    <Popover class="relative flex items-center" v-slot="{ close }">
        <PopoverButton class="outline-hidden" title="Add tag">
            <span class="block px-2 py-1">
                <IconOptions />
            </span>
        </PopoverButton>

        <PopoverPanel class="absolute top-[calc(100%+0.4rem)] -right-2 z-10">
            <div class="w-56 rounded-md bg-surface shadow-popover">
                <div class="p-3">
                    <BaseInput
                        placeholder="Search tag..."
                        v-model="query"
                        v-slot="{ inputRef }"
                        @keypress.enter="onEnter(close)"
                    >
                        <button
                            v-if="query.trim()"
                            class="relative -right-2 rounded-md p-2"
                            @click="onClearInput(inputRef)"
                        >
                            <IconClose />
                        </button>
                        <IconSearch v-else />
                    </BaseInput>
                </div>

                <ul class="flex max-h-44 flex-col overflow-y-auto">
                    <li
                        v-for="tag in filteredTags"
                        :key="tag.id"
                        class="flex cursor-pointer items-center justify-between px-3 py-1.5 leading-none"
                        :class="{
                            'bg-interactive-primary/10': isTagAdded(tag),
                        }"
                        @click="
                            isTagAdded(tag)
                                ? $emit('remove', tag)
                                : $emit('add', tag, true)
                        "
                    >
                        <!-- Info -->
                        <p>#{{ tag.name }}</p>

                        <!-- Action -->
                        <div class="shrink-0">
                            <IconCircleMinus
                                class="text-subtle"
                                v-if="isTagAdded(tag)"
                            />
                            <IconCirclePlus class="text-subtle" v-else />
                        </div>
                    </li>
                </ul>
            </div>
        </PopoverPanel>
    </Popover>
</template>
