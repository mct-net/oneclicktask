<script setup lang="ts">
import BaseDialog from '@/components/board/common/BaseDialog.vue';
import type { PropType } from 'vue';

import type { DIALOGS_AND_MENUS } from '@/composables/board/stores/useDialogStore';

defineProps({
    dialogId: {
        type: String as PropType<keyof typeof DIALOGS_AND_MENUS>,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    confirmationButtonLabel: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <BaseDialog :dialog-id="dialogId" v-slot="{ close, confirm }">
        <div class="rounded-md bg-surface px-7 py-5">
            <p class="text-base font-bold">{{ title }}</p>
            <p class="mt-1 text-sm">{{ description }}</p>

            <div class="mt-3 flex justify-end gap-x-5 font-medium">
                <button class="text-error" @click="confirm">
                    {{ confirmationButtonLabel }}
                </button>
                <button
                    class="rounded-md border px-3 py-2 leading-none"
                    @click="close"
                >
                    Cancel
                </button>
            </div>
        </div>
    </BaseDialog>
</template>
