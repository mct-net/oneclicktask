<script setup lang="ts">
import ContextMenu from '@/components/board/common/ContextMenu.vue';
import { useDialogStore } from '@/composables/board/stores/useDialogStore';

const dialogStore = useDialogStore();

const emit = defineEmits(['edit', 'delete']);

const onConfirmDelete = () => {
    emit('delete');
    dialogStore.closeLastOpened();
};

const onDelete = (close: () => void) => {
    dialogStore.open('confirm-delete-comment', onConfirmDelete);
    close();
};

const onEdit = (close: () => void) => {
    emit('edit');
    close();
};

const options = [
    {
        label: 'Edit',
        onClick: (args: any) => {
            onEdit(args);
        },
    },
    {
        label: 'Delete',
        onClick: (args: any) => {
            onDelete(args);
        },
    },
];
</script>

<template>
    <ContextMenu :options="options" />
</template>
