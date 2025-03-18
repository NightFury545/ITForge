<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Models\Wallet;

class CreateUserWallet
{
    public function handle(UserRegistered $event): void
    {
        Wallet::create([
            'user_id' => $event->user->id,
            'balance' => 0.00,
        ]);
    }
}

