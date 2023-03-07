<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DomicilioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $domicilio = [
            [
                'localidad_id' => NULL,
                'domicilio' => 'Administrador'
            ]
        ];
        DB::table('domicilios')->insert($domicilio);
    }
}
