<script setup lang="ts">
import { ref, watch } from 'vue';

import BaseInput from '@/components/board/common/BaseInput.vue';
import IconClose from '@/components/board/icons/IconClose.vue';
import IconSearch from '@/components/board/icons/IconSearch.vue';
import { useTaskStore } from '@/composables/board/stores/useTaskStore';

const taskStore = useTaskStore();
const { filters } = taskStore;
const search = ref('');

const updateFilters = () => {
    let cleanSearch = search.value.trim();

    // Extract excluded hash tags from search input.
    const excludedTags = cleanSearch.match(/-#\w+/g);

    // Remove excluded hash tags from search input.
    cleanSearch = cleanSearch.replace(/-#\w+/g, '').trim();

    // Extract normal hash tags from search input.
    const tags = cleanSearch.match(/#\w+/g);

    // Remove normal hash tags from search input.
    cleanSearch = cleanSearch.replace(/#\w+/g, '').trim();

    // Update filters.
    if (tags) {
        filters.value.searchedTags.clear();
        tags.forEach((tag) => {
            filters.value.searchedTags.add(tag.replace('#', ''));
        });
    } else {
        filters.value.searchedTags.clear();
    }

    if (excludedTags) {
        filters.value.searchedExcludeTags.clear();
        excludedTags.forEach((tag) => {
            filters.value.searchedExcludeTags.add(tag.replace('-#', ''));
        });
    } else {
        filters.value.searchedExcludeTags.clear();
    }

    filters.value.search = cleanSearch;
};

const onSearch = () => {
    updateFilters();
};

const onEnter = () => {
    taskStore.addTask(search.value);
    taskStore.resetFilters();
};

const onClearInput = (inputRef: HTMLInputElement | null) => {
    search.value = '';
    inputRef?.focus();
};

watch(search, onSearch);
watch(
    () => filters.value.search,
    () => {
        search.value = filters.value.search;
    },
);
</script>

<template>
    <div class="flex items-center gap-x-1">
        <BaseInput
            v-model="search"
            placeholder="Find or create..."
            @enter="onEnter"
            v-slot="{ inputRef }"
        >
            <button
                v-if="search.trim()"
                class="relative -right-2 rounded-md p-2"
                @click="onClearInput(inputRef)"
            >
                <IconClose />
            </button>
            <IconSearch v-else />
        </BaseInput>
    </div>
</template>
