import type { Editor } from '@tiptap/vue-3';
import { defineStore } from 'pinia';
import type { ShallowRef } from 'vue';
import { ref } from 'vue';

export const useEditorStore = defineStore('editor', () => {
    const editor = ref<ShallowRef<Editor | undefined>>();
    return { editor };
});
