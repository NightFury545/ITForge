<?php

namespace App\Services;

use App\Models\User;
use App\Services\Filters\JsonFilter;
use App\Services\Filters\RangeFilter;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class UserService
{
    /**
     * Отримати список користувачів з фільтрацією та сортуванням
     */
    public function getUsers(): LengthAwarePaginator
    {
        return QueryBuilder::for(User::class)
            ->allowedFilters([
                AllowedFilter::partial('name'),
                AllowedFilter::custom('birthday', new RangeFilter()),
                AllowedFilter::custom('skills', new JsonFilter()),
            ])
            ->allowedSorts(['name', 'created_at', 'birthday'])
            ->paginate(10);
    }

    /**
     * Отримати конкретного користувача за ім'ям
     */
    public function getUserByName(string $name): ?User
    {
        return User::where('name', $name)->first();
    }
}

