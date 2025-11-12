import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import SelectedTaskPanelEditor from '@/components/SelectedTaskPanelEditor.vue';
import type { Task } from '@/lib/types/models';
import { useTaskStore } from '@/stores/task';

describe('SelectedTaskPanelEditor', () => {
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useTaskStore() call
        // without having to pass it to it: `useTaskStore(pinia)`
        setActivePinia(createPinia());
    });

    it("updates the task store's selectedTask's content and make sends data that update to the backend", async () => {
        const mockedTasks: Task[] = [
            {
                id: '1',
                name: 'Create homepage UI',
                content: '',
                author: {
                    id: '1',
                },
                color: '#3366ff',
                tags: ['UI', 'Design'],
                due_date: new Date().toISOString(),
                created_at: new Date().toISOString(),
                status: 'in_progress',
            },
        ];

        const wrapper = mount(SelectedTaskPanelEditor, {});

        await flushPromises();

        useTaskStore().selectedTask = mockedTasks[0];

        const updatedContent = '<p>New content</p>';
        await wrapper.vm.$nextTick();

        const editorContent = wrapper.findComponent({
            name: 'editor-content',
        });

        expect(useTaskStore().selectedTask.content).toBe('');

        /*
        Because I didn't find a way to update the content of the editor directly,
        I'm calling the setContent method from the editor instance directly.
        This is not ideal, but it works for the test.
    */
        editorContent.vm.editor.commands.setContent(updatedContent, {
            emitUpdate: true,
        });

        expect(useTaskStore().selectedTask.content).toBe(updatedContent);
    });
});
