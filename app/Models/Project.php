<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Project extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'client_id',
        'title',
        'description',
        'budget',
        'requirements',
        'tech_stack',
        'bids_deadline',
        'project_deadline',
        'status'
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'bids_deadline' => 'datetime',
        'project_deadline' => 'datetime',
    ];

    /**
     * Отримати клієнта, який створив проект
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    /**
     * Отримати бід для проекту
     */
    public function bids(): HasMany
    {
        return $this->hasMany(Bid::class);
    }

    /**
     * Отримати контракт для проекту
     */
    public function contract(): HasOne
    {
        return $this->hasOne(Contract::class);
    }
}

