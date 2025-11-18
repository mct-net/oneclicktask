import dayjs from 'dayjs';

import type { Tag, Task } from '@/lib/board/types/models';
import { utcDate } from '@/lib/board/utils/date';

export function sortByUrgency(a: Task, b: Task) {
    // Leave tasks without due date at the end
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;

    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
}

export function sortByCreationDate(b: Task, a: Task) {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
}

export function containsTag(tags: Tag[], tag: Tag) {
    return tags.some((t) => t.id === tag.id);
}

export function addTagIfNotExists(tags: Tag[], newTag: Tag) {
    if (!tags.some((tag) => tag.id === newTag.id)) {
        tags.push(newTag);
    }
}

export function removeTagIfExists(tags: Tag[], tagToRemove: Tag) {
    const index = tags.findIndex((tag) => tag.id === tagToRemove.id);
    if (index !== -1) {
        tags.splice(index, 1);
    }
}

export function filterDueTomorrow(tasks: Task[]) {
    const tasksCopy = [...tasks];
    tasksCopy.sort(sortByUrgency);

    return tasksCopy.filter((task) => {
        if (!task.due_date) return false;

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dueDate = new Date(task.due_date);
        return (
            dueDate.getFullYear() === tomorrow.getFullYear() &&
            dueDate.getMonth() === tomorrow.getMonth() &&
            dueDate.getDate() === tomorrow.getDate()
        );
    });
}

export function filterDueThisWeek(tasks: Task[]) {
    const tasksCopy = [...tasks];
    tasksCopy.sort(sortByUrgency);

    return tasksCopy.filter((task) => {
        if (!task.due_date) return false;

        const today = dayjs();
        const dueDate = dayjs(task.due_date);
        return dueDate.isSame(today, 'week');
    });
}

export function filterDueToday(tasks: Task[]) {
    const tasksCopy = [...tasks];
    tasksCopy.sort(sortByUrgency);

    return tasksCopy.filter((task) => {
        if (!task.due_date) return false;

        const today = new Date();
        const dueDate = new Date(task.due_date);
        return (
            dueDate.getFullYear() === today.getFullYear() &&
            dueDate.getMonth() === today.getMonth() &&
            dueDate.getDate() === today.getDate()
        );
    });
}

export function filterOverdue(tasks: Task[]) {
    const tasksCopy = [...tasks];
    tasksCopy.sort(sortByUrgency);

    const now = dayjs();
    return tasksCopy.filter((task) => {
        if (!task.due_date) return false;

        const dueDate = dayjs(task.due_date);
        return now.isAfter(dueDate);
    });
}

export function filterOverdueOrDueToday(tasks: Task[]) {
    const tasksCopy = [...tasks];
    tasksCopy.sort(sortByUrgency);

    const now = dayjs();
    const _filteredTasks = tasksCopy.filter((task) => {
        if (!task.due_date) return false;

        const isOverdue = now.isAfter(utcDate(task.due_date));
        const postponedToday =
            task.last_postponed_at &&
            now.isSame(utcDate(task.last_postponed_at), 'day');

        /*
        If the task was postponed today, it should be
        hidden unless it is overdue.
      */
        if (postponedToday) {
            return isOverdue;
        }

        const dueDate = utcDate(task.due_date);
        return isOverdue || dueDate.isSame(now, 'day');
    });

    return _filteredTasks;
}

export function filterNewThisWeek(tasks: Task[]) {
    return tasks.filter((task) => {
        const today = dayjs();
        const createdAt = dayjs(task.created_at);
        return createdAt.isSame(today, 'week');
    });
}

export function filterDoneThisWeek(tasks: Task[]) {
    return tasks.filter((task) => {
        if (task.status !== 'done') return false;

        const today = dayjs();
        const doneAt = dayjs(task.due_date);
        return doneAt.isSame(today, 'week');
    });
}
