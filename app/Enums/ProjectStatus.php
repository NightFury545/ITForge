<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case OPEN = 'open';
    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';
    case CANCELED = 'canceled';

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
