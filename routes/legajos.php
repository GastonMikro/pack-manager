
<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LegajoController;

Route::GET('{empresa?}/legajos', [LegajoController::class, 'index'])->name('index_legajos');
Route::GET('{empresa}/legajos/alta', [LegajoController::class, 'create'])->name('nuevo_legajo');
Route::POST('{empresa}/legajos/nuevo', [LegajoController::class, 'store'])->name('alta_legajo');
Route::GET('{empresa}/legajos/{legajo}',[LegajoController::class,'show'])->name('ver_legajo');
Route::PATCH('{empresa}/legajos/{legajo}/editar',[LegajoController::class,'update'])->name('editar_legajo');
Route::POST('{empresa}/legajos/{legajo}/cambio_estado/',[LegajoController::class,'cambioEstado'])->name('estado_legajo');
