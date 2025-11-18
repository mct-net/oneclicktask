import { useRecentTasks, useUrgentTasks } from '@/composables/board/filter';
import type { Task } from '@/lib/board/types/models';
import { beforeEach, describe, expect, it } from 'vitest';
import { ref } from 'vue';

// Helper to create mock tasks
const createMockTask = (overrides: Partial<Task> = {}): Task => ({
    id: 1,
    name: 'Test Task',
    content: '',
    author: { id: 1, name: 'Test User', email: 'test@example.com' },
    color: '#000000',
    tags: [],
    created_at: new Date().toISOString(),
    status: 'in_progress',
    ...overrides,
});

describe('useUrgentTasks() composable', () => {
    let tasks: ReturnType<typeof ref<Task[]>>;

    beforeEach(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const thisWeek = new Date(today);
        thisWeek.setDate(thisWeek.getDate() + 3);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 10);

        tasks = ref([
            createMockTask({
                id: 1,
                name: 'Due today 1',
                due_date: today.toISOString(),
            }),
            createMockTask({
                id: 2,
                name: 'Due today 2',
                due_date: today.toISOString(),
            }),
            createMockTask({
                id: 3,
                name: 'Due tomorrow',
                due_date: tomorrow.toISOString(),
            }),
            createMockTask({
                id: 4,
                name: 'Due this week',
                due_date: thisWeek.toISOString(),
            }),
            createMockTask({
                id: 5,
                name: 'Due next week',
                due_date: nextWeek.toISOString(),
            }),
        ]);
    });

    it('should return correct initial stats counts', () => {
        const urgentTasks = useUrgentTasks(tasks);

        expect(urgentTasks.value.stats).toHaveLength(3);
        expect(urgentTasks.value.stats[0].name).toBe('Today');
        expect(urgentTasks.value.stats[0].count).toBe(2);
        expect(urgentTasks.value.stats[1].name).toBe('Tomorrow');
        expect(urgentTasks.value.stats[1].count).toBe(1);
        expect(urgentTasks.value.stats[2].name).toBe('This week');
        expect(urgentTasks.value.stats[2].count).toBeGreaterThanOrEqual(3);
    });

    it('should show top 5 overdue or due today tasks by default', () => {
        const urgentTasks = useUrgentTasks(tasks);

        expect(urgentTasks.value.top5).toHaveLength(2);
        expect(urgentTasks.value.top5[0].name).toBe('Due today 1');
        expect(urgentTasks.value.top5[1].name).toBe('Due today 2');
    });

    it('should filter top5 to show only today tasks when today filter is toggled', () => {
        const urgentTasks = useUrgentTasks(tasks);

        expect(urgentTasks.value.stats[0].active).toBe(false);

        urgentTasks.value.stats[0].toggle();

        expect(urgentTasks.value.stats[0].active).toBe(true);
        expect(urgentTasks.value.top5).toHaveLength(2);
        expect(
            urgentTasks.value.top5.every((t) => t.name.includes('today')),
        ).toBe(true);
    });

    it('should filter top5 to show only tomorrow tasks when tomorrow filter is toggled', () => {
        const urgentTasks = useUrgentTasks(tasks);

        urgentTasks.value.stats[1].toggle();

        expect(urgentTasks.value.stats[1].active).toBe(true);
        expect(urgentTasks.value.top5).toHaveLength(1);
        expect(urgentTasks.value.top5[0].name).toBe('Due tomorrow');
    });

    it('should filter top5 to show only this week tasks when this week filter is toggled', () => {
        const urgentTasks = useUrgentTasks(tasks);

        urgentTasks.value.stats[2].toggle();

        expect(urgentTasks.value.stats[2].active).toBe(true);
        expect(urgentTasks.value.top5.length).toBeGreaterThanOrEqual(3);
    });

    it('should deactivate filter and return to default when toggled again', () => {
        const urgentTasks = useUrgentTasks(tasks);

        urgentTasks.value.stats[1].toggle();
        expect(urgentTasks.value.stats[1].active).toBe(true);
        expect(urgentTasks.value.top5).toHaveLength(1);

        urgentTasks.value.stats[1].toggle();
        expect(urgentTasks.value.stats[1].active).toBe(false);
        expect(urgentTasks.value.top5).toHaveLength(2);
    });

    it('should deactivate previous filter when a new one is toggled', () => {
        const urgentTasks = useUrgentTasks(tasks);

        urgentTasks.value.stats[0].toggle();
        expect(urgentTasks.value.stats[0].active).toBe(true);

        urgentTasks.value.stats[1].toggle();
        expect(urgentTasks.value.stats[0].active).toBe(false);
        expect(urgentTasks.value.stats[1].active).toBe(true);
    });

    it('should limit results to maximum 5 tasks', () => {
        const today = new Date();
        tasks.value = Array.from({ length: 10 }, (_, i) =>
            createMockTask({
                id: i,
                name: `Task ${i}`,
                due_date: today.toISOString(),
            }),
        );

        const urgentTasks = useUrgentTasks(tasks);

        expect(urgentTasks.value.top5).toHaveLength(5);
    });
});

