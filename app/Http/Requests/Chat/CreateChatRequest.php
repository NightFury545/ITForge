<?php

namespace App\Http\Requests\Chat;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateChatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_id' => [
                'required',
                'exists:users,id',
                Rule::notIn([auth()->id()]),
            ],
            'developer_id' => [
                'required',
                'exists:users,id',
                Rule::notIn([auth()->id()]),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'client_id.not_in' => 'Ви не можете створити чат із самим собою.',
            'developer_id.not_in' => 'Ви не можете створити чат із самим собою.',
        ];
    }
}
