<?php
use App\Http\Controllers\DepositController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/deposit', [DepositController::class, 'index'])->name('deposit.index');
    Route::post('/stripe/payment-intent', [DepositController::class, 'createPaymentIntent']);
    Route::post('/stripe/confirm', [DepositController::class, 'confirmTransaction']);
});
