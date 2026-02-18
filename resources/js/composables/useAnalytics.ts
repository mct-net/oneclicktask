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
        capture_pageview: false,
        capture_pageleave: true,
        disable_session_recording: true,
        persistence: 'localStorage+cookie',
    });

    initialized = true;
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

    function capturePageview() {
        if (!initialized) return;
        posthog.capture('$pageview', {
            $current_url: window.location.href,
        });
    }

    return { identify, reset, capture, capturePageview };
}
