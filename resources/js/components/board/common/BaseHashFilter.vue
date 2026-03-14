<script setup lang="ts">
import type { PropType } from 'vue';
import { onMounted, ref, watch } from 'vue';

import BaseHash from '@/components/board/common/BaseHash.vue';
import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import type { Tag } from '@/lib/board/types/models';
import type { PillVariant } from '@/lib/board/types/ui';
import {
    addTagIfNotExists,
    containsTag,
    removeTagIfExists,
} from '@/lib/board/utils/tasks';

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

const { filters } = useTaskStore();

watch(currentState, (index) => {
    if (states[index] === 'active') {
        addTagIfNotExists(filters.value.tags, props.tag);
        return;
    }

    if (states[index] === 'exclude') {
        removeTagIfExists(filters.value.tags, props.tag);
        addTagIfNotExists(filters.value.excludeTags, props.tag);
        return;
    }

    if (states[index] === 'neutral') {
        removeTagIfExists(filters.value.excludeTags, props.tag);
        return;
    }
});

const syncState = () => {
    if (containsTag(filters.value.tags, props.tag)) {
        currentState.value = states.indexOf('active');
        return;
    }

    if (containsTag(filters.value.excludeTags, props.tag)) {
        currentState.value = states.indexOf('exclude');
        return;
    }

    currentState.value = states.indexOf('neutral');
};

watch(() => filters.value.tags, syncState);
onMounted(syncState);
</script>

<template>
    <BaseHash :variant="variants[currentState]" @click="toggleState">
        {{ tag.name }}
    </BaseHash>
</template>
