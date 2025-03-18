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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('developers', function () {
        return Inertia::render('developers');
    })->name('developers.index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('projects', function () {
        return Inertia::render('projects');
    })->name('projects.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
