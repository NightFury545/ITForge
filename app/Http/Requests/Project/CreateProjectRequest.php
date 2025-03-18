<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class CreateProjectRequest extends FormRequest
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
            'title' => 'required|string|max:32',
            'description' => 'required|string|max:564',
            'budget' => 'required|numeric',
            'requirements' => 'required|string|max:256',
            'tech_stack' => 'required|array|min:1|max:12',
            'tech_stack.*' => 'string|max:32',
            'bids_deadline' => 'required|date|after:today',
            'project_deadline' => 'required|date|after:bids_deadline',
        ];
    }
}

