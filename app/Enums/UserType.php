<?php

namespace App\Enums;

enum UserType: string
{
    case CLIENT = 'client';
    case DEVELOPER = 'developer';

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

