<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            ['nombre' => 'Superadmin'],
            ['nombre' => 'Admin Usuarios'],
            ['nombre' => 'Admin Nomina'],
            ['nombre' => 'Admin Recibos de Sueldo'],
            ['nombre' => 'Firmante Recibos de Sueldo'],
            ['nombre' => 'Legajo'],
        ];
        DB::table('roles')->insert($roles);
    }
}
