
<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ReciboController;

Route::GET('{empresa?}/recibos', [ReciboController::class, 'index'])->name('index_recibos');
Route::GET('{empresa?}/recibos/importar', [ReciboController::class, 'importar'])->name('importar_recibos');
Route::POST('{empresa?}/recibos/importar', [ReciboController::class, 'store'])->name('importar_recibos_api');
Route::GET('{empresa?}/recibos/autorizar', [ReciboController::class, 'firmaEmpleador'])->name('firma_empleador_recibos');
Route::GET('{empresa?}/recibos/autenticacion',[ReciboController::class,'autenticacion'])->name('register2FA_recibos');

