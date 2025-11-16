<?php

namespace Database\Seeders;

use App\Models\Action;
use App\Models\Store;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $testUser = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        $users = User::factory()->count(25)->create();
        $allUsers = $users->push($testUser);

        $stores = Store::factory()->count(15)->create();

        foreach ($allUsers as $index => $user) {
            $actionCount = fake()->numberBetween(1, 20);

            Action::factory()
                ->count($actionCount)
                ->for($user)
                ->recycle($stores)
                ->create([
                    'packages_flipped' => fake()->numberBetween(1, 100),
                ]);
        }
    }
}
