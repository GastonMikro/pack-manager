<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Empresa;
use App\Models\Departamento;
use App\Models\Localidad;
use App\Models\Provincia;
use App\Models\Usuario;
use App\Http\Requests\EmpresaRequest;
use App\Services\DomicilioService;
use App\Services\EmpresaService;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;


class AdministradorEmpresasController extends Controller
{
    protected DomicilioService $domicilioService;
    protected EmpresaService $empresaService;
   
    public function __construct(DomicilioService $domicilioService, EmpresaService $empresaService)
    {
        $this->domicilioService = $domicilioService;
        $this->empresaService = $empresaService;
    }

    public function index(Request $request): Response
    {
        $empresas = Empresa::query()
        ->when($request->has('search'), function ($query) use ($request) {
            $query->where('razon_social', 'like', '%' . $request->get('search') . '%')
            ->orWhere('cuit','like','%' . request()->get('search')  . '%');
        })
        ->with('domicilio')
        ->orderBy('razon_social','ASC')
        ->get()
        ->each(function ($empresa) {
            $empresa->logo_file_path = Storage::url($empresa->logo_file_path);
        });

        return Inertia::render('Administrador/Empresas/Index',[
            'empresas' => $empresas,
            'filters' => $request->only(['search',])
        ]);
    }

    public function datos(Empresa $empresa): Response
    {
        $empresa->domicilio = $empresa->domicilio()->get();
        $empresa->logo_file_path = Storage::url($empresa->logo_file_path);

        return Inertia::render('Administrador/Empresas/Show',[
            'empresa' => $empresa,
            'provincias' => Provincia::all(),
            'departamentos' => Departamento::all(),
            'localidades' => Localidad::all(),
        ]);
    }

    public function usuarios(Request $request,Empresa $empresa): Response
    {
        $usuarios = [];
        if($request->has('search')){
            $usuarios = Usuario::query()
                ->where('nombre','LIKE','%' . $request->get('search') . '%')
                ->orWhere('cuil','LIKE','%' . $request->get('search') . '%')
                ->get();
        }
        $empresa->usuarios = $empresa->usuarios()->get();

        return Inertia::render('Administrador/Empresas/Usuarios',[
            'empresa' => $empresa,
            'usuarios' => $usuarios,
        ]);
    }

    public function configuracion(Empresa $empresa): Response
    {
        return Inertia::render('Administrador/Empresas/Configuracion',[
            'empresa' => $empresa,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Administrador/Empresas/Create',[
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
                'url_api' => $data['url_api'],
                'db_api' => $data['db_api'],
                'usuario_api' => $data['usuario_api'],
                'password_api' => $data['password_api'],
                'domicilio_id' => $domicilio->id,
                'prefijo' => $data['prefijo'],
            ]);

            $archivo = $data['logo_file_path'];
            if($archivo instanceof UploadedFile){
                $path = $archivo->storeAs('public/' . $empresa->id,'logo.' . $archivo->extension());
                $empresa->logo_file_path = $path;
                $empresa->save();
            }

            DB::commit();

            $empresa_id =  $empresa->id;
            $prefijo = $data['prefijo'];

            $this->empresaService->createRecibosTable($prefijo, $empresa_id);

            return redirect()->route('index_empresas')->with('exito','Empresa Creada!');
    }

   /*  public function update(EmpresaRequest $request,Empresa $empresa)
    {
        $data = $request->validated();
    
        $razon_social = $data['data']['razon_social'];
        $cuit = $data['data']['cuit'];
        $domicilio = $data['data']['domicilio'];
        $url_api = $data['data']['url_api'];
        $db_api = $data['data']['db_api'];
        $usuario_api = $data['data']['usuario_api'];
        $password_api = $data['data']['password_api'];
        $logo_file_path = $data['data']['logo_file_path'];
        $prefijo = $data['data']['prefijo'];

        DB::beginTransaction();
        $domicilio = $this->domicilioService->nuevo($domicilio);
        $empresa->update([
            'razon_social' => $razon_social,
            'cuit' => $cuit,
            'domicilio_id' => $domicilio->id,
            'url_api' => $url_api,
            'db_api' => $db_api,
            'usuario_api' => $usuario_api,
            'password_api' => $password_api,
            'prefijo' => $prefijo,
        ]);

        $empresa->usuarios()->sync($data['data']['usuarios']);

        $archivo = $logo_file_path;
        if($archivo instanceof UploadedFile){
            $path = $archivo->storeAs('public/' . $empresa->id,'logo.' . $archivo->extension());
            $empresa->logo_file_path = $path;
            $empresa->save();
        }

        DB::commit();

        $request->session()->flash('exito', 'Empresa Editada!');
    } */

    public function updateDatosEmpresa(EmpresaRequest $request,Empresa $empresa)
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

    public function updateUsuariosEmpresa(EmpresaRequest $request,Empresa $empresa)
    {
        $data = $request->validated();
        DB::beginTransaction();
        $empresa->usuarios()->sync($data['usuarios']);
        DB::commit();

        $request->session()->flash('exito', 'Empresa Editada!');
    }

    public function updateConfiguracionEmpresa(EmpresaRequest $request,Empresa $empresa)
    {
        $data = $request->validated();
    
        DB::beginTransaction();
        $empresa->update([
            'url_api' => $data['url_api'],
            'db_api' => $data['db_api'],
            'usuario_api' => $data['usuario_api'],
            'password_api' => $data['password_api'],
            'prefijo' => $data['prefijo'],
        ]);

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
