import type { Editor } from '@tiptap/vue-3';
import type { ShallowRef } from 'vue';
import { ref } from 'vue';

// Module-level reactive state (singleton pattern)
const editor = ref<ShallowRef<Editor | undefined>>();

export function useEditorStore() {
    return { editor };
}
