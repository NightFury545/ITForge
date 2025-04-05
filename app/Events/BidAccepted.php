<?php

namespace App\Events;

use App\Models\Bid;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BidAccepted
{
    use Dispatchable, SerializesModels;

    public function __construct(public Bid $bid)
    {
    }
}
