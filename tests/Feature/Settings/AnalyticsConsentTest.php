<?php

use App\Models\User;

test('analytics settings page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('analytics.edit'));

    $response->assertStatus(200);
});

test('analytics consent can be enabled', function () {
    $user = User::factory()->create(['analytics_consent' => false]);

    $response = $this
        ->actingAs($user)
        ->from(route('analytics.edit'))
        ->patch(route('analytics.update'), [
            'analytics_consent' => true,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('analytics.edit'));

    expect($user->fresh()->analytics_consent)->toBeTrue();
});

test('analytics consent can be revoked', function () {
    $user = User::factory()->create(['analytics_consent' => true]);

    $response = $this
        ->actingAs($user)
        ->from(route('analytics.edit'))
        ->patch(route('analytics.update'), [
            'analytics_consent' => false,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('analytics.edit'));

    expect($user->fresh()->analytics_consent)->toBeFalse();
});

test('analytics consent defaults to null for new users', function () {
    $user = User::factory()->create(['analytics_consent' => null]);

    expect($user->fresh()->analytics_consent)->toBeNull();
});
