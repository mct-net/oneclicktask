<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
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
        if (
            $this->app->environment('production')
            || filter_var(env('APP_FORCE_HTTPS', false), FILTER_VALIDATE_BOOLEAN)
            || filter_var(env('FORCE_HTTPS', false), FILTER_VALIDATE_BOOLEAN)
        ) {
            URL::forceScheme('https');
        }
    }
}
