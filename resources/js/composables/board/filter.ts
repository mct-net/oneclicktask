import type { Task } from '@/lib/board/types/models';
import {
    filterDoneThisWeek,
    filterDueThisWeek,
    filterDueToday,
    filterDueTomorrow,
    filterNewThisWeek,
    filterOverdue,
    filterOverdueOrDueToday,
    sortByCreationDate,
} from '@/lib/board/utils/tasks';
import { computed, ref, type Ref } from 'vue';

const emptyStateMessages = [
    "Nothing urgent - you're all caught up!",
    'All clear for today! Future you says thanks.',
    'No pressing deadlines - nice work!',
    "Everything's handled for now. High five!",
    "Today's tasks: done and dusted!",
    'Up to date and ready for tomorrow!',
    'Inbox zero for urgent tasks - well done!',
    'No overdue items - keeping it professional!',
    'Smooth sailing - nothing urgent pending.',
    "Today's workload: conquered!",
];

type UrgentFilter = 'today' | 'tomorrow' | 'this_week' | 'overdue' | null;

export function useUrgentTasks(tasks: Ref<Task[]>) {
    const activeFilter = ref<UrgentFilter>(null);

    const filteredTasks = computed(() => {
        switch (activeFilter.value) {
            case 'overdue':
                return filterOverdue(tasks.value);
            case 'today':
                return filterDueToday(tasks.value);
            case 'tomorrow':
                return filterDueTomorrow(tasks.value);
            case 'this_week':
                return filterDueThisWeek(tasks.value);
            default:
                return filterOverdueOrDueToday(tasks.value);
        }
    });

    const toggleFilter = (filter: UrgentFilter) => {
        activeFilter.value = activeFilter.value === filter ? null : filter;
    };

    return computed(() => ({
        top5: filteredTasks.value.slice(0, 5),
        stats: [
            {
                name: 'Today',
                count: filterDueToday(tasks.value).length,
                toggle: () => toggleFilter('today'),
                active: activeFilter.value === 'today',
            },
            {
                name: 'Tomorrow',
                count: filterDueTomorrow(tasks.value).length,
                toggle: () => toggleFilter('tomorrow'),
                active: activeFilter.value === 'tomorrow',
            },
            {
                name: 'This week',
                count: filterDueThisWeek(tasks.value).length,
                toggle: () => toggleFilter('this_week'),
                active: activeFilter.value === 'this_week',
            },
            {
                name: 'Overdue',
                count: filterOverdue(tasks.value).length,
                toggle: () => toggleFilter('overdue'),
                active: activeFilter.value === 'overdue',
            },
        ],
        emptyStateMessages,
    }));
}

type RecentFilter = 'new_this_week' | 'done_this_week' | null;

export function useRecentTasks(tasks: Ref<Task[]>) {
    const activeFilter = ref<RecentFilter>(null);

    const filteredTasks = computed(() => {
        switch (activeFilter.value) {
            case 'new_this_week':
                return filterNewThisWeek(tasks.value).sort(sortByCreationDate);
            case 'done_this_week':
                return filterDoneThisWeek(tasks.value).sort(sortByCreationDate);
            default:
                return [...tasks.value].sort(sortByCreationDate);
        }
    });

    const toggleFilter = (filter: RecentFilter) => {
        activeFilter.value = activeFilter.value === filter ? null : filter;
    };

    return computed(() => ({
        top5: filteredTasks.value.slice(0, 5),
        stats: [
            {
                name: 'New this week',
                count: filterNewThisWeek(tasks.value).length,
                toggle: () => toggleFilter('new_this_week'),
                active: activeFilter.value === 'new_this_week',
            },
            {
                name: 'Done this week',
                count: filterDoneThisWeek(tasks.value).length,
                toggle: () => toggleFilter('done_this_week'),
                active: activeFilter.value === 'done_this_week',
            },
        ],
    }));
}
