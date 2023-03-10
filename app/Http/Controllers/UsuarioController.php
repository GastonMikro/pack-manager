<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use App\Models\Usuario;
use App\Models\Rol;
use App\Models\Empresa;
use App\Http\Requests\UsuarioRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    public function index(Request $request, Empresa $empresa): Response
    {
        $usuarios = Usuario::query()
        ->with('lastLogin')
        ->whereHas('empresas', function ($query) use ($empresa) {
            $query->where('empresa_id', $empresa->id);
        })
            ->when($request->has('search'),function($query){
                $query->where('nombre','like','%' . request()->get('search')  . '%')
                ->orWhere('cuil','like','%' . request()->get('search')  . '%');
            })
            ->orderBy('nombre','ASC')
            ->get();

        return Inertia::render('Usuarios/Index',[
            'usuarios' =>$usuarios,
            'filters' => $request->only(['search']),
            'empresa_id' => $empresa->id,
            'empresa_razon_social' => $empresa->razon_social,
        ]);
    }

    public function create(Empresa $empresa): Response
    {
        return Inertia::render('Usuarios/Create',[
            'roles' =>Rol::all(),
            'empresas' =>Empresa::all(),
            'empresa_id' => $empresa->id,
            'empresa_razon_social' => $empresa->razon_social,
        ]);
    }

    public function show(Empresa $empresa , Usuario $usuario): Response
    {
        $usuario->roles = $usuario->roles()->get();
        $usuario->empresas = $usuario->empresas()->get();
        $usuario->legajos = $usuario->legajos()->get();

        return Inertia::render('Usuarios/Show',[
            'usuario' => $usuario,
            'roles' =>Rol::all(),
            'empresas' =>Empresa::all(),
            'empresa_id' => $empresa->id,
            'empresa_razon_social' => $empresa->razon_social,
        ]);
    }

    public function update(Empresa $empresa , Usuario $usuario, UsuarioRequest $request)
    {
        $data = $request->validated();

        DB::beginTransaction();
        $usuario->update([
            'nombre' => $data['nombre'],
            'email' => $data['email'],
            'cuil' => $data['cuil'],
            'roles' => $data['roles'],
            'empresas' => $data['empresas'],
        ]);

        $usuario->roles()->sync($data['roles']);
        $usuario->empresas()->sync($data['empresas']);
        
        DB::commit();

        $request->session()->flash('exito', 'Usuario Editado!');
    }

    public function store(Empresa $empresa , UsuarioRequest $request): RedirectResponse
    {
        $empresa_id=$empresa->id;
        $data = $request->validated();
        DB::beginTransaction();
        $usuario = Usuario::create([
            'nombre' => $data['nombre'],
            'email' => $data['email'],
            'cuil' => $data['cuil'],
            'password' => Hash::make($data['password']),
            'password_autenticacion' => $data['password_autenticacion'],
        ]);

        foreach($data['roles'] as $rol){
            $usuario->roles()->attach($rol);
        }
        $usuario->empresas()->attach($empresa->id);
        DB::commit();
        return redirect()->route('index_usuarios',$empresa_id)->with('exito','Usuario Creado!');
    }

    public function cambioEstado(Empresa $empresa, Usuario $usuario, Request $request){
        $empresa_id=$empresa->id;
        $usuario->activo = !$usuario->activo;
        $usuario->save();
        if($usuario->activo == 0){
            $mensaje = 'Usuario "' . $usuario->nombre . '" deshabilitado exitosamente!';
        }else{
            $mensaje = 'Usuario "' . $usuario->nombre . '" habilitado exitosamente!';
        }
        $request->session()->flash('exito', $mensaje);
    }
}
