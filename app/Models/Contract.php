<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Contract extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'project_id',
        'client_id',
        'developer_id',
        'amount',
        'status'
    ];

    /**
     * Отримати проект, пов'язаний з контрактом
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Отримати клієнта, що уклав контракт
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    /**
     * Отримати розробника, що уклав контракт
     */
    public function developer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'developer_id');
    }

    /**
     * Отримати відгуки для контракту
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}

