import { defineStore } from 'pinia';
import { ref } from 'vue';

import { restClient } from '@/lib/api';
import type { User } from '@/lib/types/models';
import { handleError } from '@/lib/utils/error';

export const useUserStore = defineStore('users', () => {
    const users = ref<User[]>([]);
    const currentUser = ref<User | null>(null);

    const loadCurrentUser = async () => {
        let error = false;

        try {
            const { data } = await restClient.users.getCurrent();
            currentUser.value = data;
        } catch (err) {
            error = true;
            handleError(err);
        }

        return { error };
    };

    const loadUsers = async () => {
        let error = false;

        try {
            const { data } = await restClient.users.getAll();
            users.value = data;
        } catch (err) {
            error = true;
            handleError(err);
        }

        return { error };
    };

    return { currentUser, users, loadCurrentUser, loadUsers };
});
