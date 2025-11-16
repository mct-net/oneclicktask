<script setup lang="ts">
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

defineEmits(['update:model-value']);
</script>

<template>
    <div class="relative flex h-fit w-full rounded-md border">
        <textarea
            class="h-full w-full grow rounded-md bg-surface px-4 py-3"
            type="text"
            :placeholder="placeholder"
            :value="modelValue"
            @input="
                $emit(
                    'update:model-value',
                    ($event.target as HTMLInputElement).value,
                )
            "
        />
    </div>
</template>
