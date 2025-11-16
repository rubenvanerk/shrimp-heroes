<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActionVerification extends Model
{
    /** @use HasFactory<\Database\Factories\ActionVerificationFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'exif_data' => 'array',
            'location_verified' => 'boolean',
            'timestamp_verified' => 'boolean',
            'ai_confidence_score' => 'decimal:2',
            'processed_at' => 'datetime',
        ];
    }

    public function action()
    {
        return $this->belongsTo(Action::class);
    }
}
