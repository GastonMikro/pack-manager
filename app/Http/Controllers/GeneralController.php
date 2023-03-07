<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Empresa;

class GeneralController extends Controller
{
    public function login(Request $request){
        $credentials = $this->validate($request, [
            'email' => 'bail|required|email',
            'password' => 'required|string'
        ]);

        if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password'], 'activo' => 1])){
            return redirect()->route('elegir_empresa');
            
        }else{
            return back()
            ->withErrors(['email' => 'Las credenciales no coinciden con los registros.'])
            ->withInput(request(['email']));
        }
    }

    public function dashboard(Empresa $empresa): Response
    {
        $empresa->legajos = $empresa->legajos()->orderBy('nombre','ASC')->get();
        $empresa->usuarios = $empresa->usuarios()->orderBy('nombre','ASC')->get();
        $empresa->logo_file_path = Storage::url($empresa->logo_file_path);
        return Inertia::render('Dashboard',[
            'empresa_id' => $empresa->id,
            'empresa' => $empresa,
        ]);
    }

    public function elegirEmpresa(): Response
    {
        return Inertia::render('ElegirEmpresa',[
            'empresas' =>Empresa::all(),
        ]);
    }

    public function logout(){
        Auth::logout();
        session()->flush();
        return redirect('/');
    }
}
