<?php

namespace App\Http\Requests\Bid;

use Illuminate\Foundation\Http\FormRequest;

class CreateBidRequest extends FormRequest
{
    /**
     * Авторизація (якщо потрібна)
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Валідація полів
     */
    public function rules(): array
    {
        return [
            'amount' => 'required|numeric',
            'proposal' => 'nullable|string|max:124',
            'project_id' => 'required|exists:projects,id',
        ];
    }
}
