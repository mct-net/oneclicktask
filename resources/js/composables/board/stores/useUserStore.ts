import { ref } from 'vue';

import { restClient } from '@/lib/board/api';
import { handleError } from '@/lib/board/utils/error';
import type { User } from '@/types';

// Module-level reactive state (singleton pattern)
const users = ref<User[]>([]);
const currentUser = ref<User | null>(null);

export function useUserStore() {
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
}
