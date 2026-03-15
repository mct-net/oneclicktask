<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import type { PropType } from 'vue';
import { computed, ref } from 'vue';

import BaseInput from '@/components/board/common/BaseInput.vue';
import IconCircleMinus from '@/components/board/icons/IconCircleMinus.vue';
import IconCirclePlus from '@/components/board/icons/IconCirclePlus.vue';
import IconClose from '@/components/board/icons/IconClose.vue';
import IconOptions from '@/components/board/icons/IconOptions.vue';
import IconSearch from '@/components/board/icons/IconSearch.vue';
import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import { useToast } from '@/composables/useToast';
import { restClient } from '@/lib/board/api';
import type { Tag } from '@/lib/board/types/models';
import { safely } from '@/lib/board/utils/error';

const props = defineProps({
    addedTags: {
        type: Array as PropType<Tag[]>,
        required: true,
    },
    placement: {
        type: String as PropType<'left' | 'right'>,
        default: 'right',
    },
});

const emit = defineEmits(['add', 'remove']);

// Tags are loaded by the parent Board component and stored in the task store
const { tags } = useTaskStore();

const query = ref('');
const isCreating = ref(false);

const showError = (message: string) => {
    const { toast } = useToast();
    toast({ message, type: 'error' });
};

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

const onEnter = async (close: () => void) => {
    if (!query.value.trim() || isCreating.value) {
        return;
    }

    const tagName = query.value.trim();

    // Check if tag already exists
    const existingTag = tags.value.find(
        (tag) => tag.name.toLowerCase() === tagName.toLowerCase(),
    );

    if (existingTag) {
        emit('add', existingTag, true);
        query.value = '';
        close();
        return;
    }

    // Create new tag via API
    isCreating.value = true;

    const [response, err] = await safely(
        restClient.tags.createStandalone(tagName),
    );

    if (err) {
        showError('Failed to create tag. Please try again.');
        isCreating.value = false;
        return;
    }

    const newTag: Tag = response.data;

    // Add to tags list
    tags.value.push(newTag);

    // Emit to parent
    emit('add', newTag, true);

    query.value = '';
    isCreating.value = false;
    close();
};
</script>

<template>
    <Popover class="relative flex items-center" v-slot="{ close }">
        <PopoverButton class="outline-hidden" title="Add tag" as="template">
            <slot name="trigger">
                <button class="outline-hidden" title="Add tag">
                    <span class="block px-2 py-1">
                        <IconOptions />
                    </span>
                </button>
            </slot>
        </PopoverButton>

        <PopoverPanel
            class="absolute top-[calc(100%+0.4rem)] z-10"
            :class="placement === 'left' ? '-left-2' : '-right-2'"
        >
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
                                class="text-muted-foreground"
                                v-if="isTagAdded(tag)"
                            />
                            <IconCirclePlus
                                class="text-muted-foreground"
                                v-else
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </PopoverPanel>
    </Popover>
</template>
