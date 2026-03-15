import { ref } from 'vue';

import type { SortByCriteria } from '@/composables/board/stores/useTaskStore';
import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import { useAnalytics } from '@/composables/useAnalytics';
import type { Tag } from '@/lib/board/types/models';

type Layout = 'resume' | 'paginated';

// Module-level reactive state (singleton pattern)
const loading = ref(true);
const layout = ref<Layout>('resume');
const quickTagFilters = ref<Tag[]>([]);

export function useUIStore() {
    const updateRoute = () => {
        const taskStore = useTaskStore();

        // Use browser history API to avoid triggering full route updates
        const url = new URL(window.location.href);

        if (taskStore.selectedTask.value) {
            url.searchParams.set(
                'task',
                String(taskStore.selectedTask.value.id),
            );
        } else {
            url.searchParams.delete('task');
        }

        window.history.replaceState({}, '', url);
    };

    const changeLayout = (layout_: Layout, sortBy: SortByCriteria) => {
        layout.value = layout_;
        useTaskStore().filters.value.sortBy = sortBy;

        const { capture } = useAnalytics();
        capture('layout_changed', { layout: layout_, sort_by: sortBy });
    };

    const clearSelectedTask = () => {
        useTaskStore().selectedTask.value = null;
        updateRoute();
    };

    return {
        loading,
        layout,
        quickTagFilters,
        changeLayout,
        clearSelectedTask,
        updateRoute,
    };
}
