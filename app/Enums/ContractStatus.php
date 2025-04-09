<?php

namespace App\Enums;

enum ContractStatus: string
{
    case ACTIVE = 'Активно';
    case COMPLETED = 'Завершено';
    case CANCELED = 'Відхилено';

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
