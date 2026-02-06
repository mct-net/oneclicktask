import type { User } from '@/types';

export type Comment = {
    id: number;
    content: string;
    created_at: string;
    user: User;
};

export type FileAttachment = {
    id: number;
    name: string;
    url: string;
    type: string;
};

export type Tag = {
    id: number;
    name: string;
};

export type Task = {
    id: number;
    name: string;
    content: string;
    author: User;
    color: string;
    tags: Tag[];
    comments?: Comment[];
    assignee?: User;
    due_date?: string;
    created_at: string;
    last_postponed_at?: string;
    is_starred?: boolean;
    is_important?: boolean;
    status:
        | 'in_progress'
        | 'done'
        | 'failed'
        | 'duplicate'
        | 'trashed'
        | 'backlog';
    files?: FileAttachment[];
};
