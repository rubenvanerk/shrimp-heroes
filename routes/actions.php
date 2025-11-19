<?php

use App\Http\Controllers\ActionController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('actions', [ActionController::class, 'index'])->name('actions.index');
    Route::get('actions/create', [ActionController::class, 'create'])->name('actions.create');
    Route::post('actions', [ActionController::class, 'store'])->name('actions.store');
    Route::get('actions/success', [ActionController::class, 'success'])->name('actions.success');
});
