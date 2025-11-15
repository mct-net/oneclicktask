import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, test } from 'vitest';

import type { Task, User } from '../../lib/types/models';
import { useTaskStore } from '../task';

describe('Task Store', () => {
    const mockedUser: User = {
        id: 1,
        username: 'ren_schweblin',
        avatarUrl:
            'https://firebasestorage.googleapis.com/v0/b/fictolab.appspot.com/o/imaginary-orange%2Fuser-04.png?alt=media',
        firstName: 'Ren',
        lastName: 'Schweblin',
    };

    const mockedTask: Task = {
        id: 1,
        name: 'Implement authentication',
        content: 'Integrate authentication functionality into the app',
        author: mockedUser,
        color: '#ff6633',
        tags: [
            {
                id: 1,
                name: 'Authentication',
            },
            {
                id: 2,
                name: 'Security',
            },
        ],
        due_date: '2024-05-15T00:00:00Z',
        created_at: '2024-04-20T00:00:00Z',
        status: 'in_progress',
    };

    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useTaskStore() call
        // without having to pass it to it: `useTaskStore(pinia)`
        setActivePinia(createPinia());
    });

    test('fiveMostUsedTags() filters top five tags', () => {
        const taskStore = useTaskStore();
        const mockedTasks = [
            { ...mockedTask, tags: [{ id: 2, name: 'b' }] },
            { ...mockedTask, tags: [{ id: 2, name: 'b' }] },
            { ...mockedTask, tags: [{ id: 2, name: 'b' }] },
            { ...mockedTask, tags: [{ id: 2, name: 'b' }] }, // b: 4
            { ...mockedTask, tags: [{ id: 1, name: 'a' }] },
            { ...mockedTask, tags: [{ id: 1, name: 'a' }] },
            { ...mockedTask, tags: [{ id: 1, name: 'a' }] }, // a: 3
            { ...mockedTask, tags: [{ id: 3, name: 'c' }] },
            { ...mockedTask, tags: [{ id: 3, name: 'c' }] }, // c: 2
            { ...mockedTask, tags: [{ id: 5, name: 'e' }] }, // e: 1
            { ...mockedTask, tags: [{ id: 4, name: 'd' }] }, // d: 1
            { ...mockedTask, tags: [{ id: 6, name: 'f' }] }, // d: 1
        ];
        taskStore.tasks = mockedTasks;

        expect(taskStore.fiveMostUsedTags).toStrictEqual([
            { id: 2, name: 'b' },
            { id: 1, name: 'a' },
            { id: 3, name: 'c' },
            { id: 5, name: 'e' },
            { id: 4, name: 'd' },
        ]);
    });

    it('filters assignee', () => {
        const taskStore = useTaskStore();
        mockedUser.id = 4213;

        const mockedTasks = [
            { ...mockedTask, assignee: { ...mockedUser, id: 2 } },
            { ...mockedTask, assignee: { ...mockedUser, id: 2 } },
            { ...mockedTask, assignee: { ...mockedUser, id: 2 } },
            { ...mockedTask, assignee: { ...mockedUser, id: 2 } },
            { ...mockedTask, assignee: { ...mockedUser, id: 4213 } },
            { ...mockedTask, assignee: { ...mockedUser, id: 4213 } },
            { ...mockedTask, assignee: { ...mockedUser, id: 4213 } },
            { ...mockedTask, assignee: { ...mockedUser, id: 3 } },
            { ...mockedTask, assignee: { ...mockedUser, id: 3 } },
            { ...mockedTask, assignee: { ...mockedUser, id: 5 } },
            { ...mockedTask, assignee: { ...mockedUser, id: 4 } },
        ];
        taskStore.tasks = mockedTasks;

        taskStore.filters.assignees = [mockedUser];

        expect(taskStore.filteredTasks).toStrictEqual([
            { ...mockedTask, assignee: { ...mockedUser, id: 4213 } },
            { ...mockedTask, assignee: { ...mockedUser, id: 4213 } },
            { ...mockedTask, assignee: { ...mockedUser, id: 4213 } },
        ]);
    });

    it('filters backlog tasks', () => {
        const taskStore = useTaskStore();
        const mockedTasks = [
            { ...mockedTask, status: 'backlog' },
            { ...mockedTask, status: 'backlog' },
            { ...mockedTask, status: 'backlog' },
            { ...mockedTask, status: 'backlog' },
            { ...mockedTask, status: 'in_progress' },
            { ...mockedTask, status: 'in_progress' },
            { ...mockedTask, status: 'in_progress' },
            { ...mockedTask, status: 'completed' },
            { ...mockedTask, status: 'completed' },
            { ...mockedTask, status: 'completed' },
            { ...mockedTask, status: 'completed' },
        ];

        taskStore.tasks = mockedTasks;

        taskStore.filters.backlog = true;

        expect(taskStore.filteredTasks).toStrictEqual([
            { ...mockedTask, status: 'backlog' },
            { ...mockedTask, status: 'backlog' },
            { ...mockedTask, status: 'backlog' },
            { ...mockedTask, status: 'backlog' },
        ]);
    });

    it('excludes tasks with specific tags', () => {
        const taskStore = useTaskStore();
        const mockedTasks = [
            { ...mockedTask, tags: [{ id: 2, name: 'b' }] },
            { ...mockedTask, tags: [{ id: 1, name: 'a' }] },
            { ...mockedTask, tags: [{ id: 1, name: 'a' }] },
        ];
        taskStore.tasks = mockedTasks;

        taskStore.filters.excludeTags = [{ id: 2, name: 'b' }];

        expect(taskStore.filteredTasks).toStrictEqual([
            { ...mockedTask, tags: [{ id: 1, name: 'a' }] },
            { ...mockedTask, tags: [{ id: 1, name: 'a' }] },
        ]);
    });
});
