<script setup lang="ts">
import IconDrink from '@/components/board/icons/IconDrink.vue';
import { twMerge } from 'tailwind-merge';

const props = withDefaults(
    defineProps<{
        messages?: string[];
        hideIcon?: boolean;
    }>(),
    {
        messages: () => [
            'No tasks? Embrace the freedom!',
            'Empty task list - time for a well-deserved break!',
            'Task list is clear! Take a breather.',
        ],
    },
);

const message =
    props.messages[Math.floor(Math.random() * props.messages.length)];
</script>

<template>
    <section class="flex grow items-center justify-center">
        <div
            data-testid="empty-state"
            :class="
                twMerge(
                    'mt-10 mb-40 flex w-fit flex-col items-center justify-center gap-x-3 rounded-md border-2 border-dashed p-5 pb-7',
                    ($attrs.class as string) || '',
                )
            "
        >
            <IconDrink v-if="!hideIcon" />
            <p class="mt-2 w-44 text-center">{{ message }}</p>
        </div>
    </section>
</template>
