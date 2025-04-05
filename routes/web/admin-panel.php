<?php

use App\Http\Controllers\AdminPanelController;

Route::middleware(['auth', 'role:admin'])->get('/admin', [AdminPanelController::class, 'index'])->name('admin.index');
