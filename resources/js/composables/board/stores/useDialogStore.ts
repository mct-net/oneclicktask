import { getKeys } from '@/lib/board/utils/object';
import { computed, reactive } from 'vue';

export const DIALOGS_AND_MENUS = {
    'confirm-delete-comment': false,
    'confirm-delete-file': false,
    'expanded-editor': false,
} as const;

// Module-level reactive state (singleton pattern)
const state = reactive({
    ...DIALOGS_AND_MENUS,
    stack: [] as (keyof typeof DIALOGS_AND_MENUS)[],
    callback: () => {},
});

export function useDialogStore() {
    const lastOpened = computed(
        () =>
            state.stack[state.stack.length - 1] as
                | keyof typeof DIALOGS_AND_MENUS
                | undefined,
    );

    const open = (
        dialog: keyof typeof DIALOGS_AND_MENUS,
        callback?: (args?: any) => any,
    ) => {
        (state as any)[dialog] = true;
        state.stack.push(dialog);

        if (callback) {
            state.callback = callback;
        }
    };

    const close = (dialog: keyof typeof DIALOGS_AND_MENUS) => {
        (state as any)[dialog] = false;
        state.callback = () => {};
    };

    const closeLastOpened = () => {
        const dialog = state.stack.pop();
        if (dialog) close(dialog);
    };

    const toggle = (dialog: keyof typeof DIALOGS_AND_MENUS) => {
        (state as any)[dialog] = !(state as any)[dialog];
    };

    const reset = () => {
        const dialogs = getKeys(DIALOGS_AND_MENUS);
        dialogs.forEach((dialog) => close(dialog));
    };

    return {
        state,
        lastOpened,
        open,
        close,
        closeLastOpened,
        toggle,
        reset,
    };
}
