<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreActionRequest extends FormRequest
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
            'store_id' => ['nullable', 'integer', 'exists:stores,id'],
            'packages_flipped' => ['required', 'integer', 'min:1'],
            'notes' => ['nullable', 'string', 'max:1000'],
            'photos' => ['nullable', 'array', 'max:5'],
            'photos.*' => ['image', 'max:5120'], // Max 5MB per image
            'performed_at' => ['required', 'date', 'before_or_equal:now'],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'packages_flipped.required' => 'Please enter the number of packages flipped.',
            'packages_flipped.min' => 'You must flip at least 1 package.',
            'performed_at.required' => 'Please select when this action was performed.',
            'performed_at.before_or_equal' => 'Action date cannot be in the future.',
            'photos.max' => 'You can upload a maximum of 5 photos.',
            'photos.*.image' => 'Each file must be an image.',
            'photos.*.max' => 'Each photo must be less than 5MB.',
        ];
    }
}
