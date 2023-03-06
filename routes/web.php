<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GeneralController;

Route::middleware('guest')->group(function(){
    Route::get('/', function () {
        return Inertia::render('Login', [
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    })->name('loginForm');
    Route::post('/login',[GeneralController::class, 'login'])->name('login');
});


Route::GET('/elegir_empresa', [GeneralController::class, 'elegirEmpresa'])->name('elegir_empresa');
Route::GET('/{empresa}/dashboard', [GeneralController::class, 'dashboard'])->name('dashboard');

require __DIR__.'/auth.php';
require __DIR__.'/usuarios.php';
require __DIR__.'/empresas.php';
require __DIR__.'/legajos.php';
require __DIR__.'/recibos.php';

Route::get('/{any}', function () {
 return  Inertia::render('PaginaNoEncontrada');
})->where('any', '.*');