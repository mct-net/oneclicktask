<?php

namespace Database\Seeders;

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

        User::factory()->create([
            'id' => 1,
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => 'secret',
            'email_verified_at' => null,
            'two_factor_confirmed_at' => null,
        ]);

        $this->call([
            TaskSeeder::class,
        ]);
    }
}
