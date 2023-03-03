<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Empresa;
use App\Models\Departamento;
use App\Models\Localidad;
use App\Models\Provincia;
use App\Http\Requests\EmpresaRequest;
use App\Services\DomicilioService;

class EmpresaController extends Controller
{
    protected DomicilioService $domicilioService;

    public function __construct(DomicilioService $domicilioService){
        $this->domicilioService = $domicilioService;
    }

    public function index(Request $request): Response
    {
        $empresas = Empresa::query()
        ->when($request->has('search'), function ($query) use ($request) {
            $query->where('razon_social', 'like', '%' . $request->get('search') . '%')
            ->orWhere('cuit','like','%' . request()->get('search')  . '%');
        })
        ->with('domicilio')
        ->get();

        return Inertia::render('Empresas/Index',[
            'empresas' => $empresas,
            'filters' => $request->only(['search',])
        ]);
    }

    public function show(Empresa $empresa): Response
    {
        $empresa->domicilio = $empresa->domicilio()->get();

        return Inertia::render('Empresas/Show',[
            'empresa' => $empresa,
            'provincias' => Provincia::all(),
            'departamentos' => Departamento::all(),
            'localidades' => Localidad::all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Empresas/Create',[
            'provincias' => Provincia::all(),
            'departamentos' => Departamento::all(),
            'localidades' => Localidad::all(),
        ]);
    }

    public function store(EmpresaRequest $request)
    {
        $data =$request->validated();
        
        $domicilio = $this->domicilioService->nuevo($data['domicilio']);
        $empresa = Empresa::create([
            'razon_social' => $data['razon_social'],
            'cuit' => $data['cuit'],
            'domicilio_id' => $domicilio->id,
            /*'url_api' => $data['url_api'],
            'db_api' => $data['db_api'],
            'usuario_api' => $data['usuario_api'],
            'password_api' => $data['password_api'], */
            'logo_file_path' => $data['logo_file_path'],
        ]);
        $archivo = $data['logo_file_path'];
        if($archivo instanceof UploadedFile){
            $archivo->storeAs('public/' . $empresa->id,'logo.' . $archivo->extension());
        }
        return redirect()->route('index_empresas')->with('exito','Empresa Creada!');
    }

    public function cambioEstado(Request $request, Empresa $empresa){
        $empresa->activo = !$empresa->activo;
        $empresa->save();
        if($empresa->activo == 0){
            $mensaje = 'Empresa "' . $empresa->razon_social . '" deshabilitada exitosamente!';
        }else{
            $mensaje = 'Empresa "' . $empresa->razon_social . '" habilitada exitosamente!';
        }
        $request->session()->flash('exito', $mensaje);
        return redirect()-> route('index_empresas');
    }

}
