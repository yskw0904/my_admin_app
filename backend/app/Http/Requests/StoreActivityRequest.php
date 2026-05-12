<?php

namespace App\Http\Requests;

use App\Enums\ActivityType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreActivityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date'    => ['required', 'date'],
            'activity_type' => ['required', new Enum(ActivityType::class)],
            'start_time'    => ['required', 'date'],
            'end_time'      => ['required', 'date', 'after:start_time'], // 開始より後であること
        ];
    }
}
