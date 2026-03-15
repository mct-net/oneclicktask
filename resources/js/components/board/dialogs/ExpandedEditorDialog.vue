<script setup lang="ts">
import BaseDialog from '@/components/board/common/BaseDialog.vue';
import SelectedTaskPanelDiscussion from '../SelectedTaskPanelDiscussion.vue';
import SelectedTaskPanelEditor from '../SelectedTaskPanelEditor.vue';
</script>

<template>
    <BaseDialog dialog-id="expanded-editor" v-slot="{ close }">
        <div
            class="mx-3 h-screen grow justify-center gap-x-3 overflow-y-auto py-4 @4xl/main:flex @4xl/main:h-auto @4xl/main:p-0"
            @click.self="close"
        >
            <div
                class="flex min-h-80 w-full flex-col overflow-hidden rounded-md @4xl/main:h-[calc(100vh-1rem)] @4xl/main:max-w-170"
            >
                <SelectedTaskPanelEditor is-expanded />
            </div>
            <div
                class="mt-0.5 flex w-full shrink-0 items-stretch overflow-hidden rounded-md @4xl/main:mt-0 @4xl/main:h-[calc(100vh-1rem)] @4xl/main:max-w-96"
            >
                <SelectedTaskPanelDiscussion class="w-full" is-expanded />
            </div>
        </div>
    </BaseDialog>
</template>
