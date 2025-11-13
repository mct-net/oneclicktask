<script setup lang="ts">
import { index as boardsIndex } from '@/actions/App/Http/Controllers/BoardController';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';

interface Board {
    id: number;
    name: string;
    description: string | null;
    color: string | null;
    owner_id: number;
    created_at: string;
    updated_at: string;
}

const props = defineProps<{
    board: Board;
}>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Boards',
        href: boardsIndex().url,
    },
    {
        title: props.board.name,
    },
];
</script>

<template>
    <Head :title="board.name" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div
            class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"
        >
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold">{{ board.name }}</h1>
            </div>
            <p v-if="board.description" class="text-muted-foreground">
                {{ board.description }}
            </p>
            <!-- OCT -->
        </div>
    </AppLayout>
</template>
