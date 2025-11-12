<script setup lang="ts">
import type { PropType } from 'vue';
import { onMounted, ref, watch } from 'vue';

import BaseHash from '@/components/common/BaseHash.vue';
import type { Tag } from '@/lib/types/models';
import type { PillVariant } from '@/lib/types/ui';
import {
    addTagIfNotExists,
    containsTag,
    removeTagIfExists,
} from '@/lib/utils/tasks';
import { useTaskStore } from '@/stores/task';

const props = defineProps({
    tag: {
        type: Object as PropType<Tag>,
        required: true,
    },
});

const states = ['neutral', 'active', 'exclude'];
const variants: PillVariant[] = ['default', 'contrast', 'error'];
const currentState = ref(0);

const toggleState = () => {
    currentState.value = (currentState.value + 1) % states.length;
};

const taskStorage = useTaskStore();
const { filters } = taskStorage;

watch(currentState, (index) => {
    if (states[index] === 'active') {
        addTagIfNotExists(filters.tags, props.tag);
        return;
    }

    if (states[index] === 'exclude') {
        removeTagIfExists(filters.tags, props.tag);
        addTagIfNotExists(filters.excludeTags, props.tag);
        return;
    }

    if (states[index] === 'neutral') {
        removeTagIfExists(filters.excludeTags, props.tag);
        return;
    }
});

const syncState = () => {
    if (containsTag(filters.tags, props.tag)) {
        currentState.value = states.indexOf('active');
        return;
    }

    if (containsTag(filters.excludeTags, props.tag)) {
        currentState.value = states.indexOf('exclude');
        return;
    }

    currentState.value = states.indexOf('neutral');
};

watch(() => filters.tags, syncState);
onMounted(syncState);
</script>

<template>
    <BaseHash :variant="variants[currentState]" @click="toggleState">
        {{ tag.name }}
    </BaseHash>
</template>
