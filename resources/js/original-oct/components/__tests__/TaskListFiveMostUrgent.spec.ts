import { mount } from '@vue/test-utils';
import dayjs from 'dayjs';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import TaskListFiveMostUrgent from '@/components/TaskListFiveMostUrgent.vue';
import { DATETIME_FORMAT } from '@/lib/constants';
import type { Task } from '@/lib/types/models';
import { getRandomDateWithinThisWeek, utcDate } from '@/lib/utils/date';

describe('TaskListFiveMostUrgent', () => {
    const mockedUser = {
        id: '1',
        avatarUrl: '',
    };

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("calculates today's and tomorrow's tasks summary properly", () => {
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
                created_at: '2024-04-15T00:00:00Z',
                status: 'in_progress',
                last_postponed_at: undefined,
            },
            {
                id: '2',
                name: 'Implement authentication',
                content: 'Integrate authentication functionality into the app',
                author: mockedUser,
                color: '#ff6633',
                tags: ['Authentication', 'Security'],
                due_date: tomorrow.toISOString(), // Tomorrow
                created_at: '2024-04-20T00:00:00Z',
                status: 'in_progress',
                last_postponed_at: undefined,
            },
        ];

        const wrapper = mount(TaskListFiveMostUrgent, {
            props: {
                tasks: mockedTasks,
            },
        });

        expect(wrapper.text()).toContain('Today: 1');
        expect(wrapper.text()).toContain('Tomorrow: 1');
    });

    it("calculates this week's tasks summary properly", () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const inThreeDays = new Date(today);
        const inTwoWeeks = new Date(today);

        inThreeDays.setDate(today.getDate() + 2);
        inTwoWeeks.setDate(today.getDate() + 14);

        const mockedTasks: Task[] = [
            {
                id: '1',
                name: 'Create homepage UI',
                content: 'Design and implement the homepage user interface',
                author: mockedUser,
                color: '#3366ff',
                tags: ['UI', 'Design'],
                due_date: today.toISOString(), // Today
                created_at: '2024-04-15T00:00:00Z',
                status: 'in_progress',
                last_postponed_at: undefined,
            },
            {
                id: '3',
                name: 'Fix bug in data fetching',
                content: 'Resolve issue with data retrieval from server',
                author: mockedUser,
                color: '#ff0000',
                tags: ['Bug', 'Backend'],
                due_date: inTwoWeeks.toISOString(), // In two weeks
                created_at: '2024-04-10T00:00:00Z',
                status: 'in_progress',
                last_postponed_at: undefined,
            },
            {
                id: '9',
                name: 'Optimize database queries',
                content: 'Improve performance by optimizing database queries',
                author: mockedUser,
                color: '#ff9900',
                tags: ['Performance', 'Backend'],
                due_date: getRandomDateWithinThisWeek().toISOString(), // This week
                created_at: '2024-04-01T00:00:00Z',
                status: 'in_progress',
                last_postponed_at: undefined,
            },
        ];

        const wrapper = mount(TaskListFiveMostUrgent, {
            props: {
                tasks: mockedTasks,
            },
        });

        expect(wrapper.text()).toContain('This week: 2');
    });

    it('filters out tasks postponed today unless they are overdue', () => {
        const today = dayjs();
        const todayUTC = utcDate(today.toISOString());
        const overdueDate = todayUTC.subtract(1, 'day');

        const mockedTasks: Task[] = [
            {
                id: '1',
                name: 'Create homepage UI',
                content: 'Design and implement the homepage user interface',
                author: mockedUser,
                color: '#3366ff',
                tags: ['UI', 'Design'],
                due_date: overdueDate.format(DATETIME_FORMAT), // Overdue
                created_at: '2024-04-15T00:00:00Z',
                status: 'in_progress',
                last_postponed_at: todayUTC.format(DATETIME_FORMAT), // Postponed today
            },
            {
                id: '2',
                name: 'Implement authentication',
                content: 'Integrate authentication functionality into the app',
                author: mockedUser,
                color: '#ff6633',
                tags: ['Authentication', 'Security'],
                due_date: todayUTC.add(1, 'minute').format(DATETIME_FORMAT), // Today in a minute
                created_at: '2024-04-20T00:00:00Z',
                status: 'in_progress',
                last_postponed_at: todayUTC.format(DATETIME_FORMAT), // Postponed today
            },
            {
                id: '3',
                name: 'Fix bug in data fetching',
                content: 'Resolve issue with data retrieval from server',
                color: '#ff6633',
                tags: ['Authentication', 'Security'],
                due_date: todayUTC.add(1, 'minute').format(DATETIME_FORMAT), // Today in a minute
                created_at: '2024-04-20T00:00:00Z',
                status: 'in_progress',
                last_postponed_at: null,
            },
        ];

        const wrapper = mount(TaskListFiveMostUrgent, {
            props: {
                tasks: mockedTasks,
            },
        });

        expect(wrapper.text()).toContain('Today: 1');
        expect(wrapper.text()).not.toContain('Today: 2');

        expect(wrapper.text()).toContain('Create homepage UI');
        expect(wrapper.text()).not.toContain('Implement authentication');
        expect(wrapper.text()).toContain('Fix bug in data fetching');
    });
});
