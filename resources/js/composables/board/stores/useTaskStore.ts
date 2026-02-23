import { computed, ref } from 'vue';

import { useUIStore } from '@/composables/board/stores/useUIStore';
import { useUserStore } from '@/composables/board/stores/useUserStore';
import { useToast } from '@/composables/useToast';
import { restClient } from '@/lib/board/api';
import {
    DATETIME_FORMAT,
    DEFAULT_TASK_COLOR,
    DEFAULT_TASK_STATUS,
    EMPTY_TASK_COLOR,
    UNASSIGNED_USER,
} from '@/lib/board/constants';
import type { Tag, Task } from '@/lib/board/types/models';
import { utcDate } from '@/lib/board/utils/date';
import { handleError } from '@/lib/board/utils/error';
import {
    filterOverdueOrDueToday,
    sortByUrgency,
} from '@/lib/board/utils/tasks';
import type { User } from '@/types';

export type SortByCriteria = 'recent_first' | 'most_urgent_first' | null;

const getDefaultFilters = () => ({
    color: '',
    isStarred: false,
    isImportant: false,
    inProgress: false,
    failedOrDuplicated: false,
    done: false,
    backlog: false,
    trashed: false,
    assignees: [] as User[],
    search: '',
    searchedTags: new Set<string>(),
    searchedExcludeTags: new Set<string>(),
    tags: [] as Tag[],
    excludeTags: [] as Tag[],
    sortBy: null as SortByCriteria,
});

export const getStatusLabel = (status: Task['status']) => {
    switch (status) {
        case 'in_progress':
            return 'In progress';
        case 'done':
            return 'Done';
        case 'failed':
            return 'Failed / Duplicate';
        case 'duplicate':
            return 'Failed / Duplicate';
        case 'backlog':
            return 'Backlog';
        case 'trashed':
            return 'Trashed';
    }
};

// Module-level reactive state (singleton pattern)
const tasks = ref<Task[]>([]);
const tags = ref<Tag[]>([]);
const selectedTask = ref<Task | null>(null);
const filters = ref(getDefaultFilters());

