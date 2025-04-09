<?php

namespace App\Enums;

enum TransactionStatus: string
{
    case PENDING = 'В очікуванні';
    case COMPLETED = 'Завершено';
    case FAILED = 'Не вдалося';

    /**
     * Отримати всі значення енаму як масив.
     *
     * @return array
     */
    public static function getValues(): array
    {
        return array_map(fn($status) => $status->value, self::cases());
    }
}
