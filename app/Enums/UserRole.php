<?php

namespace App\Enums;

enum UserRole: string
{
    case USER = 'user';
    case MODERATOR = 'moderator';
    case ADMIN = 'admin';

    /**
     * Метод для отримання всіх значень enum як масив.
     *
     * @return array
     */
    public static function getValues(): array
    {
        return array_map(fn($enum) => $enum->value, self::cases());
    }
}
