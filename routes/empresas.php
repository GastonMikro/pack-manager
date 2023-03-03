
<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmpresaController;


Route::GET('empresas', [EmpresaController::class, 'index'])->name('index_empresas');
Route::GET('empresas/alta', [EmpresaController::class, 'create'])->name('nueva_empresa');
Route::POST('empresas/nuevo', [EmpresaController::class, 'store'])->name('alta_empresa');
Route::GET('empresas/{empresa}',[EmpresaController::class,'show'])->name('ver_empresa');
Route::PATCH('empresas/{empresa}/editar',[EmpresaController::class,'update'])->name('editar_empresa');
Route::POST('empresas/{empresa}/cambio_estado/',[EmpresaController::class,'cambioEstado'])->name('estado_empresa');
