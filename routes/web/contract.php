<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContractController;

Route::middleware(['auth', 'verified'])->prefix('contracts')->group(function () {
        Route::post('/{contract}/complete', [ContractController::class, 'complete']);
        Route::post('/{contract}/cancel', [ContractController::class, 'cancel']);
});
