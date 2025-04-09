<?php

namespace App\Enums;

enum UserType: string
{
    case CLIENT = 'Клієнт';
    case DEVELOPER = 'Розробник';

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

