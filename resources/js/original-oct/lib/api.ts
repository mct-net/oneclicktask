import type { Task } from '@/lib/types/models';
import axios from 'axios';

const baseURL = '/admin/oneclicktask/api';

const apiClient = axios.create({
    baseURL,
});

export const restClient = {
    /*-------------------------------------
    Users
  -------------------------------------*/
    users: {
        getCurrent: () => apiClient.get('/users/current'),
        getAll: () => apiClient.get('/users'),
    },

    /*-------------------------------------
    Tasks
  -------------------------------------*/
    tasks: {
        getAll: () => apiClient.get('/tasks'),

        create: (task: Partial<Task>) => apiClient.post('/tasks', task),

        update: (task: Task) => {
            const updatableData = {
                ...task,
                assigneeId: task.assignee?.id,
            };
            return apiClient.put(`/tasks/${task.id}`, updatableData);
        },

        delete: (id: number) => apiClient.delete(`/tasks/${id}`),
    },

    /*-------------------------------------
    Tags
  -------------------------------------*/
    tags: {
        getAll: () => apiClient.get('/tags'),

        create: (taskId: number, name: string) =>
            apiClient.post(`/tasks/${taskId}/tags`, { name }),

        update: (taskId: number, tagId: number, name: string) =>
            apiClient.put(`/tasks/${taskId}/tags/${tagId}`, { name }),

        delete: (taskId: number, tagId: number) =>
            apiClient.delete(`/tasks/${taskId}/tags/${tagId}`),
    },

    /*-------------------------------------
    Comments
  -------------------------------------*/
    comments: {
        create: (taskId: number, content: string) =>
            apiClient.post('/comments', { taskId, content }),

        update: (commentId: number, content: string) =>
            apiClient.put(`/comments/${commentId}`, { content }),

        delete: (commentId: number) =>
            apiClient.delete(`/comments/${commentId}`),
    },

    /*-------------------------------------
    Files
  -------------------------------------*/
    files: {
        upload: (taskId: number, file: File) => {
            const formData = new FormData();
            formData.append('file_name', file);
            return apiClient.post(`/tasks/${taskId}/files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },

        getDownloadURL: (taskId: number, fileId: number) =>
            `${baseURL}/tasks/${taskId}/files/${fileId}/download`,

        delete: (taskId: number, fileId: number) =>
            apiClient.delete(`/tasks/${taskId}/files/${fileId}`),
    },
};
