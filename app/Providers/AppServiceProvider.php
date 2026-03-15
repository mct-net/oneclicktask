<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(\App\Services\PostHogService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureViteAssetMode();

        if (
            $this->app->environment('production')
            || filter_var(env('APP_FORCE_HTTPS', false), FILTER_VALIDATE_BOOLEAN)
            || filter_var(env('FORCE_HTTPS', false), FILTER_VALIDATE_BOOLEAN)
        ) {
            URL::forceScheme('https');
        }
    }

    protected function configureViteAssetMode(): void
    {
        $request = $this->app->bound('request')
            ? $this->app->make(Request::class)
            : null;

        if (! $request instanceof Request) {
            return;
        }

        $disabledHotFile = storage_path('framework/vite.disabled.hot');

        Vite::useHotFile($disabledHotFile);

        $previewHosts = array_values(array_filter(array_map(
            'trim',
            explode(',', env('PREVIEW_VITE_HOSTS', 'preview.oneclicktask.com')),
        )));

        if (! in_array($request->getHost(), $previewHosts, true)) {
            return;
        }

        $previewOrigin = rtrim(
            env('PREVIEW_VITE_ORIGIN', 'https://preview.oneclicktask.com'),
            '/',
        );
        $previewHotFile = storage_path('framework/vite.preview.hot');
        $previewHotDirectory = dirname($previewHotFile);

        if (! is_dir($previewHotDirectory)) {
            mkdir($previewHotDirectory, 0755, true);
        }

        if (! is_file($previewHotFile) || trim((string) file_get_contents($previewHotFile)) !== $previewOrigin) {
            file_put_contents($previewHotFile, $previewOrigin);
        }

        Vite::useHotFile($previewHotFile);
    }
}
