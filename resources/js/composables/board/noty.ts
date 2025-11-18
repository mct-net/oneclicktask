import Noty from 'noty';

type UseNotyArgs = {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
};

export function useNoty({
    message,
    type = 'error',
    duration = 3,
}: UseNotyArgs) {
    const noty = new Noty({
        /*
        Backstrap is a custom theme by the author of Laravel Backpack.

        See:
        - https://github.com/DigitallyHappy/BackStrap
    */
        theme: 'backstrap' as any,
        text: message,
        type,
        timeout: duration * 1000,
    });

    const setNoty = () => {
        noty.show();
    };

    const clearNoty = () => {
        noty.close();
    };

    return {
        setNoty,
        clearNoty,
    };
}
