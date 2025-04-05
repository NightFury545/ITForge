<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'contract_id',
        'type',
        'amount',
        'status',
        'method'
    ];

    /**
     * Отримати користувача, до якого належить транзакція
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Отримати контракт для транзакції
     */
    public function contract(): BelongsTo
    {
        return $this->belongsTo(Contract::class);
    }
}

