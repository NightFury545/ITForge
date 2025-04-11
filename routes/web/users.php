<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::get('/developers', [UserController::class, 'index'])->middleware(['auth', 'verified'])->name('developers.index');
Route::get('/users/{name}', [UserController::class, 'show'])->middleware(['auth', 'verified'])->name('users.show');
Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware(['auth', 'verified', 'role:admin'])->name('users.destroy');
Route::post('/users/{id}', [UserController::class, 'edit'])->middleware(['auth', 'verified', 'role:admin'])->name('users.edit');
