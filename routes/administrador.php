
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

Route::GET('backoffice/administrador/empresas', [AdministradorEmpresasController::class, 'index'])->name('index_empresas');
Route::GET('backoffice/administrador/empresas/alta', [AdministradorEmpresasController::class, 'create'])->name('nueva_empresa');
Route::POST('backoffice/administrador/empresas/nuevo', [AdministradorEmpresasController::class, 'store'])->name('alta_empresa');

//Show
Route::GET('backoffice/administrador/empresas/{empresa}/general',[AdministradorEmpresasController::class,'show'])->name('ver-datos-empresa');
Route::GET('backoffice/administrador/empresas/{empresa}/usuarios',[AdministradorEmpresasController::class,'usuarios'])->name('ver-usuarios-empresa');
Route::GET('backoffice/administrador/empresas/{empresa}/configuracion',[AdministradorEmpresasController::class,'configuracion'])->name('ver-configuracion-empresa');

Route::PATCH('backoffice/administrador/empresas/{empresa}/editar',[AdministradorEmpresasController::class,'update'])->name('editar_empresa');
Route::POST('backoffice/administrador/empresas/{empresa}/cambio_estado/',[AdministradorEmpresasController::class,'cambioEstado'])->name('estado_empresa');