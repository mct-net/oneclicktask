import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { defineConfig, loadEnv } from 'vite';

const parsePort = (value: string | undefined, fallback: number): number => {
    const parsed = Number(value);

    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const parseCsv = (value: string | undefined): string[] =>
    (value ?? '')
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean);

const hostnameFromUrl = (value: string | undefined): string | undefined => {
    if (! value) {
        return undefined;
    }

    try {
        return new URL(value).hostname;
    } catch {
        return undefined;
    }
};

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const devServerHost = env.VITE_DEV_SERVER_HOST || '127.0.0.1';
    const devServerPort = parsePort(env.VITE_DEV_SERVER_PORT, 5173);
    const devServerOrigin = env.VITE_DEV_SERVER_ORIGIN || undefined;
    const devServerUsesTls = devServerOrigin?.startsWith('https://') ?? false;
    const hmrHost = env.VITE_HMR_HOST || hostnameFromUrl(devServerOrigin);
    const hmrProtocol = env.VITE_HMR_PROTOCOL || (devServerUsesTls ? 'wss' : 'ws');
    const hmrClientPort = parsePort(
        env.VITE_HMR_CLIENT_PORT,
        devServerUsesTls ? 443 : devServerPort,
    );

    const allowedHosts = Array.from(
        new Set(
            [
                'localhost',
                '127.0.0.1',
                hostnameFromUrl(env.APP_URL),
                hostnameFromUrl(devServerOrigin),
                hmrHost,
                ...parseCsv(env.VITE_ALLOWED_HOSTS),
            ].filter((value): value is string => Boolean(value)),
        ),
    );

    return {
        server: {
            host: devServerHost,
            port: devServerPort,
            strictPort: true,
            origin: devServerOrigin,
            allowedHosts,
            hmr: hmrHost
                ? {
                      host: hmrHost,
                      protocol: hmrProtocol,
                      clientPort: hmrClientPort,
                  }
                : undefined,
        },
        plugins: [
            laravel({
                input: ['resources/js/app.ts'],
                ssr: 'resources/js/ssr.ts',
                refresh: true,
            }),
            tailwindcss(),
            wayfinder({
                formVariants: true,
            }),
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
        ],
    };
});
