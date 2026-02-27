<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('settings/Analytics');
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'analytics_consent' => ['required', 'boolean'],
        ]);

        $request->user()->update($validated);

        return to_route('analytics.edit');
    }
}
