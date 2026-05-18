import { defineConfig } from 'playwright/test';

export default defineConfig({
    testDir: './tests/playwright',
    fullyParallel: false,
    retries: 0,
    reporter: 'list',
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:8005',
        headless: true,
        screenshot: 'only-on-failure',
        viewport: {
            width: 1440,
            height: 1100,
        },
    },
});
