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
        Schema::create('declaraciones_ig', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('recibo_id');
            $table->foreign('recibo_id')->references('id')->on('recibos');
            $table->string('path');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('declaraciones_ig');
    }
};
