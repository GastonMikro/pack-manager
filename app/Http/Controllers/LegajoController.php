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
                ->orWhere('numero_legajo','like','%' . request()->get('search')  . '%');
                
            })
            ->with('empresa')
            ->orderBy('numero_legajo','ASC')
            ->get();
        
        return Inertia::render('Legajos/Index',[
            'legajos' =>$legajos,
            'filters' => $request->only(['search']),
            'empresas' =>Empresa::all(),
            'empresa_id' => $empresa->id
        ]);
    }

    public function create(Request $request,Empresa $empresa): Response
    {
        $usuarios = [];
        if($request->has('search')){
            $usuarios = Usuario::query()
                ->where('nombre','like','%' . request()->get('search')  . '%')
                ->orWhere('cuil','like','%' . request()->get('search')  . '%')
                ->orderBy('nombre','ASC')
                ->get();
        }

        return Inertia::render('Legajos/Create',[
            'empresas' =>Empresa::all(),
            'empresa_id' => $empresa->id,
            'usuarios' =>$usuarios,
            'filters' => $request->only(['search']),
        ]);
    }

    public function show(Empresa $empresa,Legajo $legajo): Response
    {
        $legajo->empresa = $legajo->empresa()->get();
        $legajo->usuario = $legajo->usuario()->get();
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

        //si genera un nuevo usuario asociado
        if($request->generar_usuario){

            $legajo = Legajo::create([
                'nombre' => $data['nombre'],
                'numero_legajo' => $data['numero_legajo'],
                'fecha_alta' => $data['fecha_alta'],
                'email_corporativo' => $data['email_corporativo'],
                'empresa_id' => $empresa->id
            ]);

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

        //si asocia un usuario existente
        else {
           /*  // Si se paso un email ahora voy a validar si el mail pasado pertenece a un usuario de la empresa
            if(Usuario::where('email',$request->email)->first() !== NULL && Usuario::where('email',$request->email)->first()->empresas()->find($empresa->id)){
                $usuarioAsociado = Usuario::where('email',$request->email)->first();
                    // Si no encontro un usuario con ese mail
                    if($usuarioAsociado == NULL){
                        return back()
                        ->withErrors(['email' => 'No se encontro un usuario en la empresa con el mail indicado, por lo tanto no se puede asociar el legajo a ese mail.'])
                        ->withInput($request->all());
                    }
                 } */

        $newLegajo = new Legajo();
        $newLegajo->empresa_id = $empresa->id;
        $newLegajo->numero_legajo = $data['numero_legajo'];
        $newLegajo->nombre = $data['nombre'];
        $newLegajo->fecha_alta = $data['fecha_alta'];
        $newLegajo->email_corporativo = $data['email_corporativo'];

        $usuarioAsociado = Usuario::where('email',$request->email)->first();

        if($usuarioAsociado != NULL){$newLegajo->usuario_id = $usuarioAsociado->id;}
        }

        $newLegajo->save();

        DB::commit();
        return redirect()->route('index_legajos',$empresa->id)->with('exito','Legajo Creado!');
    }


    public function update(Empresa $empresa, Legajo $legajo, LegajoRequest $request)
    {
        $data = $request->validated();
        DB::beginTransaction();
        $legajo->update([
            'nombre' => $data['nombre'],
            'numero_legajo' => $data['numero_legajo'],
            'fecha_alta' => $data['fecha_alta'],
            'email_corporativo' => $data['email_corporativo'],
            'empresa_id' => $data['empresa_id'],
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
