import type { ToastProps } from '@/components/core/ui/toast';
import { ref } from 'vue';

const TOAST_LIMIT = 5;

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
    message: string;
    type?: ToastType;
    duration?: number;
}

const toasts = ref<ToastProps[]>([]);

let toastIdCounter = 0;

function generateId(): string {
    return `toast-${++toastIdCounter}-${Date.now()}`;
}

export function useToast() {
    const toast = ({ message, type = 'error', duration = 3 }: ToastOptions) => {
        const id = generateId();

        const newToast: ToastProps = {
            id,
            message,
            type,
            duration: duration * 1000,
        };

        toasts.value = [newToast, ...toasts.value].slice(0, TOAST_LIMIT);

        return id;
    };

    const dismiss = (id?: string) => {
        if (id) {
            toasts.value = toasts.value.filter((t) => t.id !== id);
        } else {
            toasts.value = [];
        }
    };

    const onOpenChange = (id: string, open: boolean) => {
        if (!open) {
            dismiss(id);
        }
    };

    return {
        toast,
        dismiss,
        toasts,
        onOpenChange,
    };
}
