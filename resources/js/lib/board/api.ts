import axios from 'axios';

import CommentController from '@/actions/App/Http/Controllers/CommentController';
import FileAttachmentController from '@/actions/App/Http/Controllers/FileAttachmentController';
import TagController from '@/actions/App/Http/Controllers/TagController';
import TaskController from '@/actions/App/Http/Controllers/TaskController';
import TaskTagController from '@/actions/App/Http/Controllers/TaskTagController';
import UserController from '@/actions/App/Http/Controllers/UserController';

import type { Task } from '@/lib/board/types/models';
import { addUrlDefault } from '@/wayfinder';

const apiClient = axios.create();

/**
 * Set the current board ID as a URL default for Wayfinder routes
 */
export const setCurrentBoardId = (boardId: number) => {
    addUrlDefault('board', boardId);
};

/**
 * Helper function to pass arguments to Wayfinder routes when board is provided via URL defaults.
 */
export const withCurrentBoard = <T extends Record<string, unknown>>(
    args: T,
): any => {
    return args;
};

export const restClient = {
    /*--------------------------------------------------------------------------*/

    users: {
        /**
         * Get the currently authenticated user
         */
        getCurrent: () => {
            return apiClient.get(UserController.current.url());
        },

        /**
         * Get all users who are members of the current board
         * Board ID is automatically provided by Wayfinder URL defaults
         */
        getAll: () => {
            return apiClient.get(
                UserController.index.url(withCurrentBoard({})),
            );
        },
    },

    /*--------------------------------------------------------------------------*/

    tasks: {
        /**
         * Get all tasks for the current board
         * Board ID is automatically provided by Wayfinder URL defaults
         */
        getAll: () => {
            return apiClient.get(
                TaskController.index.url(withCurrentBoard({})),
            );
        },

        /**
         * Create a new task in the current board
         * Board ID is automatically provided by Wayfinder URL defaults
         * @param task - Partial task data
         */
        create: (task: Partial<Task>) => {
            const taskData = {
                name: task.name,
                content: task.content,
                assignee_id: task.assignee?.id,
                color: task.color,
                due_date: task.due_date,
                is_starred: task.is_starred,
                is_important: task.is_important,
                status: task.status,
                tags: task.tags?.map((tag) => tag.id),
            };
            return apiClient.post(
                TaskController.store.url(withCurrentBoard({})),
                taskData,
            );
        },

        /**
         * Update an existing task
         * Board ID is automatically provided by Wayfinder URL defaults
         * @param task - Task data with ID
         */
        update: (task: Task) => {
            const taskData = {
                name: task.name,
                content: task.content,
                assignee_id: task.assignee?.id,
                color: task.color,
                due_date: task.due_date,
                is_starred: task.is_starred,
                is_important: task.is_important,
                status: task.status,
                tags: task.tags?.map((tag) => tag.id),
            };
            return apiClient.put(
                TaskController.update.url(withCurrentBoard({ task: task.id })),
                taskData,
            );
        },

        /**
         * Delete a task
         * Board ID is automatically provided by Wayfinder URL defaults
         * @param id - Task ID to delete
         */
        delete: (id: number) => {
            return apiClient.delete(
                TaskController.destroy.url(withCurrentBoard({ task: id })),
            );
        },
    },

    /*--------------------------------------------------------------------------*/

    tags: {
        /**
         * Get all tags used in the current board
         * Board ID is automatically provided by Wayfinder URL defaults
         */
        getAll: () => {
            return apiClient.get(TagController.index.url(withCurrentBoard({})));
        },

        /**
         * Create a standalone tag (not attached to any task)
         * Board ID is automatically provided by Wayfinder URL defaults
         * @param name - The name of the tag to create
         */
        createStandalone: (name: string) => {
            return apiClient.post(
                TagController.store.url(withCurrentBoard({})),
                { name },
            );
        },

        /**
         * Attach a tag to a task (creates tag if it doesn't exist)
         * Board ID is automatically provided by Wayfinder URL defaults
         * @param taskId - The task to attach the tag to
         * @param name - The name of the tag to create/attach
         */
        create: (taskId: number, name: string) => {
            return apiClient.post(
                TaskTagController.attach.url(
                    withCurrentBoard({ task: taskId }),
                ),
                { name },
            );
        },

        /**
         * Update a tag's name (updates the global tag, affects all tasks)
         * Board ID is automatically provided by Wayfinder URL defaults
         * @param taskId - Any task that has this tag (required for route but not used)
         * @param tagId - The ID of the tag to update
         * @param name - The new name for the tag
         */
        update: (taskId: number, tagId: number, name: string) => {
            return apiClient.put(
                TaskTagController.update.url(
                    withCurrentBoard({
                        task: taskId,
                        tag: tagId,
                    }),
                ),
                { name },
            );
        },

        /**
         * Detach a tag from a task
         * Board ID is automatically provided by Wayfinder URL defaults
         * @param taskId - The task to detach the tag from
         * @param tagId - The ID of the tag to detach
         */
        delete: (taskId: number, tagId: number) => {
            return apiClient.delete(
                TaskTagController.detach.url(
                    withCurrentBoard({
                        task: taskId,
                        tag: tagId,
                    }),
                ),
            );
        },
    },

    /*--------------------------------------------------------------------------*/

    comments: {
        /**
         * Create a new comment on a task
         * Board ID is automatically provided by Wayfinder URL defaults
         * @param taskId - The task to add the comment to
         * @param content - The comment content
         */
        create: (taskId: number, content: string) =>
            apiClient.post(
                CommentController.store.url(withCurrentBoard({ task: taskId })),
                { content },
            ),

        /**
         * Update an existing comment
         * Board ID is automatically provided by Wayfinder URL defaults
         * @param taskId - The task that owns the comment
         * @param commentId - The ID of the comment to update
         * @param content - The new comment content
         */
        update: (taskId: number, commentId: number, content: string) =>
            apiClient.put(
                CommentController.update.url(
                    withCurrentBoard({ task: taskId, comment: commentId }),
                ),
                { content },
            ),

        /**
         * Delete a comment
         * Board ID is automatically provided by Wayfinder URL defaults
         * @param taskId - The task that owns the comment
         * @param commentId - The ID of the comment to delete
         */
        remove: (taskId: number, commentId: number) =>
            apiClient.delete(
                CommentController.destroy.url(
                    withCurrentBoard({ task: taskId, comment: commentId }),
                ),
            ),
    },

    /*--------------------------------------------------------------------------*/

    files: {
        upload: (taskId: number, file: File) => {
            const formData = new FormData();
            formData.append('file', file);
            return apiClient.post(
                FileAttachmentController.store.url(
                    withCurrentBoard({ task: taskId }),
                ),
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
        },

        getDownloadURL: (taskId: number, fileId: number) =>
            FileAttachmentController.show.url(
                withCurrentBoard({ task: taskId, file: fileId }),
            ),

        delete: (taskId: number, fileId: number) =>
            apiClient.delete(
                FileAttachmentController.destroy.url(
                    withCurrentBoard({ task: taskId, file: fileId }),
                ),
            ),
    },
};
