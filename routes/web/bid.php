<?php
use App\Http\Controllers\BidController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('bids')->group(function () {
    Route::get('/project/{projectId}', [BidController::class, 'index'])->name('bid.index');
    Route::get('/{bidId}', [BidController::class, 'show'])->name('bid.show');
    Route::post('/', [BidController::class, 'store'])->name('bids.store');
    Route::put('/{bidId}', [BidController::class, 'update'])->name('bids.update');
    Route::delete('/{bidId}', [BidController::class, 'destroy'])->name('bids.destroy');
});
