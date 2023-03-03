<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recibos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('legajo_id');
            $table->string('file_name');
            $table->string('periodo');
            $table->integer('header');
            $table->string('header_description');
            $table->decimal('neto',10,2);
            $table->decimal('remunerativo',10,2);
            $table->decimal('retencion',10,2);
            $table->decimal('no_remunerativo',10,2);
            $table->boolean('firma_empleador')->default(false);
            $table->string('firma_empleador_nombre')->nullable();
            $table->string('hash_value_empleador')->nullable();
            $table->date('firma_empleador_fecha')->nullable();
            $table->boolean('frima_empleado')->default(false);
            $table->string('hash_value_empleado')->nullable();
            $table->date('frima_empleado_fecha')->nullable();
            $table->boolean('opening_request')->default(false);
            $table->boolean('opening_confirmation')->default(false);

            $table->foreign('legajo_id')->references('id')->on('legajos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recibos');
    }
};
