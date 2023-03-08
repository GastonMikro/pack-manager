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
        Schema::create('legajos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('email_corporativo');
            $table->integer('numero_legajo');
            $table->dateTime('fecha_alta');
            $table->foreignId('usuario_id')->nullable()->constrained('users');
            $table->foreignId('empresa_id')->nullable()->constrained('empresas');
            $table->boolean('activo')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('legajos');
    }
};
