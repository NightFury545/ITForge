<?php

use App\Http\Controllers\NotificationsController;
use Illuminate\Support\Facades\Route;


Route::prefix('notifications')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [NotificationsController::class, 'getNotifications']);
    Route::post('/mark-as-read', [NotificationsController::class, 'markAsRead']);
    //Route::delete('/notifications/{id}', [NotificationsController::class, 'deleteNotification']);
});
