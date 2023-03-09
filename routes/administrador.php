
<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdministradorUsuariosController;
use App\Http\Controllers\AdministradorEmpresasController;

Route::GET('backoffice/administrador/usuarios', [AdministradorUsuariosController::class, 'index'])->name('admin_index_usuarios');
Route::GET('backoffice/administrador/usuarios/alta', [AdministradorUsuariosController::class, 'create'])->name('admin_nuevo_usuario');
Route::POST('backoffice/administrador/usuarios/nuevo', [AdministradorUsuariosController::class, 'store'])->name('admin_alta_usuario');
Route::GET('backoffice/administrador/usuarios/{usuario}',[AdministradorUsuariosController::class,'show'])->name('admin_ver_usuario');
Route::PATCH('backoffice/administrador/usuarios/{usuario}/editar',[AdministradorUsuariosController::class,'update'])->name('admin_editar_usuario');
Route::POST('backoffice/administrador/usuarios/{usuario}/cambio_estado/',[AdministradorUsuariosController::class,'cambioEstado'])->name('admin_estado_usuario');

Route::GET('backoffice/empresas', [AdministradorEmpresasController::class, 'index'])->name('index_empresas');
Route::GET('backoffice/empresas/alta', [AdministradorEmpresasController::class, 'create'])->name('nueva_empresa');
Route::POST('backoffice/empresas/nuevo', [AdministradorEmpresasController::class, 'store'])->name('alta_empresa');
Route::GET('backoffice/empresas/{empresa}',[AdministradorEmpresasController::class,'show'])->name('ver_empresa');
Route::PATCH('backoffice/empresas/{empresa}/editar',[AdministradorEmpresasController::class,'update'])->name('editar_empresa');
Route::POST('backoffice/empresas/{empresa}/cambio_estado/',[AdministradorEmpresasController::class,'cambioEstado'])->name('estado_empresa');