<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmpresaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $empresas = [
            [
                'razon_social' => 'Administrador',
                'cuit' => '0',
                'domicilio_id' => 1,
            ]
        ];
        DB::table('empresas')->insert($empresas);

        $relacion = [
            [
                'empresa_id' => 1,
                'user_id' => 1
            ]
        ];
        DB::table('empresas_users')->insert($relacion);

     /*    $domicilio = [
            [
                'localidad_id' => 0,
                'domicilio' => 'Administrador'
            ]
        ];
        DB::table('domicilios')->insert($domicilio); */
    }
}
