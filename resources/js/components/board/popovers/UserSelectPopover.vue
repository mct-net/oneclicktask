<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import type { VNode } from 'vue';
import { computed, ref, watch } from 'vue';

import BaseInput from '@/components/board/common/BaseInput.vue';
import IconAddUser from '@/components/board/icons/IconAddUser.vue';
import IconCircleMinus from '@/components/board/icons/IconCircleMinus.vue';
import IconCirclePlus from '@/components/board/icons/IconCirclePlus.vue';
import IconClose from '@/components/board/icons/IconClose.vue';
import IconEmptyCircle from '@/components/board/icons/IconEmptyCircle.vue';
import IconSearch from '@/components/board/icons/IconSearch.vue';
import UserInfo from '@/components/core/UserInfo.vue';

import { useUserStore } from '@/composables/board/stores/useUserStore';
import { UNASSIGNED_USER } from '@/lib/board/constants';
import type { User } from '@/types';

/*-------------------------------------
  State
-------------------------------------*/
const props = defineProps<{
    selectedUsers: User[];
    withUnassignedOption?: boolean;
}>();

const query = ref('');
const popoverRef = ref<VNode>();

const { users } = useUserStore();
const allUsers = computed(() => {
    return props.withUnassignedOption
        ? [UNASSIGNED_USER, ...users.value]
        : users.value;
});

const sortedUsers = computed(() => {
    const selectedUsers = props.selectedUsers;
    const unselectedUsers = allUsers.value.filter(
        (user) => !selectedUsers.some((user_) => user.id === user_.id),
    );
    return [...selectedUsers, ...unselectedUsers];
});

const filteredUsers = computed(() => {
    return query.value
        ? sortedUsers.value.filter((user) =>
              user.name.toLowerCase().includes(query.value.toLowerCase()),
          )
        : sortedUsers.value;
});

/*-------------------------------------
  Emits
-------------------------------------*/
defineEmits(['add', 'remove']);

/*-------------------------------------
  Methods
-------------------------------------*/
const onClearInput = (inputRef: HTMLInputElement | null) => {
    if (inputRef) {
        query.value = '';
        inputRef.focus();
    }
};

const isSelectedUser = (user: User) => {
    return props.selectedUsers.some((user_) => user.id === user_.id);
};

const isUnassignedUser = (user: User) => {
    return user.id === UNASSIGNED_USER.id;
};

/*-------------------------------------
  Lifecycle
-------------------------------------*/
watch(
    () => popoverRef.value?.el,
    (el) => {
        if (!el) {
            query.value = '';
        }
    },
);
</script>

<template>
    <Popover class="relative flex items-center">
        <PopoverButton class="outline-hidden">
            <slot>
                <div class="rounded-full">
                    <IconAddUser
                        class="text-muted-foreground"
                        title=" Select user"
                    />
                </div>
            </slot>
        </PopoverButton>

        <PopoverPanel
            ref="popoverRef"
            class="absolute top-[calc(100%+0.4rem)] -right-2 z-10"
        >
            <div class="w-60 rounded-md bg-surface shadow-popover">
                <div class="p-3">
                    <BaseInput
                        placeholder="Search user..."
                        v-model="query"
                        v-slot="{ inputRef }"
                        class=""
                    >
                        <button
                            v-if="query.trim()"
                            class="relative -right-2 rounded-md p-2"
                            @click="onClearInput(inputRef)"
                        >
                            <IconClose />
                        </button>
                        <IconSearch v-else />
                    </BaseInput>
                </div>

                <ul
                    class="flex max-h-44 flex-col overflow-y-auto"
                    aria-label="User list"
                >
                    <li
                        v-for="user in filteredUsers"
                        :key="user.id"
                        class="flex cursor-pointer items-center justify-between px-3 py-1.5 leading-none"
                        :class="{
                            'bg-interactive-primary/10': isSelectedUser(user),
                        }"
                        @click="
                            isSelectedUser(user)
                                ? $emit('remove', user)
                                : $emit('add', user)
                        "
                    >
                        <!-- Info -->
                        <div class="flex items-center gap-3">
                            <div
                                v-if="isUnassignedUser(user)"
                                class="h-8 w-8 shrink-0 overflow-hidden rounded-full"
                            >
                                <IconEmptyCircle
                                    class="h-full w-full text-muted-foreground opacity-50"
                                    :stroke-width="0.6"
                                />
                            </div>

                            <UserInfo
                                v-else
                                :user="user"
                                class="h-8 w-8 shrink-0 rounded-full"
                            />

                            <p class="text-sm font-bold">
                                {{ user.name }}
                            </p>
                        </div>

                        <!-- Action -->
                        <IconCircleMinus
                            class="text-muted-foreground"
                            v-if="isSelectedUser(user)"
                        />
                        <IconCirclePlus class="text-muted-foreground" v-else />
                    </li>
                </ul>
            </div>
        </PopoverPanel>
    </Popover>
</template>
