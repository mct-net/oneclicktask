import posthog from 'posthog-js';

let initialized = false;

export function initializeAnalytics() {
    if (typeof window === 'undefined') return;

    const apiKey = import.meta.env.VITE_POSTHOG_API_KEY;
    const host = import.meta.env.VITE_POSTHOG_HOST;

    if (!apiKey) return;

    posthog.init(apiKey, {
        api_host: host || 'https://us.i.posthog.com',
        autocapture: false,
        capture_pageview: true,
        error_tracking: {
            captureExtensionExceptions: false,
        },
        capture_pageleave: true,
        disable_session_recording: true,
        persistence: 'localStorage+cookie',
        opt_out_capturing_by_default: true,
    });

    initialized = true;

    if (window.location.hostname.includes('localhost')) {
        posthog.debug();
    }
}

export function useAnalytics() {
    function identify(user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
    }) {
        if (!initialized) return;
        posthog.identify(String(user.id), {
            name: user.name,
            email: user.email,
            signup_date: user.created_at,
        });
    }

    function reset() {
        if (!initialized) return;
        posthog.reset();
    }

    function capture(event: string, properties?: Record<string, unknown>) {
        if (!initialized) return;
        posthog.capture(event, properties);
    }

    function trackStatusChange() {
        const userId = posthog.get_distinct_id();
        const key = `task_status_changes_count_${userId}`;
        const count = parseInt(localStorage.getItem(key) ?? '0', 10) + 1;
        localStorage.setItem(key, String(count));

        if (count === 2) {
            capture('feedback_requested');
        }
    }

    function optIn() {
        if (!initialized) return;
        posthog.opt_in_capturing();
    }

    function optOut() {
        if (!initialized) return;
        posthog.opt_out_capturing();
    }

    function hasOptedIn(): boolean {
        if (!initialized) return false;
        return posthog.has_opted_in_capturing();
    }

    return {
        identify,
        reset,
        capture,
        trackStatusChange,
        optIn,
        optOut,
        hasOptedIn,
    };
}
