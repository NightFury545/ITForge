<?php

namespace App\Services\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class JsonFilter implements Filter
{
    /**
     * Фільтрує запит по JSON полях.
     *
     * Якщо приходить масив значень, то кожне з них додається з `AND`, щоб знайти
     * тільки ті записи, які містять всі значення одночасно.
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
                $query->whereJsonContains($property, $item);
            }
        } else {
            $query->whereJsonContains($property, $value);
        }

        return $query;
    }
}
