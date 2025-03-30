<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'bio',
        'birthday',
        'avatar',
        'portfolio_urls',
        'skills',
        'user_type',
        'role',
        'phone',
        'country',
        'social_links',
        'work_experience'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birthday' => 'date',
            'portfolio_urls' => 'array',
            'skills' => 'array',
            'social_links' => 'array',
        ];
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'client_id');
    }

    public function reviews(): HasManyThrough
    {
        return $this->hasManyThrough(Review::class, Contract::class, 'developer_id', 'contract_id');
    }

    /**
     * Отримати контракти користувача
     */
    public function contracts(): HasMany
    {
        return $this->hasMany(Contract::class)
            ->where(function ($query) {
                $query->where('client_id', $this->id)
                    ->orWhere('developer_id', $this->id);
            });
    }

    /**
     * Отримати рахунок користувача
     */
    public function wallet(): HasOne
    {
        return $this->hasOne(Wallet::class);
    }

    /**
     * Отримати бід користувача (як розробника)
     */
    public function bids(): HasMany
    {
        return $this->hasMany(Bid::class, 'developer_id');
    }

    /**
     * Отримати повідомлення користувача
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    /**
     * Отримати чати, в яких бере участь користувач
     */
    public function chats(): HasMany
    {
        return $this->hasMany(Chat::class);
    }
}
