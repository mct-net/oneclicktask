import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import {
    useDropZone as useVueUseDropZone,
    useFileDialog as useVueUseFileDialog,
} from '@vueuse/core';
import { ref } from 'vue';

export const addFileAttachment = async ({
    file,
    addNewTask,
}: {
    file: File;
    addNewTask?: boolean;
}) => {
    if (addNewTask) {
        await useTaskStore().addTask('Untitled');
    }

    const { selectedTask } = useTaskStore();
    if (!selectedTask.value) return;

    useTaskStore().addFile({
        task: selectedTask.value,
        file,
    });
};

/*-------------------------------------
  Drop Zone
-------------------------------------*/
export function useDropZone({ addNewTask } = {} as { addNewTask?: boolean }) {
    const dropZoneRef = ref<HTMLDivElement>();

    const onDrop = (files: File[] | null) => {
        if (!files) return;
        for (const file of files) {
            addFileAttachment({ file, addNewTask });
        }
    };

    const { isOverDropZone } = useVueUseDropZone(dropZoneRef, {
        onDrop,
    });

    return {
        dropZoneRef,
        isOverDropZone,
    };
}

/*-------------------------------------
  File Dialog
-------------------------------------*/
export function useFileDialog({ addNewTask } = {} as { addNewTask?: boolean }) {
    const { open, onChange } = useVueUseFileDialog();

    onChange((files: FileList | null) => {
        if (!files) return;
        for (const file of files) {
            addFileAttachment({ file, addNewTask });
        }
    });

    return {
        openFileDialog: open,
    };
}
