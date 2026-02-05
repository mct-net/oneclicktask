<script setup lang="ts">
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/core/ui/avatar';
import { useInitials } from '@/composables/useInitials';
import { cn } from '@/lib/utils';
import type { User } from '@/types';
import { computed } from 'vue';

interface Props {
    user: User;
    showName?: boolean;
    showEmail?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showName: false,
    showEmail: false,
});

const { getInitials } = useInitials();

// Compute whether we should show the avatar image
const showAvatar = computed(
    () => props.user.avatar && props.user.avatar !== '',
);
</script>

<template>
    <Avatar
        :class="
            cn('h-8 w-8 overflow-hidden rounded-lg', $attrs.class as string)
        "
    >
        <AvatarImage v-if="showAvatar" :src="user.avatar!" :alt="user.name" />
        <AvatarFallback
            class="rounded-lg font-black text-foreground dark:text-primary-foreground"
        >
            {{ getInitials(user.name) }}
        </AvatarFallback>
    </Avatar>

    <div
        v-if="showName || showEmail"
        class="grid flex-1 text-left text-sm leading-tight"
    >
        <span v-if="showName" class="truncate font-medium">
            {{ user.name }}
        </span>
        <span v-if="showEmail" class="truncate text-xs text-muted-foreground">
            {{ user.email }}
        </span>
    </div>
</template>