export function useTaskStore() {
    const uiStore = useUIStore();
    const userStore = useUserStore();

    const filteredTasks = computed(() => {
        const filtered = tasks.value.filter((task) => {
            const {
                color,
                isStarred,
                isImportant,
                inProgress,
                failedOrDuplicated,
                done,
                trashed,
                backlog,
                assignees,
                search,
                searchedTags,
                searchedExcludeTags,
                tags: filterTags,
                excludeTags,
            } = filters.value;
            const {
                is_starred,
                is_important,
                status,
                name,
                tags: taskTags,
            } = task;

            if (color && color !== EMPTY_TASK_COLOR && color !== task.color) {
                return false;
            }

            if (isStarred && !is_starred) {
                return false;
            }

            if (isImportant && !is_important) {
                return false;
            }

            if (search && !name.toLowerCase().includes(search.toLowerCase())) {
                return false;
            }

            if (
                searchedTags.size &&
                ![...searchedTags].every((tag) =>
                    taskTags.some((t) => t.name === tag),
                )
            ) {
                return false;
            }

            if (
                searchedExcludeTags.size &&
                taskTags.some((tag) => searchedExcludeTags.has(tag.name))
            ) {
                return false;
            }

            if (
                filterTags.length &&
                !filterTags.every((tag) =>
                    taskTags.some((taskTag) => taskTag.name === tag.name),
                )
            ) {
                return false;
            }

            if (
                excludeTags.length &&
                taskTags.some((taskTag) =>
                    excludeTags.some((tag) => tag.name === taskTag.name),
                )
            ) {
                return false;
            }

            if (!task.assignee && assignees[0]?.id === UNASSIGNED_USER.id) {
                return true;
            }

            if (
                assignees.length &&
                !assignees.some((assignee) => assignee.id === task.assignee?.id)
            ) {
                return false;
            }

            if (inProgress && status === 'in_progress') {
                return true;
            }

            if (
                failedOrDuplicated &&
                ['failed', 'duplicate'].includes(status)
            ) {
                return true;
            }

            if (done && status === 'done') {
                return true;
            }

            if (trashed && status === 'trashed') {
                return true;
            }

            if (backlog && status === 'backlog') {
                return true;
            }

            /*
        If none of the filters are active, return
        only in-progress and backlog tasks.
      */
            const areStateFiltersUnset =
                !inProgress &&
                !failedOrDuplicated &&
                !done &&
                !trashed &&
                !backlog;

            if (areStateFiltersUnset) {
                if (status === 'in_progress' || status === 'backlog') {
                    return true;
                }

                return false;
            }
        });

        const sorted = filtered;

        if (filters.value.sortBy === 'most_urgent_first') {
            return sorted.sort(sortByUrgency);
        }

        if (filters.value.sortBy === 'recent_first') {
            return sorted.sort((a, b) => {
                return (
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                );
            });
        }

        return sorted;
    });

    const fiveMostUsedTags = computed<Tag[]>(() => {
        const _tags: Tag[] = [];

        tasks.value.forEach((task) => {
            task.tags?.forEach((tag) => {
                const existingTag = _tags.find((t) => t.name === tag.name);

                if (existingTag) {
                    existingTag.id = tag.id;
                } else {
                    _tags.push(tag);
                }
            });
        });

        return _tags
            .sort((a, b) => {
                return (
                    tasks.value.filter((task) =>
                        task.tags?.some((tag) => tag.name === b.name),
                    ).length -
                    tasks.value.filter((task) =>
                        task.tags?.some((tag) => tag.name === a.name),
                    ).length
                );
            })
            .slice(0, 5);
    });

    const mostUrgentTasks = computed(() => {
        return filterOverdueOrDueToday(filteredTasks.value);
    });

    const resetFilters = () => {
        const newFilters = getDefaultFilters();

        /*
      We use Object.assign to avoid reactivity issues.

      See:
      - https://stackoverflow.com/a/65733741/8313526
    */
        Object.assign(filters.value, newFilters);
    };

    async function loadTasks() {
        let error;

        try {
            const { data } = await restClient.tasks.getAll();
            tasks.value = data;
            uiStore.loading.value = false;
        } catch (err) {
            handleError(err);
            error = true;
        }

        return { error };
    }

    async function loadTags() {
        let error;

        try {
            const { data } = await restClient.tags.getAll();
            tags.value = data;
        } catch (err) {
            handleError(err);
            error = true;
        }

        return { error };
    }

    function selectNextUrgentTask({ currentTask }: { currentTask: Task }) {
        if (!filteredTasks.value.length) {
            return;
        }

        const urgentList = mostUrgentTasks.value;
        const listSize = mostUrgentTasks.value.length;
        const currentTaskIndex = urgentList.findIndex(
            (task) => task.id === currentTask.id,
        );
        const nextTaskIndex = (currentTaskIndex + 1) % listSize;
        const nextTask = urgentList[nextTaskIndex];

        if (nextTask && nextTask.id !== currentTask.id) {
            selectedTask.value = nextTask;
            uiStore.updateRoute();
        } else {
            selectedTask.value = null;
            uiStore.clearSelectedTask();
        }
    }

    async function addTask(name: string) {
        try {
            const { data } = await restClient.tasks.create({
                name,
                color: DEFAULT_TASK_COLOR,
                status: DEFAULT_TASK_STATUS,
                due_date: utcDate().format(DATETIME_FORMAT),
            });

            // Spread data first to preserve all backend properties (especially id),
            // then override only specific properties we want to ensure are set
            const newTask: Task = {
                ...data,
                name,
                content: data.content || '',
                author: data.author || getCurrentUserOrThrow(),
                tags: data.tags || [],
                comments: data.comments || [],
                color: data.color || DEFAULT_TASK_COLOR,
                status: data.status || DEFAULT_TASK_STATUS,
            };

            tasks.value.push(newTask);

            selectedTask.value = newTask;
            useUIStore().updateRoute();
        } catch (error) {
            handleError(error);
        }
    }

    async function updateTask(task: Task) {
        try {
            await restClient.tasks.update(task);
        } catch (error) {
            handleError(error);
        }
    }

    async function destroyTask(task: Task) {
        try {
            await restClient.tasks.delete(task.id);
            tasks.value = tasks.value.filter((t) => t.id !== task.id);

            // set selected task to the last one
            selectedTask.value = filteredTasks.value[0] || null;
            useUIStore().updateRoute();

            const { toast } = useToast();
            toast({
                message: 'Task has been deleted.',
                type: 'success',
            });
        } catch (error) {
            handleError(error);
        }
    }

    async function addTag(task: Task, tag: string) {
        try {
            const { data } = await restClient.tags.create(task.id, tag);

            const newTag: Tag = {
                id: data.id,
                name: tag,
            };

            if (!task.tags) {
                task.tags = [];
            }

            task.tags.push(newTag);

            if (!tags.value.some((t) => t.name === tag)) {
                tags.value.push(newTag);
            }

            return newTag;
        } catch (error: any) {
            if (error.response.status === 409) {
                const { toast } = useToast();
                toast({
                    message: `This task already contains a tag with the "${tag}" name.`,
                    type: 'error',
                });
            } else {
                handleError(error);
            }
        }
    }

    async function updateTag(task: Task, newName: string, tagId: number) {
        try {
            await restClient.tags.update(task.id, tagId, newName);

            const tag = task.tags?.find((tag) => tag.id === tagId);

            if (tag) {
                tag.name = newName;
            }

            const existingTag = tags.value.find((tag) => tag.id === tagId);

            if (existingTag) {
                existingTag.name = newName;
            }
        } catch (error: any) {
            if (error.response.status === 409) {
                const { toast } = useToast();
                toast({
                    message: `This task already contains a tag with the "${newName}" name.`,
                    type: 'error',
                });
            } else {
                handleError(error);
            }
        }
    }

    async function removeTag(task: Task, tagId: number) {
        try {
            await restClient.tags.delete(task.id, tagId);

            task.tags = task.tags?.filter((tag) => tag.id !== tagId);
        } catch (error) {
            handleError(error);
        }
    }

    async function addComment(task: Task, comment: string) {
        if (!task.comments) {
            task.comments = [];
        }

        try {
            const { data } = await restClient.comments.create(task.id, comment);

            task.comments.push({
                id: data.id,
                content: comment,
                created_at: data.created_at,
                user: getCurrentUserOrThrow(),
            });
        } catch (error) {
            handleError(error);
        }
    }

    async function removeComment(task: Task, commentId: number) {
        try {
            await restClient.comments.remove(task.id, commentId);

            task.comments = task.comments?.filter(
                (comment) => comment.id !== commentId,
            );
        } catch (error) {
            handleError(error);
        }
    }

    async function updateComment(
        task: Task,
        commentId: number,
        content: string,
    ) {
        try {
            await restClient.comments.update(task.id, commentId, content);

            const comment = task.comments?.find(
                (comment) => comment.id === commentId,
            );

            if (comment) {
                comment.content = content;
            }
        } catch (error) {
            handleError(error);
        }
    }

    async function addFile({ task, file }: { task: Task; file: File }) {
        try {
            const { data } = await restClient.files.upload(task.id, file);

            if (data && data.url) {
                const newFile = {
                    id: data.id,
                    url: data.url,
                    name: file.name,
                    type: file.type,
                };

                if (task.files && task.files.length) {
                    task.files.push(newFile);
                } else {
                    task.files = [newFile];
                }
            }
        } catch (error) {
            handleError(error);
            const { toast } = useToast();
            toast({
                message: 'Network error. Unable to upload file. Retry later.',
                type: 'error',
                duration: 5,
            });
        }
    }

    async function getFileDownloadURL({
        task,
        fileId,
    }: {
        task: Task;
        fileId: number;
    }) {
        try {
            return restClient.files.getDownloadURL(task.id, fileId);
        } catch (error) {
            handleError(error);
        }
    }

    async function removeFile({
        task,
        fileId,
    }: {
        task: Task;
        fileId: number;
    }) {
        try {
            await restClient.files.delete(task.id, fileId);

            task.files = task.files?.filter((file) => file.id !== fileId);
        } catch (error) {
            handleError(error);
        }
    }

    async function addTime(task: Task, minutes: number) {
        try {
            task.due_date = utcDate()
                .add(minutes, 'minute')
                .format(DATETIME_FORMAT);
            task.last_postponed_at = utcDate().format(DATETIME_FORMAT);

            await restClient.tasks.update(task);
        } catch (error) {
            handleError(error);
        }
    }

    function getCurrentUserOrThrow() {
        const currentUser = userStore.currentUser.value;

        if (!currentUser) {
            throw new Error('Current user not found');
        }

        return currentUser;
    }

    return {
        tasks,
        tags,
        filters,
        filteredTasks,
        selectedTask,
        fiveMostUsedTags,
        mostUrgentTasks,
        resetFilters,
        loadTasks,
        loadTags,
        addTask,
        selectNextUrgentTask,
        updateTask,
        destroyTask,
        addTag,
        updateTag,
        removeTag,
        addComment,
        removeComment,
        updateComment,
        addFile,
        getFileDownloadURL,
        removeFile,
        addTime,
    };
}
