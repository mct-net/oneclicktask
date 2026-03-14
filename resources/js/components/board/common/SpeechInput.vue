<script setup lang="ts">
import TextEditorAction from '@/components/board/common/TextEditorAction.vue';
import IconMic from '@/components/board/icons/IconMic.vue';
import IconRec from '@/components/board/icons/IconRec.vue';
import { useSpeechRecognition, whenever } from '@vueuse/core';
import { ref } from 'vue';

/*-------------------------------------
  State
-------------------------------------*/
const props = defineProps<{
    modelValue: string;
}>();

const { isSupported, isListening, isFinal, result, start, stop } =
    useSpeechRecognition();

const originalValue = ref(props.modelValue);
const lastValue = ref();
const isFirst = ref(true);

/*-------------------------------------
  Emits
-------------------------------------*/
const emit = defineEmits<{
    'update:modelValue': [string];
}>();

/*-------------------------------------
  Methods
-------------------------------------*/
const onStart = () => {
    originalValue.value = props.modelValue;
    start();
};

/*-------------------------------------
  Lifecycle
-------------------------------------*/
whenever(result, (value) => {
    if (!isFinal.value) {
        if (isFirst.value) {
            originalValue.value = props.modelValue;
            isFirst.value = false;
        }

        emit('update:modelValue', originalValue.value + value);
    } else {
        lastValue.value = value;
        originalValue.value += value;
        emit('update:modelValue', originalValue.value);
        isFirst.value = true;
    }
});

/*-------------------------------------
  Exposed
-------------------------------------*/
defineExpose({
    stopListening: stop,
});
</script>

<template>
    <TextEditorAction
        v-if="isSupported"
        @click="isListening ? stop() : onStart()"
    >
        <span class="relative">
            <IconMic />

            <IconRec v-if="isListening" class="absolute -right-1 -bottom-1" />
        </span>
    </TextEditorAction>
</template>
