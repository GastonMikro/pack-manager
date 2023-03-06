<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\LegajoRequest;
use App\Models\Legajo;
use App\Models\Empresa;
use App\Models\Usuario;

class LegajoController extends Controller
{
    public function index(Request $request, Empresa $empresa): Response
    {
        $legajos = Legajo::query()
        ->whereHas('empresa', function ($query) use ($empresa) {
            $query->where('empresa_id', $empresa->id);
        })
            ->when($request->has('search'),function($query){
                $query->where('nombre','like','%' . request()->get('search')  . '%')
                ->orWhere('numero_legajo','like','%' . request()->get('search')  . '%')
                ->orWhere('cuil','like','%' . request()->get('search')  . '%');
            })
            ->with('empresa')
            ->get();
        
        return Inertia::render('Legajos/Index',[
            'legajos' =>$legajos,
            'filters' => $request->only(['search']),
            'empresas' =>Empresa::all(),
            'empresa_id' => $empresa->id
        ]);
    }

    public function create(Empresa $empresa): Response
    {
        return Inertia::render('Legajos/Create',[
            'empresas' =>Empresa::all(),
            'empresa_id' => $empresa->id
        ]);
    }

    public function show(Empresa $empresa,Legajo $legajo): Response
    {
        $legajo->empresa = $legajo->empresa()->get();
        return Inertia::render('Legajos/Show',[
            'legajo' => $legajo,
            'empresas' =>Empresa::all(),
            'empresa_id' => $empresa->id
        ]);
    }

    public function store(LegajoRequest $request,Empresa $empresa): RedirectResponse
    {
        $data = $request->validated();
        DB::beginTransaction();
        $legajo = Legajo::create([
            'nombre' => $data['nombre'],
            'numero_legajo' => $data['numero_legajo'],
            'cuil' => $data['cuil'],
            'fecha_alta' => $data['fecha_alta'],
            'email' => $data['email'],
            'empresa_id' => $empresa->id
        ]);

        if($request->generar_usuario){
            $usuarioAsociado = new Usuario();
            $usuarioAsociado->email = $data['email'];
            $usuarioAsociado->nombre = $data['nombre'];
            $random = str_shuffle('abcdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ1234567890!$%^&!$%^&');
            $password = substr($random, 0, 10);
            $usuarioAsociado->password = Hash::make($password);
            $usuarioAsociado->save();
            $usuarioAsociado->roles()->attach(6);
            $usuarioAsociado->empresas()->attach($empresa->id);
            $legajo->usuario_id = $usuarioAsociado->id;
            $legajo->save();
        }
        DB::commit();
        return redirect()->route('index_legajos',$empresa->id)->with('exito','Legajo Creado!');
    }

    public function update(Empresa $empresa, Legajo $legajo, LegajoRequest $request)/* : RedirectResponse */
    {
        $data = $request->validated();
        DB::beginTransaction();
        $legajo->update([
            'nombre' => $data['nombre'],
            'numero_legajo' => $data['numero_legajo'],
            'cuil' => $data['cuil'],
            'fecha_alta' => $data['fecha_alta'],
            'empresa_id' => $data['empresa_id'],
            'email' => $data['email'],
        ]);

        DB::commit();

        $request->session()->flash('exito', 'Legajo Editado!');
    }


    public function cambioEstado(Empresa $empresa, Legajo $legajo,Request $request){
        $legajo->activo = !$legajo->activo;
        $legajo->save();
        if($legajo->activo == 0){
            $mensaje = 'Legajo "' . $legajo->nombre . '" deshabilitado exitosamente!';
        }else{
            $mensaje = 'Legajo "' . $legajo->nombre . '" habilitado exitosamente!';
        }
        $request->session()->flash('exito', $mensaje);
    }
    
}
