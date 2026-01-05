<script setup lang="ts">
import { ref, useSlots } from 'vue';

defineProps({
    modelValue: {
        type: [String, Number],
        required: true,
    },
    placeholder: {
        type: String,
        default: '',
    },
});

const slots = useSlots();
const inputRef = ref<HTMLInputElement | null>(null);

defineEmits(['update:model-value', 'enter']);
</script>

<template>
    <div class="relative flex h-fit w-full rounded-md border">
        <input
            ref="inputRef"
            class="h-full w-full grow rounded-md bg-surface px-4 py-3"
            :class="{ 'pr-12': slots.default }"
            type="text"
            :placeholder="placeholder"
            :aria-label="placeholder"
            :value="modelValue"
            @input="
                $emit(
                    'update:model-value',
                    ($event.target as HTMLInputElement).value,
                )
            "
            @keydown.enter="$emit('enter')"
        />

        <div
            v-if="slots.default"
            class="absolute top-0 right-4 flex h-full items-center"
        >
            <slot :input-ref="inputRef" />
        </div>
    </div>
</template>
