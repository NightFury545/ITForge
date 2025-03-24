<?php
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

Route::prefix('messages')->middleware(['auth', 'verified'])->group(function () {
    // Надіслати нове повідомлення
    Route::post('/', [MessageController::class, 'store']);

    // Отримати повідомлення для певного чату
    Route::get('/{chatId}', [MessageController::class, 'index']);
});
