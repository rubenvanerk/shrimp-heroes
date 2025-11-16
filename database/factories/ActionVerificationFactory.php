<?php

namespace Database\Factories;

use App\Models\Action;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ActionVerification>
 */
class ActionVerificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $confidenceScore = fake()->randomFloat(2, 65, 98);
        $detectedPackages = fake()->numberBetween(1, 50);

        return [
            'action_id' => Action::factory(),
            'ai_detected_packages' => $detectedPackages,
            'ai_confidence_score' => $confidenceScore,
            'location_verified' => fake()->boolean(85),
            'timestamp_verified' => fake()->boolean(90),
            'exif_data' => [
                'Make' => fake()->randomElement(['Apple', 'Samsung', 'Google', 'Canon']),
                'Model' => fake()->randomElement(['iPhone 14 Pro', 'Galaxy S23', 'Pixel 7', 'EOS R5']),
                'DateTime' => fake()->dateTimeBetween('-1 month', 'now')->format('Y:m:d H:i:s'),
                'GPSLatitude' => fake()->latitude(),
                'GPSLongitude' => fake()->longitude(),
                'GPSAltitude' => fake()->randomFloat(2, 0, 500),
                'Orientation' => fake()->numberBetween(1, 8),
                'Flash' => fake()->numberBetween(0, 1),
                'FocalLength' => fake()->randomElement(['4.2mm', '26mm', '50mm']),
                'ExposureTime' => fake()->randomElement(['1/60', '1/120', '1/250']),
                'FNumber' => fake()->randomElement(['f/1.8', 'f/2.4', 'f/4.0']),
                'ISO' => fake()->randomElement([100, 200, 400, 800]),
            ],
            'ai_analysis' => fake()->randomElement([
                "Analysis shows {$detectedPackages} flipped shrimp packages visible in the photo. Location data matches expected store coordinates. Timestamp aligns with submission time.",
                "Detected {$detectedPackages} packages in the image with high confidence. EXIF GPS coordinates correspond to the store location. Photo appears authentic.",
                "The image contains {$detectedPackages} clearly visible flipped shrimp packages. Location verification passed. No anomalies detected.",
                "AI identified {$detectedPackages} packages in the provided photos. Metadata suggests photo was taken at the correct location and time.",
            ]),
            'processed_at' => fake()->dateTimeBetween('-1 month', 'now'),
            'error_message' => null,
        ];
    }

    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'ai_detected_packages' => null,
            'ai_confidence_score' => null,
            'location_verified' => null,
            'timestamp_verified' => null,
            'exif_data' => null,
            'ai_analysis' => null,
            'processed_at' => null,
            'error_message' => fake()->randomElement([
                'API rate limit exceeded. Retry scheduled.',
                'Failed to extract EXIF data from photo.',
                'OpenRouter API connection timeout.',
                'Invalid image format provided.',
            ]),
        ]);
    }
}
