<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('authenticated users only receive whitelisted auth fields', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('profile.edit'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('settings/Profile')
            ->where('auth.user.id', $user->id)
            ->where('auth.user.name', $user->name)
            ->where('auth.user.email', $user->email)
            ->where('auth.user.analytics_consent', $user->analytics_consent)
            ->missing('auth.user.password')
            ->missing('auth.user.remember_token')
            ->missing('auth.user.two_factor_secret')
        );
});
