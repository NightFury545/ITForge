<?php

namespace App\Http\Requests\Settings;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id)
            ],
            'bio' => ['nullable', 'string', 'max:1000'],
            'birthday' => ['nullable', 'date', 'before:today'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'portfolio_urls' => [
                'nullable',
                'array',
                'max:5',
                'each' => ['url'],
            ],
            'skills' => ['nullable', 'array'],
            'user_type' => ['nullable', 'in:' . implode(',', UserType::getValues())],
            'phone' => ['nullable', 'string', 'regex:/^\+?[0-9]{10,15}$/'],
            'country' => ['nullable', 'string', 'max:36'],
            'social_links' => [
                'nullable',
                'array',
                'max:5',
                'each' => ['url'],
            ],
            'work_experience' => ['nullable', 'string', 'max:364'],
        ];
    }
}
