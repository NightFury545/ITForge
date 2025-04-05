<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/web/project.php';
require __DIR__.'/web/users.php';
require __DIR__.'/web/deposit.php';
require __DIR__.'/web/chat.php';
require __DIR__.'/web/message.php';
require __DIR__.'/web/bid.php';
require __DIR__.'/web/admin-panel.php';
