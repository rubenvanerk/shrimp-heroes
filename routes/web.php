<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Shrimp Heroes App
Route::prefix('shrimp')->group(function () {
    Route::get('/', function () {
        return Inertia::render('shrimp/home', [
            'globalShrimpHelped' => 1247850,
            'userShrimpHelped' => 1250,
        ]);
    })->name('shrimp.home');

    Route::get('/report', function () {
        return Inertia::render('shrimp/report');
    })->name('shrimp.report');

    Route::post('/report', function () {
        // Your backend teammate will handle this
        return redirect()->route('shrimp.home')->with('success', 'Report submitted!');
    });

    Route::get('/leaderboard', function () {
        return Inertia::render('shrimp/leaderboard', [
            'users' => [], // Your backend teammate will fetch from database
        ]);
    })->name('shrimp.leaderboard');

    Route::get('/guide', function () {
        return Inertia::render('shrimp/guide');
    })->name('shrimp.guide');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/actions.php';
