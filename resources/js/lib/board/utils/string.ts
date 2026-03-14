import type { User } from '@/types';

export const formatAuthorFullName = (author: User) => {
    return author.name;
};
