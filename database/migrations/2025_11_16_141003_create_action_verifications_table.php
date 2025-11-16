<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('action_verifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('action_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('ai_detected_packages')->nullable();
            $table->decimal('ai_confidence_score', 5, 2)->nullable();
            $table->boolean('location_verified')->nullable();
            $table->boolean('timestamp_verified')->nullable();
            $table->json('exif_data')->nullable();
            $table->text('ai_analysis')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->text('error_message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('action_verifications');
    }
};
