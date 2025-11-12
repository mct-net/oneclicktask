import type { User } from '@/lib/types/models';

export const formatAuthorFullName = (author: User) => {
    return `${author.firstName || ''} ${author.lastName || ''}`;
};
