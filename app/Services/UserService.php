<?php

namespace App\Services;

use App\Enums\ContractStatus;
use App\Enums\ProjectStatus;
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


    public function getUsers(): LengthAwarePaginator
    {
        return QueryBuilder::for(User::query()
            ->select('users.*')
            ->selectSub(function ($query) {
                $query->from('projects')
                    ->join('contracts', 'projects.id', '=', 'contracts.project_id')
                    ->whereColumn('contracts.developer_id', 'users.id')
                    ->where('projects.status', ProjectStatus::COMPLETED->value)
                    ->where('contracts.status', ContractStatus::Completed->value)
                    ->selectRaw('COUNT(*)');
            }, 'projects_count')
        )
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
            ->withAvg('reviews as average_rating', 'rating')
            ->allowedSorts(['name', 'created_at', 'birthday', 'average_rating', 'projects_count'])
            ->paginate();
    }


    /**
     * Отримати конкретного користувача за ім'ям
     */
    public function getUserByName(string $name): ?User
    {
        return User::query()
            ->select('users.*')
            ->selectSub(function ($query) {
                $query->from('projects')
                    ->join('contracts', 'projects.id', '=', 'contracts.project_id')
                    ->whereColumn('contracts.developer_id', 'users.id')
                    ->where('projects.status', ProjectStatus::COMPLETED->value)
                    ->where('contracts.status', ContractStatus::Completed->value)
                    ->selectRaw('COUNT(*)');
            }, 'projects_count')
            ->withAvg('reviews as average_rating', 'rating')
            ->with(['reviews.client', 'reviews.contract.project'])
            ->where('name', $name)
            ->first();
    }

}

