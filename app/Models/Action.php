<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    /** @use HasFactory<\Database\Factories\ActionFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'photos' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function verification()
    {
        return $this->hasOne(ActionVerification::class);
    }

    public function getVerificationStatusAttribute(): string
    {
        if (! $this->verification) {
            return 'pending';
        }

        if ($this->verification->error_message) {
            return 'pending';
        }

        if ($this->verification->ai_confidence_score >= 80) {
            return 'verified';
        }

        return 'rejected';
    }
}
