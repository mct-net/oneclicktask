import { getKeys } from '@/lib/utils/object';
import { defineStore } from 'pinia';

export const DIALOGS_AND_MENUS = {
    'confirm-delete-comment': false,
    'confirm-delete-file': false,
    'expanded-editor': false,
};

export const useDialogStore = defineStore({
    id: 'dialog',

    state: () => {
        return {
            ...DIALOGS_AND_MENUS,
            stack: [] as (keyof typeof DIALOGS_AND_MENUS)[],
            callback: () => {},
        };
    },

    getters: {
        lastOpened(state): keyof typeof DIALOGS_AND_MENUS | undefined {
            return state.stack[this.stack.length - 1];
        },
    },

    actions: {
        open(
            dialog: keyof typeof DIALOGS_AND_MENUS,
            callback?: (args?: any) => any,
        ) {
            this[dialog] = true;
            this.stack.push(dialog);

            if (callback) {
                this.callback = callback;
            }
        },

        close(dialog: keyof typeof DIALOGS_AND_MENUS) {
            this[dialog] = false;
            this.callback = () => {};
        },

        closeLastOpened() {
            const dialog = this.stack.pop();
            if (dialog) this.close(dialog);
        },

        toggle(dialog: keyof typeof DIALOGS_AND_MENUS) {
            this[dialog] = !this[dialog];
        },

        reset() {
            const dialogs = getKeys(DIALOGS_AND_MENUS);
            dialogs.forEach((dialog) => this.close(dialog));
        },
    },
});
