import { useToast } from '@/composables/useToast';
import { posthog } from 'posthog-js';

export function handleError(error: any) {
    let message = 'An unexpected error occurred. Please try again later.';

    if (error?.response?.status === 401) {
        message =
            'Session expired. Your changes could not be saved. Please log in again.';
    }

    const { toast } = useToast();
    toast({
        message,
        type: 'error',
        duration: 5,
    });

    console.error(error);
    posthog.captureException(error, { error });
}

/**
 * Wraps an async function to catch errors without try-catch blocks.
 * Returns a tuple: [data, null] on success or [null, error] on failure.
 *
 * @example
 * const [data, error] = await safely(fetchData());
 * if (error) {
 *   // handle error
 *   return;
 * }
 * // use data
 */
export async function safely<T>(
    promise: Promise<T>,
): Promise<[T, null] | [null, Error]> {
    try {
        const data = await promise;
        return [data, null];
    } catch (error) {
        console.error(error);
        return [
            null,
            error instanceof Error ? error : new Error(String(error)),
        ];
    }
}

/**
 * Wraps a synchronous function to catch errors without try-catch blocks.
 * Returns a tuple: [data, null] on success or [null, error] on failure.
 *
 * @example
 * const [data, error] = safelySync(() => JSON.parse(jsonString));
 * if (error) {
 *   // handle error
 *   return;
 * }
 * // use data
 */
export function safelySync<T>(fn: () => T): [T, null] | [null, Error] {
    try {
        const data = fn();
        return [data, null];
    } catch (error) {
        console.error(error);
        return [
            null,
            error instanceof Error ? error : new Error(String(error)),
        ];
    }
}
