<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $usarios = [
            [
                'nombre' => 'Gastón Duba',
                'email' => 'gaston@mikro.com.ar',
                'password' => Hash::make('1234'),
                'password_autenticacion' => Hash::make('1234')
            ]
        ];
        DB::table('users')->insert($usarios);
    }
}
