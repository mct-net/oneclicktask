import { useNoty } from '@/composables/noty';

export function handleError(error: any) {
    let message = 'An unexpected error occurred. Please try again later.';

    if (error?.response?.status === 401) {
        message =
            'Session expired. Your changes could not be saved. Please log in again.';
    }

    const { setNoty } = useNoty({
        message,
        type: 'error',
        duration: 5,
    });
    setNoty();

    console.error(error);
}
