<?php

namespace App\Enums;

enum TransactionType: string
{
    case DEPOSIT = 'Поповнення';
    case WITHDRAW = 'Виведення';
    case PAYMENT = 'Оплата';
    case REFUND = 'Повернення коштів';

    /**
     * Отримати всі значення енаму як масив.
     *
     * @return array
     */
    public static function getValues(): array
    {
        return array_map(fn($type) => $type->value, self::cases());
    }
}
