<?php

use App\Jobs\VerifyActionJob;
use App\Models\Action;
use App\Models\ActionVerification;
use App\Models\User;
use Illuminate\Support\Facades\Queue;

use function Pest\Laravel\actingAs;

test('verification status returns pending when no verification exists', function () {
    $action = Action::factory()->create();

    expect($action->verification_status)->toBe('pending');
});

test('verification status returns pending when verification has error', function () {
    $action = Action::factory()->create();
    ActionVerification::factory()->failed()->for($action)->create();

    $action->refresh();

    expect($action->verification_status)->toBe('pending');
});

test('verification status returns verified when confidence is 80 or above', function () {
    $action = Action::factory()->create();
    ActionVerification::factory()->for($action)->create([
        'ai_confidence_score' => 85,
    ]);

    $action->refresh();

    expect($action->verification_status)->toBe('verified');
});

test('verification status returns rejected when confidence is below 80', function () {
    $action = Action::factory()->create();
    ActionVerification::factory()->for($action)->create([
        'ai_confidence_score' => 65,
    ]);

    $action->refresh();

    expect($action->verification_status)->toBe('rejected');
});

test('actions index includes verification status', function () {
    $user = User::factory()->create();
    $action = Action::factory()->for($user)->create();
    ActionVerification::factory()->for($action)->create([
        'ai_confidence_score' => 90,
    ]);

    $response = actingAs($user)->get(route('actions.index'));

    $response->assertOk();
    $actions = $response->viewData('page')['props']['actions']['data'];
    expect($actions[0]['verification_status'])->toBe('verified');
});

test('action verification can be created with full data', function () {
    $action = Action::factory()->create();

    $verification = ActionVerification::factory()->for($action)->create([
        'ai_detected_packages' => 15,
        'ai_confidence_score' => 92.5,
        'location_verified' => true,
        'timestamp_verified' => true,
        'exif_data' => ['Make' => 'Apple', 'Model' => 'iPhone 14'],
        'ai_analysis' => 'Test analysis',
    ]);

    expect($verification->ai_detected_packages)->toBe(15);
    expect($verification->ai_confidence_score)->toBe('92.50');
    expect($verification->location_verified)->toBeTrue();
    expect($verification->timestamp_verified)->toBeTrue();
    expect($verification->exif_data)->toBeArray();
    expect($verification->ai_analysis)->toBe('Test analysis');
});

test('action verification relationship works correctly', function () {
    $action = Action::factory()->create();
    $verification = ActionVerification::factory()->for($action)->create();

    expect($action->verification->id)->toBe($verification->id);
    expect($verification->action->id)->toBe($action->id);
});
