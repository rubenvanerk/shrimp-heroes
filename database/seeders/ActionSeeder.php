<?php

namespace Database\Seeders;

use App\Models\Action;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $stores = Store::all();

        Action::factory()
            ->count(50)
            ->recycle($users)
            ->recycle($stores)
            ->create();
    }
}
