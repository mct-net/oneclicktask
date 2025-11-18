import { router } from '@inertiajs/vue3';
import { ref } from 'vue';

import type { SortByCriteria } from '@/composables/board/stores/useTaskStore';
import { useTaskStore } from '@/composables/board/stores/useTaskStore';
import type { Tag } from '@/lib/board/types/models';

type Layout = 'resume' | 'paginated';

// Module-level reactive state (singleton pattern)
const loading = ref(true);
const layout = ref<Layout>('resume');
const quickTagFilters = ref<Tag[]>([]);

export function useUIStore() {
    const updateRoute = () => {
        const taskStore = useTaskStore();

        if (taskStore.selectedTask.value) {
            // Use query param approach for Inertia
            router.visit(window.location.pathname, {
                data: { task: taskStore.selectedTask.value.id },
                preserveState: true,
                preserveScroll: true,
                only: [],
            });
        } else {
            router.visit(window.location.pathname, {
                data: {},
                preserveState: true,
                preserveScroll: true,
                only: [],
            });
        }
    };

    const changeLayout = (layout_: Layout, sortBy: SortByCriteria) => {
        layout.value = layout_;
        useTaskStore().filters.value.sortBy = sortBy;
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
