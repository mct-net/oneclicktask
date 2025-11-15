import type { Ref } from 'vue';
import { computed, ref } from 'vue';

type PaginationOptions = {
    items: Ref<any[]>;
    itemsPerPage: number;
};

export function usePagination({ items, itemsPerPage }: PaginationOptions) {
    const currentPage = ref(1);

    const paginatedItems = computed(() => {
        const offset = (currentPage.value - 1) * itemsPerPage;
        return items.value.slice(offset, offset + itemsPerPage);
    });

    const totalPages = computed(() => {
        return Math.ceil(items.value.length / itemsPerPage);
    });

    const isLastPage = computed(() => {
        return currentPage.value * itemsPerPage >= items.value.length;
    });

    const isFirstPage = computed(() => {
        return currentPage.value === 1;
    });

    const goToNextPage = () => {
        currentPage.value++;
    };

    const goToPreviousPage = () => {
        currentPage.value--;
    };

    const totalCounter = computed(() => {
        return items.value.length;
    });

    return {
        currentPage,
        paginatedItems,
        totalPages,
        isLastPage,
        isFirstPage,
        totalCounter,
        goToNextPage,
        goToPreviousPage,
    };
}
