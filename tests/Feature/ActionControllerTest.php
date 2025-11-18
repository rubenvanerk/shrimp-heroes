<?php

use App\Models\Action;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    Storage::fake('public');
    Queue::fake();
});

test('action can be created successfully', function () {
    $user = User::factory()->create();
    $store = Store::factory()->create();

    actingAs($user)->post(route('actions.store'), [
        'store_id' => $store->id,
        'packages_flipped' => 50,
        'notes' => 'Test action',
    ])
        ->assertRedirect(route('actions.index'))
        ->assertSessionHas('success');

    expect(Action::count())->toBe(1);
    $action = Action::first();
    expect($action->packages_flipped)->toBe(50);
    expect($action->notes)->toBe('Test action');
});

test('action store includes shrimp helped in flash message', function () {
    $user = User::factory()->create();
    $store = Store::factory()->create();

    $response = actingAs($user)->post(route('actions.store'), [
        'store_id' => $store->id,
        'packages_flipped' => 50,
        'notes' => 'Test action',
    ]);

    $response->assertRedirect(route('actions.index'));
    
    $session = $response->getSession();
    $success = $session->get('success');
    
    expect($success)->toBeArray();
    expect($success)->toHaveKey('message');
    expect($success)->toHaveKey('shrimp_helped');
    expect($success['shrimp_helped'])->toBe(50 * 34); // 50 packages * 34 shrimp per package
});

test('action store calculates shrimp helped correctly', function () {
    $user = User::factory()->create();
    $store = Store::factory()->create();

    $testCases = [
        ['packages' => 10, 'expected' => 340],
        ['packages' => 100, 'expected' => 3400],
        ['packages' => 1, 'expected' => 34],
    ];

    foreach ($testCases as $testCase) {
        $response = actingAs($user)->post(route('actions.store'), [
            'store_id' => $store->id,
            'packages_flipped' => $testCase['packages'],
            'notes' => 'Test action',
        ]);

        $session = $response->getSession();
        $success = $session->get('success');
        
        expect($success['shrimp_helped'])->toBe($testCase['expected']);
    }
});

test('action store works with photos', function () {
    $user = User::factory()->create();
    $store = Store::factory()->create();

    $photo = UploadedFile::fake()->image('action.jpg');

    actingAs($user)->post(route('actions.store'), [
        'store_id' => $store->id,
        'packages_flipped' => 25,
        'notes' => 'Test with photo',
        'photos' => [$photo],
    ])
        ->assertRedirect(route('actions.index'));

    $action = Action::first();
    expect($action->photos)->toBeArray();
    expect($action->photos)->toHaveCount(1);
    
    $session = session();
    $success = $session->get('success');
    expect($success['shrimp_helped'])->toBe(25 * 34);
});
