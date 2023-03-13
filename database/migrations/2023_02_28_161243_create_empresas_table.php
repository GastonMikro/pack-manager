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
        Schema::create('empresas', function (Blueprint $table) {
            $table->id();
            $table->string('razon_social')->unique();
            $table->string('cuit')->unique();
            $table->foreignId('domicilio_id')->constrained('domicilios');
            $table->string('logo_file_path')->nullable();
            $table->string('url_api')->nullable();
            $table->string('db_api')->nullable();
            $table->string('usuario_api')->nullable();
            $table->string('password_api')->nullable();
            $table->string('prefijo')->unique();
            $table->boolean('activo')->default(true);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};
