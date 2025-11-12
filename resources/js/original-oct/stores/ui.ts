import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import type { Tag } from '@/lib/types/models';
import type { SortByCriteria } from '@/stores/task';
import { useTaskStore } from '@/stores/task';

type Layout = 'resume' | 'paginated';

export const useUIStore = defineStore('ui', () => {
    const router = useRouter();

    const loading = ref(true);
    const layout = ref<Layout>('resume');
    const quickTagFilters = ref<Tag[]>([]);

    const updateRoute = () => {
        const taskStore = useTaskStore();
        if (taskStore.selectedTask) {
            router.push(`/${taskStore.selectedTask.id}`);
        } else {
            router.push('/');
        }
    };

    const changeLayout = (layout_: Layout, sortBy: SortByCriteria) => {
        layout.value = layout_;
        useTaskStore().filters.sortBy = sortBy;
    };

    const clearSelectedTask = () => {
        useTaskStore().selectedTask = null;
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
});
