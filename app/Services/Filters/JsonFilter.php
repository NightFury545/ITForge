<?php

namespace App\Services\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class JsonFilter implements Filter
{
    /**
     * Фільтрує запит по JSON полях.
     *
     * Це дозволяє фільтрувати поля з JSON масивами або об'єктами за точним або частковим збігом.
     *
     * Якщо приходить кілька значень, кожне з них перевіряється.
     *
     * @param Builder $query Запит, до якого застосовуються фільтри
     * @param string|array $value Значення для фільтрації (одне або масив значень)
     * @param string $property Властивість, до якої застосовується фільтр
     * @return Builder Модифікований запит
     */
    public function __invoke(Builder $query, $value, string $property): Builder
    {
        if (is_array($value)) {
            foreach ($value as $item) {
                $query->orWhereJsonContains($property, $item);
            }
        } else {
            if (str_contains($value, '%')) {
                return $query->whereRaw("JSON_UNQUOTE(JSON_EXTRACT({$property}, '$')) LIKE ?", [$value]);
            }

            return $query->whereJsonContains($property, $value);
        }

        return $query;
    }
}


