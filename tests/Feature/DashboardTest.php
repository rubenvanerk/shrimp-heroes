<?php

use App\Models\Action;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('dashboard'))->assertOk();
});

test('dashboard displays user stats', function () {
    $shrimpPerPackage = config('shrimp-heroes.shrimp_per_package');

    $user = User::factory()->create();
    Action::factory()->for($user)->create(['packages_flipped' => 10]);
    Action::factory()->for($user)->create(['packages_flipped' => 5]);

    $this->actingAs($user);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    expect($response->viewData('page')['props']['userStats']['totalPackagesFlipped'])->toBe(15);
    expect($response->viewData('page')['props']['userStats']['totalShrimpHelped'])->toBe(15 * $shrimpPerPackage);
    expect($response->viewData('page')['props']['userStats']['totalActions'])->toBe(2);
});

test('dashboard displays user name for welcome message', function () {
    $user = User::factory()->create(['name' => 'John Doe']);

    $this->actingAs($user);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    expect($response->viewData('page')['props']['userName'])->toBe('John Doe');
});

test('dashboard displays user actions', function () {
    $user = User::factory()->create();
    Action::factory()->for($user)->count(3)->create();

    $this->actingAs($user);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    expect($response->viewData('page')['props']['actions']['data'])->toHaveCount(3);
});

test('dashboard only shows current user actions', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    Action::factory()->for($user)->count(2)->create();
    Action::factory()->for($otherUser)->count(3)->create();

    $this->actingAs($user);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    expect($response->viewData('page')['props']['actions']['data'])->toHaveCount(2);
});

test('dashboard shows zero stats for user with no actions', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    expect($response->viewData('page')['props']['userStats']['totalPackagesFlipped'])->toBe(0);
    expect($response->viewData('page')['props']['userStats']['totalShrimpHelped'])->toBe(0);
    expect($response->viewData('page')['props']['userStats']['totalActions'])->toBe(0);
});
