<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $quote = (string) Inspiring::quotes()->random();
        $parts = preg_split('/\s+[-�]\s+/', $quote, 2) ?: [];
        $message = trim($parts[0] ?? $quote);
        $author = trim($parts[1] ?? 'Unknown');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => $message, 'author' => $author],
            'auth' => [
                'user' => $this->resolveAuthenticatedUser($request),
                'boards' => $request->user()?->allBoards()->get(['id', 'name', 'color']) ?? [],
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    /**
     * Share only the user fields the frontend actually needs.
     *
     * @return array<string, mixed>|null
     */
    private function resolveAuthenticatedUser(Request $request): ?array
    {
        $user = $request->user();

        if (! $user) {
            return null;
        }

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'email_verified_at' => $user->email_verified_at,
            'analytics_consent' => $user->analytics_consent,
            'created_at' => optional($user->created_at)?->toISOString(),
            'updated_at' => optional($user->updated_at)?->toISOString(),
        ];
    }
}
