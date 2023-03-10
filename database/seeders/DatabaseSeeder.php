<?php

namespace Database\Seeders;
use Database\Seeders\RoleSeeder;
use Database\Seeders\UsuarioSeeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(RoleSeeder::class);
        $this->call(UsuarioSeeder::class);
        
    }
}
