import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

import { DATETIME_FORMAT } from '@/lib/board/constants';

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.extend(utc);

dayjs.updateLocale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: '1s',
        m: '1m',
        mm: '%dm',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        M: '1mo',
        MM: '%dmo',
        y: '1y',
        yy: '%dy',
    },
});

export function getRandomDateWithinThisWeek() {
    const today = dayjs();
    const startOfWeek = today.startOf('week');

    // Generate a random day within this week that's different from today.
    let randomDay;
    do {
        // A random integer between 1 and 5.
        const randomNumber = Math.floor(Math.random() * 5) + 1;

        randomDay = startOfWeek.add(randomNumber, 'day');
    } while (randomDay.isSame(today));
    return randomDay;
}

export function formatRelativeTime(date: string) {
    return dayjs.utc(date, DATETIME_FORMAT).fromNow();
}

export function utcDate(date?: string) {
    return dayjs.utc(date, DATETIME_FORMAT);
}

export function formatDueDate(dueDate?: string): string {
    if (!dueDate) return 'No due date';

    const date = utcDate(dueDate);
    const formattedDate = date.format('MMM D');

    return `${formattedDate}   ➜   ${formatRelativeTime(dueDate)}`;
}
