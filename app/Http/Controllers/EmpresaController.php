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
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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
        $empresa->logo_file_path = Storage::url($empresa->logo_file_path);

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
        $data = $request->validated();
        DB::beginTransaction();
        $domicilio = $this->domicilioService->nuevo($data['domicilio']);
        $empresa = Empresa::create([
            'razon_social' => $data['razon_social'],
            'cuit' => $data['cuit'],
            'domicilio_id' => $domicilio->id,
        ]);
        $archivo = $data['logo_file_path'];
        if($archivo instanceof UploadedFile){
            $path = $archivo->storeAs('public/' . $empresa->id,'logo.' . $archivo->extension());
            $empresa->logo_file_path = $path;
            $empresa->save();
        }
        DB::commit();
        return redirect()->route('index_empresas')->with('exito','Empresa Creada!');
    }

    public function update(EmpresaRequest $request,Empresa $empresa)
    {

        $data = $request->validated();
        $razon_social = $data['data']['razon_social'];
        $cuit = $data['data']['cuit'];
        $domicilio = $data['data']['domicilio'];
        $logo_file_path = $data['data']['logo_file_path'];


        DB::beginTransaction();
        $domicilio = $this->domicilioService->nuevo($domicilio);
        $empresa->update([
            'razon_social' => $razon_social,
            'cuit' => $cuit,
            'domicilio_id' => $domicilio->id,
        ]);

        $archivo = $logo_file_path;
        if($archivo instanceof UploadedFile){
            $path = $archivo->storeAs('public/' . $empresa->id,'logo.' . $archivo->extension());
            $empresa->logo_file_path = $path;
            $empresa->save();
        }

        DB::commit();

        $request->session()->flash('exito', 'Empresa Editada!');
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
    }

}
