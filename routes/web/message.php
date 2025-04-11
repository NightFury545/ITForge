<?php
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

Route::prefix('messages')->middleware(['auth', 'verified'])->group(function () {
    Route::post('/', [MessageController::class, 'store']);
    Route::get('/{chatId}', [MessageController::class, 'index']);
    Route::delete('/{id}', [MessageController::class, 'destroy'])->middleware(['auth', 'verified', 'role:admin']);
});
