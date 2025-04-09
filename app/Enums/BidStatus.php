<?php

namespace App\Enums;

enum BidStatus: string
{
    case PENDING = 'В очікуванні';
    case ACCEPTED = 'Прийнято';
    case REJECTED = 'Відхилено';
    case EXPIRED = 'Закінчився';

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
