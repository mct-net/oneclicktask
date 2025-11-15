import { usePagination } from '@/composables/board/pagination';
import { describe, expect, it } from 'vitest';
import { ref } from 'vue';

describe('usePagination() composable', () => {
    it('should return the correct pagination object', () => {
        const mockedItems = ref([
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
            { id: 4, name: 'Item 4' },
            { id: 5, name: 'Item 5' },
            { id: 6, name: 'Item 6' },
            { id: 7, name: 'Item 7' },
            { id: 8, name: 'Item 8' },
            { id: 9, name: 'Item 9' },
            { id: 10, name: 'Item 10' },
        ]);
        const {
            currentPage,
            paginatedItems,
            totalPages,
            isLastPage,
            isFirstPage,
            totalCounter,
            goToNextPage,
            goToPreviousPage,
        } = usePagination({
            items: mockedItems,
            itemsPerPage: 5,
        });

        expect(currentPage.value).toStrictEqual(1);
        expect(paginatedItems.value).toStrictEqual([
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
            { id: 4, name: 'Item 4' },
            { id: 5, name: 'Item 5' },
        ]);
        expect(totalPages.value).toStrictEqual(2);
        expect(isLastPage.value).toStrictEqual(false);
        expect(isFirstPage.value).toStrictEqual(true);
        expect(totalCounter.value).toStrictEqual(10);

        goToNextPage();

        expect(currentPage.value).toStrictEqual(2);
        expect(paginatedItems.value).toStrictEqual([
            { id: 6, name: 'Item 6' },
            { id: 7, name: 'Item 7' },
            { id: 8, name: 'Item 8' },
            { id: 9, name: 'Item 9' },
            { id: 10, name: 'Item 10' },
        ]);
        expect(isLastPage.value).toStrictEqual(true);
        expect(isFirstPage.value).toStrictEqual(false);

        goToPreviousPage();

        expect(currentPage.value).toStrictEqual(1);
        expect(paginatedItems.value).toStrictEqual([
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
            { id: 4, name: 'Item 4' },
            { id: 5, name: 'Item 5' },
        ]);
        expect(totalPages.value).toStrictEqual(2);
        expect(isLastPage.value).toStrictEqual(false);
        expect(isFirstPage.value).toStrictEqual(true);
        expect(totalCounter.value).toStrictEqual(10);
    });
});
