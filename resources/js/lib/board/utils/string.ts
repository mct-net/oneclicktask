import type { User } from '@/lib/board/types/models';

export const formatAuthorFullName = (author: User) => {
    return `${author.firstName || ''} ${author.lastName || ''}`;
};
