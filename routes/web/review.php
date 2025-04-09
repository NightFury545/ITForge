<?php

use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('reviews')->group(function () {
    Route::post('/', [ReviewController::class, 'store']);
    Route::get('/', [ReviewController::class, 'index']);
});
