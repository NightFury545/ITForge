<?php

namespace App\Enums;

enum ContractStatus: string
{
    case Active = 'active';
    case Completed = 'completed';
    case Canceled = 'canceled';

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
