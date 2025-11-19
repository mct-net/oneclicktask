import type { User } from '@/lib/board/types/models';

export const EMPTY_TASK_COLOR = 'transparent' as const;
export const DEFAULT_TASK_COLOR = EMPTY_TASK_COLOR;
export const DEFAULT_TASK_STATUS = 'backlog';

export const TASK_COLORS = {
    red: 'var(--red-500)',
    orange: 'var(--orange-500)',
    yellow: 'var(--yellow-500)',
    green: 'var(--green-500)',
    blue: 'var(--blue-500)',
    lilac: 'var(--lilac-500)',
    purple: 'var(--purple-500)',
    gray: 'var(--gray-500)',
    darkGray: 'var(--black)',
};

export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const IMAGE_EXTENSIONS = [
    'png',
    'jpe',
    'jpeg',
    'jpg',
    'gif',
    'bmp',
    'ico',
    'tiff',
    'tif',
    'svg',
    'svgz',
];

export const UNASSIGNED_USER: User = {
    id: 12345678901234567890,
    username: 'unassigned',
    firstName: 'Unassigned',
    lastName: '',
    avatarUrl: '',
};
