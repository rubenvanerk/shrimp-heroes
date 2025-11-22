<?php

use App\Http\Controllers\Api\StoreSearchController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaderboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::get('leaderboard', LeaderboardController::class)->name('leaderboard');
    Route::get('guide', function () {
        return Inertia::render('guide');
    })->name('guide');
    Route::get('about', function () {
        return Inertia::render('about');
    })->name('about');

    // API endpoints
    Route::get('api/stores/search', StoreSearchController::class)->name('api.stores.search');
});

require __DIR__.'/settings.php';
require __DIR__.'/actions.php';
