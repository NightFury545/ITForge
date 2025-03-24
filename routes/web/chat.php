<?php
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/chats', [ChatController::class, 'index'])->name('chats.index');
    Route::post('/chats', [ChatController::class, 'store'])->name('chats.store');
    Route::get('/chats/{chatId}', [ChatController::class, 'show'])->name('chats.show');
    Route::delete('/chats/{chatId}', [ChatController::class, 'destroy'])->name('chats.destroy');
});
