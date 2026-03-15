import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { ToastProvider } from 'reka-ui';
export { default as Toast } from './Toast.vue';
export { default as ToastAction } from './ToastAction.vue';
export { default as ToastClose } from './ToastClose.vue';
export { default as ToastDescription } from './ToastDescription.vue';
export { default as ToastTitle } from './ToastTitle.vue';
export { default as ToastViewport } from './ToastViewport.vue';

export const toastVariants = cva(
    'group pointer-events-auto relative flex w-full items-stretch overflow-hidden rounded-md shadow-lg transition-all data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--reka-toast-swipe-end-x)] data-[swipe=end]:animate-out data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:sm:slide-in-from-bottom-full',
    {
        variants: {
            variant: {
                default: 'bg-background text-foreground',
                success:
                    'border-green-500/50 bg-background text-foreground after:absolute after:top-0 after:bottom-0 after:left-0 after:w-2 after:bg-green-500',
                error: 'border-red-500/50 bg-background text-foreground after:absolute after:top-0 after:bottom-0 after:left-0 after:w-2 after:bg-red-500',
                warning:
                    'border-yellow-500/50 bg-background text-foreground after:absolute after:top-0 after:bottom-0 after:left-0 after:w-2 after:bg-yellow-500',
                info: 'border-blue-500/50 bg-background text-foreground after:absolute after:top-0 after:bottom-0 after:left-0 after:w-2 after:bg-blue-500',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export type ToastVariants = VariantProps<typeof toastVariants>;

export interface ToastProps {
    id: string;
    message: string;
    type?: 'default' | 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}
