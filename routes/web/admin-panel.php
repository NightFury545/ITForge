<?php

use App\Http\Controllers\AdminPanelController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->get('/admin', [AdminPanelController::class, 'index'])->name('admin.index');
