<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use PostHog\PostHog;

class PostHogService
{
    private bool $enabled;

    public function __construct()
    {
        $apiKey = config('services.posthog.api_key');
        $host = config('services.posthog.host');

        $this->enabled = ! empty($apiKey);

        if ($this->enabled) {
            PostHog::init($apiKey, ['host' => $host]);
        }
    }

    public function capture(int $userId, string $event, array $properties = []): void
    {
        if (! $this->enabled || ! $this->hasConsent($userId)) {
            return;
        }

        if (app()->environment('local')) {
            Log::debug("[PostHog] Capturing event: {$event}", ['userId' => $userId, 'properties' => $properties]);
        }

        PostHog::capture([
            'distinctId' => (string) $userId,
            'event' => $event,
            'properties' => $properties,
        ]);
    }

    public function identify(int $userId, array $properties = []): void
    {
        if (! $this->enabled || ! $this->hasConsent($userId)) {
            return;
        }

        PostHog::identify([
            'distinctId' => (string) $userId,
            'properties' => $properties,
        ]);
    }

    private function hasConsent(int $userId): bool
    {
        return (bool) User::where('id', $userId)->value('analytics_consent');
    }
}
