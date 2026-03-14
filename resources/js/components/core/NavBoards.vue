<script setup lang="ts">
import { show as boardShow } from '@/actions/App/Http/Controllers/BoardController';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/core/ui/sidebar';
import { urlIsActive } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/vue3';
import { Layers } from 'lucide-vue-next';
import { computed } from 'vue';

const page = usePage();

const boards = computed(() => page.props.auth.boards || []);
</script>

<template>
    <SidebarGroup class="px-2 py-0">
        <SidebarGroupLabel>Boards</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem v-for="board in boards" :key="board.id">
                <SidebarMenuButton
                    as-child
                    :is-active="urlIsActive(boardShow(board).url, page.url)"
                    :tooltip="board.name"
                >
                    <Link :href="boardShow(board).url">
                        <Layers />
                        <span>{{ board.name }}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>
