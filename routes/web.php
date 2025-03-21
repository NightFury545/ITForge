<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('chats', function () {
        return Inertia::render('chats');
    })->name('chats.index');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/web/project.php';
require __DIR__.'/web/users.php';
require __DIR__.'/web/deposit.php';
