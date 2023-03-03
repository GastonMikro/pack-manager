
<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsuarioController;

Route::GET('{empresa?}/usuarios', [UsuarioController::class, 'index'])->name('index_usuarios');
Route::GET('{empresa}/usuarios/alta', [UsuarioController::class, 'create'])->name('nuevo_usuario');
Route::POST('{empresa}/usuarios/nuevo', [UsuarioController::class, 'store'])->name('alta_usuario');
Route::GET('{empresa}/usuarios/{usuario}',[UsuarioController::class,'show'])->name('ver_usuario');
Route::PATCH('{empresa}/usuarios/{usuario}/editar',[UsuarioController::class,'update'])->name('editar_usuario');
Route::POST('/{empresa}usuarios/{usuario}/cambio_estado/',[UsuarioController::class,'cambioEstado'])->name('estado_usuario');
