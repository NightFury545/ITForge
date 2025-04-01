<?php

namespace App\Services;

use App\Enums\UserType;
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
    public function getUsers(int $perPage = 20): LengthAwarePaginator
    {
        return QueryBuilder::for(User::class)
            ->where('user_type', UserType::DEVELOPER->value)
            ->allowedFilters([
                AllowedFilter::partial('name'),
                AllowedFilter::custom('birthday', new RangeFilter()),
                AllowedFilter::custom('skills', new JsonFilter()),
                AllowedFilter::callback('rating', function ($query, $value) {
                    if (is_array($value)) {
                        if (isset($value['from'])) {
                            $query->having('average_rating', '>=', $value['from']);
                        }
                        if (isset($value['to'])) {
                            $query->having('average_rating', '<=', $value['to']);
                        }
                    }
                }),
            ])
            ->withCount([
                'projects as projects_count' => function ($query) {
                    $query->where('status', 'completed');
                }
            ])
            ->withAvg('reviews as average_rating', 'rating')
            ->allowedSorts(['name', 'created_at', 'birthday', 'average_rating',  'projects_count'])
            ->paginate($perPage);
    }

    /**
     * Отримати конкретного користувача за ім'ям
     */
    public function getUserByName(string $name): ?User
    {
        return User::where('name', $name)->first();
    }
}

