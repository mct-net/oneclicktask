<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    defaultValue: {
        type: String,
        default: '',
    },
    saveOnEnter: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue', 'backspace-with-empty-text']);

const nameInputRef = ref<HTMLInputElement | null>(null);
const previousValue = ref<string | undefined>(props.modelValue);

const updateName = () => {
    if (!nameInputRef.value) {
        return;
    }

    if (!nameInputRef.value.innerText.trim()) {
        nameInputRef.value.innerText = props.defaultValue;
    }

    emit('update:modelValue', nameInputRef.value.innerText);
};

const onEnter = () => {
    if (props.saveOnEnter) {
        updateName();
        nameInputRef.value?.blur();
    }
};

const onBackspace = (event: KeyboardEvent) => {
    if (
        event.key === 'Backspace' &&
        !previousValue.value &&
        !nameInputRef.value?.innerText
    ) {
        emit('backspace-with-empty-text');
    }

    previousValue.value = nameInputRef.value?.innerText;
};
</script>

<template>
    <p
        ref="nameInputRef"
        contenteditable
        @blur="updateName"
        @keyup="onBackspace"
        @keypress.enter.prevent="onEnter"
        class="cursor-pointer outline-hidden"
    >
        {{ modelValue }}
    </p>
</template>
