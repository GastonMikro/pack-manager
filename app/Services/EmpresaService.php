<?php

namespace App\Services;

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

class EmpresaService
{
    public function createRecibosTable($prefijo, $empresa_id)
    {
        if ($prefijo) {
            Schema::create($prefijo . '_recibos', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('legajo_id');
                $table->string('path');
                $table->string('periodo');
                $table->integer('dato_fijo');
                $table->string('dato_fijo_descripcion');
                $table->decimal('neto',10,2);
                $table->decimal('remunerativo',10,2);
                $table->decimal('retencion',10,2);
                $table->decimal('no_remunerativo',10,2);
                $table->boolean('firma_empleador')->default(false);
                $table->string('firma_empleador_nombre')->nullable();
                $table->string('hash_value_empleador')->nullable();
                $table->date('firma_empleador_fecha')->nullable();
                $table->boolean('firma_empleado')->default(false);
                $table->string('hash_value_empleado')->nullable();
                $table->date('firma_empleado_fecha')->nullable();
                $table->boolean('opening_request')->default(false);
                $table->boolean('opening_confirmation')->default(false);
                $table->boolean('estado')->default(true);
                $table->unsignedBigInteger('empresa_id');

                $table->foreign('empresa_id')
                    ->references('id')
                    ->on('empresas')
                    ->onDelete('cascade');

                $table->timestamps();
            });
        }
    }
}
