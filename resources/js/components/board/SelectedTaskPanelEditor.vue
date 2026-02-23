<script setup lang="ts">
import debounce from 'lodash/debounce';
import { common, createLowlight } from 'lowlight';
import { onMounted, watch } from 'vue';

import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Highlight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/vue-3';

import FileAttachment from '@/components/board/common/FileAttachment.vue';
import IconClip from '@/components/board/icons/IconClip.vue';
import IconHighlighter from '@/components/board/icons/IconHighlighter.vue';
import IconList from '@/components/board/icons/IconList.vue';
import IconListOrdered from '@/components/board/icons/IconListOrdered.vue';
import IconMaximize from '@/components/board/icons/IconMaximize.vue';
import IconMic from '@/components/board/icons/IconMic.vue';

import TextEditorAction from '@/components/board/common/TextEditorAction.vue';
import {
    addFileAttachment,
    useDropZone,
    useFileDialog,
} from '@/composables/board/file';
import { useDialogStore } from '@/composables/board/stores/useDialogStore';
import { useEditorStore } from '@/composables/board/stores/useEditorStore';
import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import IconMinimize from './icons/IconMinimize.vue';

defineProps({
    isExpanded: {
        type: Boolean,
        default: false,
    },
});

const taskStore = useTaskStore();
const dialogStore = useDialogStore();
const { selectedTask } = taskStore;

const debouncedUpdateTask = debounce(() => {
    if (taskStore.selectedTask?.value?.id) {
        taskStore.updateTask(taskStore.selectedTask.value);
    }
}, 1000);

/*-------------------------------------
  Tiptap Setup
-------------------------------------*/
const editor = useEditor({
    content: selectedTask.value?.content,
    extensions: [
        Document,
        Dropcursor,
        Image,
        Paragraph,
        Text,
        History,
        Typography,
        Highlight,
        Link.configure({
            openOnClick: true,
            autolink: true,
            HTMLAttributes: {
                class: 'underline hover:opacity-80 cursor-pointer text-link',
                spellcheck: 'false',
            },
        }),
        BulletList.configure({
            HTMLAttributes: {
                class: 'list-disc	pl-7',
            },
        }),
        OrderedList.configure({
            HTMLAttributes: {
                class: 'list-decimal pl-7',
            },
        }),
        ListItem,
        Bold.configure({
            HTMLAttributes: {
                class: 'font-bold',
            },
        }),
        Underline.configure({
            HTMLAttributes: {
                class: 'underline',
            },
        }),
        Italic.configure({
            HTMLAttributes: {
                class: 'italic',
            },
        }),
        Strike.configure({
            HTMLAttributes: {
                class: 'line-through',
            },
        }),
        Placeholder.configure({
            placeholder: 'Detail the steps or requirements of the task...',
        }),
        CodeBlockLowlight.configure({
            lowlight: createLowlight(common),
        }),
    ],
    editorProps: {
        attributes: {
            class: 'focus:outline-hidden grow flex flex-col',
        },
    },
    onUpdate: () => {
        if (!editor.value || !taskStore.selectedTask.value) return;
        taskStore.selectedTask.value.content = editor.value.getHTML();
        debouncedUpdateTask();
    },
    onPaste(event: ClipboardEvent) {
        if (event.clipboardData?.files.length) {
            event.preventDefault();
            const files: FileList = event.clipboardData.files;

            for (const file of files) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    addFileAttachment({ file });
                };
            }
        }
    },
});

watch(
    () => selectedTask.value?.content,
    (value) => {
        if (!editor.value) return;
        const isSame = editor.value.getHTML() === value;

        if (isSame) return;
        editor.value.commands.setContent(value || '', { emitUpdate: false });
    },
);

const editorStore = useEditorStore();

onMounted(() => {
    // Make editor globally available.
    editorStore.editor = editor.value as any;
});

/*-------------------------------------
  Actions Bar
-------------------------------------*/
const { openFileDialog } = useFileDialog();
const { dropZoneRef } = useDropZone();
</script>

<template>
    <!-- Actions Bar -->
    <div
        v-if="editor"
        v-bind="$attrs"
        class="flex rounded-t-md bg-surface"
        :class="{
            'justify-end p-3.5 pb-1 @4xl/main:justify-between @4xl/main:p-5':
                !isExpanded,
            'justify-between p-5': isExpanded,
        }"
    >
        <!-- Left -->
        <div
            class="flex gap-x-2"
            :class="{ 'hidden @4xl/main:flex': !isExpanded }"
        >
            <TextEditorAction
                :is-active="editor.isActive('highlight')"
                @click="editor.chain().focus().toggleHighlight().run()"
            >
                <IconHighlighter />
            </TextEditorAction>

            <TextEditorAction
                :is-active="editor!.isActive('bulletList')"
                @click="editor.chain().focus().toggleBulletList().run()"
            >
                <IconList />
            </TextEditorAction>

            <TextEditorAction
                :is-active="editor!.isActive('orderedList')"
                @click="editor.chain().focus().toggleOrderedList().run()"
            >
                <IconListOrdered />
            </TextEditorAction>

            <TextEditorAction @click="openFileDialog">
                <IconClip />
            </TextEditorAction>
        </div>

        <!-- Right  -->
        <div class="flex gap-x-2">
            <TextEditorAction
                class="hidden!"
                :class="{ 'hidden @4xl/main:flex': !isExpanded }"
            >
                <IconMic />
            </TextEditorAction>

            <TextEditorAction
                :class="{
                    'h-auto w-auto border-0 @4xl/main:h-8 @4xl/main:w-8 @4xl/main:border':
                        !isExpanded,
                }"
                @click="
                    isExpanded
                        ? dialogStore.close('expanded-editor')
                        : dialogStore.open('expanded-editor')
                "
            >
                <IconMinimize v-if="isExpanded" />
                <IconMaximize v-else />
            </TextEditorAction>
        </div>
    </div>

    <div
        ref="dropZoneRef"
        class="flex grow flex-col overflow-y-auto bg-surface pt-0"
        :class="{
            'p-3.5 @4xl/main:p-5': !isExpanded,
            'p-5': isExpanded,
        }"
    >
        <section
            v-if="selectedTask"
            class="flex grow flex-col overflow-y-auto pr-2"
        >
            <!-- Editor -->
            <editor-content
                :editor="editor"
                class="flex grow flex-col"
                role="region"
                aria-label="Task description"
            />

            <!-- File Attachments -->
            <div class="justify mt-5 mr-4 flex flex-wrap gap-3">
                <FileAttachment
                    v-for="file in selectedTask.files"
                    :key="file.id"
                    class="w-full max-w-72"
                    :task="selectedTask"
                    :id="file.id"
                    :name="file.name"
                    :url="file.url"
                    :type="file.type"
                />
            </div>
        </section>
    </div>
</template>