describe('useRecentTasks() composable', () => {
    let tasks: ReturnType<typeof ref<Task[]>>;

    beforeEach(() => {
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastWeek = new Date(now);
        lastWeek.setDate(lastWeek.getDate() - 8);

        tasks = ref([
            createMockTask({
                id: 1,
                name: 'New task 1',
                created_at: now.toISOString(),
            }),
            createMockTask({
                id: 2,
                name: 'New task 2',
                created_at: yesterday.toISOString(),
            }),
            createMockTask({
                id: 3,
                name: 'Done task 1',
                created_at: yesterday.toISOString(),
                status: 'done',
            }),
            createMockTask({
                id: 4,
                name: 'Done task 2',
                created_at: yesterday.toISOString(),
                status: 'done',
            }),
            createMockTask({
                id: 5,
                name: 'Old task',
                created_at: lastWeek.toISOString(),
            }),
        ]);
    });

    it('should return correct initial stats counts', () => {
        const recentTasks = useRecentTasks(tasks);

        expect(recentTasks.value.stats).toHaveLength(2);
        expect(recentTasks.value.stats[0].name).toBe('New this week');
        expect(recentTasks.value.stats[0].count).toBeGreaterThanOrEqual(2);
        expect(recentTasks.value.stats[1].name).toBe('Done this week');
        expect(recentTasks.value.stats[1].count).toBeGreaterThanOrEqual(2);
    });

    it('should show top 5 most recent tasks by default sorted by creation date', () => {
        const recentTasks = useRecentTasks(tasks);

        expect(recentTasks.value.top5).toHaveLength(5);
        expect(recentTasks.value.top5[0].name).toBe('New task 1');
    });

    it('should filter top5 to show only new this week tasks when filter is toggled', () => {
        const recentTasks = useRecentTasks(tasks);

        expect(recentTasks.value.stats[0].active).toBe(false);

        recentTasks.value.stats[0].toggle();

        expect(recentTasks.value.stats[0].active).toBe(true);
        expect(recentTasks.value.top5.length).toBeGreaterThanOrEqual(2);
    });

    it('should filter top5 to show only done this week tasks when filter is toggled', () => {
        const recentTasks = useRecentTasks(tasks);

        recentTasks.value.stats[1].toggle();

        expect(recentTasks.value.stats[1].active).toBe(true);
        expect(recentTasks.value.top5.length).toBeGreaterThanOrEqual(2);
        expect(recentTasks.value.top5.every((t) => t.status === 'done')).toBe(
            true,
        );
    });

    it('should deactivate filter and return to default when toggled again', () => {
        const recentTasks = useRecentTasks(tasks);

        recentTasks.value.stats[0].toggle();
        expect(recentTasks.value.stats[0].active).toBe(true);

        recentTasks.value.stats[0].toggle();
        expect(recentTasks.value.stats[0].active).toBe(false);
        expect(recentTasks.value.top5).toHaveLength(5);
    });

    it('should deactivate previous filter when a new one is toggled', () => {
        const recentTasks = useRecentTasks(tasks);

        recentTasks.value.stats[0].toggle();
        expect(recentTasks.value.stats[0].active).toBe(true);

        recentTasks.value.stats[1].toggle();
        expect(recentTasks.value.stats[0].active).toBe(false);
        expect(recentTasks.value.stats[1].active).toBe(true);
    });

    it('should limit results to maximum 5 tasks', () => {
        const now = new Date();
        tasks.value = Array.from({ length: 10 }, (_, i) =>
            createMockTask({
                id: i,
                name: `Task ${i}`,
                created_at: now.toISOString(),
            }),
        );

        const recentTasks = useRecentTasks(tasks);

        expect(recentTasks.value.top5).toHaveLength(5);
    });
});
