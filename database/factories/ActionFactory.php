<?php

namespace Database\Factories;

use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Action>
 */
class ActionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'store_id' => Store::factory(),
            'packages_flipped' => fake()->numberBetween(1, 50),
            'notes' => fake()->optional(0.3)->sentence(),
            'photos' => fake()->optional(0.2)->passthrough([
                fake()->imageUrl(640, 480, 'store'),
                fake()->imageUrl(640, 480, 'products'),
            ]),
            'performed_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
