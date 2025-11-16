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

test('dashboard displays global stats', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();

    Action::factory()->for($user1)->create(['packages_flipped' => 10]);
    Action::factory()->for($user1)->create(['packages_flipped' => 5]);
    Action::factory()->for($user2)->create(['packages_flipped' => 20]);

    $this->actingAs($user1);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    expect($response->viewData('page')['props']['globalStats']['totalShrimpHelped'])->toBe(35);
    expect($response->viewData('page')['props']['globalStats']['totalActions'])->toBe(3);
});

test('dashboard displays top 10 users in leaderboard', function () {
    $users = User::factory()->count(15)->create();

    foreach ($users as $index => $user) {
        Action::factory()->for($user)->create([
            'packages_flipped' => (15 - $index) * 10,
        ]);
    }

    $this->actingAs($users->first());

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    $leaderboard = $response->viewData('page')['props']['leaderboard'];
    expect($leaderboard)->toHaveCount(10);
    expect($leaderboard[0]['total_shrimp_helped'])->toBe(150);
    expect($leaderboard[9]['total_shrimp_helped'])->toBe(60);
});

test('current user in top 10 is marked correctly', function () {
    $currentUser = User::factory()->create();
    Action::factory()->for($currentUser)->create(['packages_flipped' => 100]);

    $otherUsers = User::factory()->count(5)->create();
    foreach ($otherUsers as $user) {
        Action::factory()->for($user)->create(['packages_flipped' => 50]);
    }

    $this->actingAs($currentUser);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    expect($response->viewData('page')['props']['currentUserInTop10'])->toBeTrue();
});

test('current user outside top 10 is marked correctly', function () {
    $topUsers = User::factory()->count(10)->create();
    foreach ($topUsers as $index => $user) {
        Action::factory()->for($user)->create([
            'packages_flipped' => (10 - $index) * 100,
        ]);
    }

    $currentUser = User::factory()->create();
    Action::factory()->for($currentUser)->create(['packages_flipped' => 10]);

    $this->actingAs($currentUser);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    expect($response->viewData('page')['props']['currentUserInTop10'])->toBeFalse();
    expect($response->viewData('page')['props']['currentUserStats']['total_shrimp_helped'])->toBe(10);
});

test('user with no actions appears in leaderboard with zero stats', function () {
    $userWithActions = User::factory()->create();
    Action::factory()->for($userWithActions)->create(['packages_flipped' => 50]);

    $currentUser = User::factory()->create();

    $this->actingAs($currentUser);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    expect($response->viewData('page')['props']['currentUserStats']['total_shrimp_helped'])->toBe(0);
    expect($response->viewData('page')['props']['currentUserStats']['total_actions'])->toBe(0);
});

test('leaderboard orders users by total shrimp helped', function () {
    $user1 = User::factory()->create(['name' => 'Alice']);
    $user2 = User::factory()->create(['name' => 'Bob']);
    $user3 = User::factory()->create(['name' => 'Charlie']);

    Action::factory()->for($user1)->create(['packages_flipped' => 30]);
    Action::factory()->for($user2)->create(['packages_flipped' => 50]);
    Action::factory()->for($user3)->create(['packages_flipped' => 10]);

    $this->actingAs($user1);

    $response = $this->get(route('dashboard'));

    $response->assertOk();
    $leaderboard = $response->viewData('page')['props']['leaderboard'];

    expect($leaderboard[0]['name'])->toBe('Bob');
    expect($leaderboard[1]['name'])->toBe('Alice');
    expect($leaderboard[2]['name'])->toBe('Charlie');
});
