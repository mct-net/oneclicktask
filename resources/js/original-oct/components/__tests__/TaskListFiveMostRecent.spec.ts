import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import TaskListFiveMostRecent from '@/components/TaskListFiveMostRecent.vue';
import type { Task } from '@/lib/types/models';
import { getRandomDateWithinThisWeek } from '@/lib/utils/date';

describe('TaskListFiveMostRecent', () => {
    const mockedUser = {
        id: '1',
        avatarUrl: '',
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const mockedTasks: Task[] = [
        {
            id: '1',
            name: 'Create homepage UI',
            content: 'Design and implement the homepage user interface',
            author: mockedUser,
            color: '#3366ff',
            tags: ['UI', 'Design'],
            due_date: today.toISOString(), // Today
            created_at: today.toISOString(), // Today
            status: 'in_progress',
        },
        {
            id: '2',
            name: 'Implement authentication',
            content: 'Integrate authentication functionality into the app',
            author: mockedUser,
            color: '#ff6633',
            tags: ['Authentication', 'Security'],
            due_date: getRandomDateWithinThisWeek().toISOString(), // Tomorrow
            created_at: getRandomDateWithinThisWeek().toISOString(), // Tomorrow
            status: 'in_progress',
        },
    ];

    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useTaskStore() call
        // without having to pass it to it: `useTaskStore(pinia)`
        setActivePinia(createPinia());
    });

    it("calculates current week's summary if no completed tasks are present", () => {
        const wrapper = mount(TaskListFiveMostRecent, {
            props: {
                tasks: mockedTasks,
            },
        });

        expect(wrapper.text()).toContain('New this week: 2');
        expect(wrapper.text()).toContain('Done this week: 0');
    });

    it("calculates current week's summary if new tasks were completed during this week", () => {
        mockedTasks[0].status = 'done';

        const wrapper = mount(TaskListFiveMostRecent, {
            props: {
                tasks: mockedTasks,
            },
        });

        expect(wrapper.text()).toContain('New this week: 2');
        expect(wrapper.text()).toContain('Done this week: 1');
    });
});
