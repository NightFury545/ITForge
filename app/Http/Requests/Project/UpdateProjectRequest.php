<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Визначити, чи дозволено виконувати цю дію.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Отримати правила валідації для запиту.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'title' => 'nullable|string|max:32',
            'description' => 'nullable|string|max:564',
            'budget' => 'nullable|numeric',
            'requirements' => 'nullable|string|max:256',
            'tech_stack' => 'nullable|array',
            'tech_stack.*' => 'string|max:32',
            'bids_deadline' => 'nullable|date|after:today',
            'project_deadline' => 'nullable|date|after:bids_deadline',
        ];
    }
}

