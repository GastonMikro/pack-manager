<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Recibo;
use App\Models\Empresa;

class ReciboController extends Controller
{
    public function index(Empresa $empresa): Response
    {
        return Inertia::render('Recibos/Index',[
            'recibos' =>Recibo::all(),
            'empresa_id' => $empresa->id,
            'empresa_razon_social' => $empresa->razon_social,
        ]);
    }

    public function importar(Empresa $empresa): Response
    {
        return Inertia::render('Recibos/Importar',[
             'recibos' =>Recibo::all(),
             'empresa_id' => $empresa->id,
             'empresa_razon_social' => $empresa->razon_social,
        ]);
    }

    public function firmaEmpleador(Empresa $empresa): Response
    {
        return Inertia::render('Recibos/Autorizar',[
             'recibos' =>Recibo::all(),
             'empresa_id' => $empresa->id,
             'empresa_razon_social' => $empresa->razon_social,
        ]);
    }

    public function autenticacion(Empresa $empresa): Response
    {
        return Inertia::render('Recibos/Autenticacion',[
             'recibos' =>Recibo::all(),
             'empresa_id' => $empresa->id,
             'empresa_razon_social' => $empresa->razon_social,
        ]);
    }

    /**
     * Funcion encargada de realizar la importacion de todos los recibos de sueldo junto con las liquidaciones de impuesto a las ganancias
     */
    public function store(Request $request, Empresa $empresa)
    {
        // Valido el campo recibido
        $data = $this->validate($request,[
            'dato_fijo' => 'bail|required|numeric'
        ]);

        // Obtengo los datos necesarios para realizar el requet
        /* $api_adress = DB::table('parameters')->first()->api_adress;
        $empresa = Company::find($empresa->id); */
        // Realizo el HTTP request a la API y valido que la respuesta sea satisfactoria
        $response = Http::post($empresa->url_api . '/api/recibos', [
            'db_name' => $empresa->db_api,
            'db_user' => $empresa->usuario_api,
            'db_password' => $empresa->password_api,
            'dato_fijo' => $data['dato_fijo']
        ]);
        dd($response->collect());
        
        /* if($response->failed() || $response->clientError() || $response->serverError()){
            return back()
            ->withErrors(['dato_fijo' => 'Se produjo un error interno al consultar la información. Verifique que el numero de liquidación pasado exista en su Tango Software. Si el problema persiste contacte al proveedor del servicio.'])
            ->withInput($request->all());
        }else if($response->successful()){
            // Si la respuesta fue satisfactoria valido que se haya encontrado algun recibo para generar con el dato fijo pasado
            $resultado = $response->collect();

            if(count($resultado) == 0){
                return back()
                ->withErrors(['dato_fijo' => 'No se encontro ningun recibo para generar con el dato fijo pasado.'])
                ->withInput($request->all());
            }else{
                // Valido que el dato fijo pasado no haya sido generado anteriormente y si ya fue generado valido que ningun recibo se haya eliminado
                $recibosGuardados = Paycheck::with('employee')
                                            ->select('paychecks.*','employees.name','employees.employee_number')
                                            ->join('employees','paychecks.employee_id','=','employees.id')
                                            ->where('employees.company_id',$company_id)
                                            ->where('paychecks.header',$data['dato_fijo'])
                                            ->get();

                if(count($recibosGuardados) > 0){
                    $guardado = [];
                    foreach($resultado as $key => $value){
                        $guardado[$key] = 0;
                        foreach($recibosGuardados as $reciboGuardado){
                            if($key == $reciboGuardado->employee->employee_number){
                                $guardado[$key] = 1;
                            }
                        }
                    }

                    if(!in_array(0,$guardado)){
                        // Quiere decir que todos los recibos del dato fijo pasado ya estan generados
                        return back()
                        ->withErrors(['dato_fijo' => 'Los recibos del dato fijo ingresado ya fueron generados anteriormente. Si cree que es un error contacte al proveedor del servicio.'])
                        ->withInput($request->all());
                    }
                }

                $contadorRecibos = 0;
                // Continua procesando la información validando en cada iteración que el legajo para el que se quiere generar la liquidacion exista
                foreach($resultado as $key => $value){
                    if(Employee::where('employee_number',$value['Recibo']['LEGAJO'])->first() != NULL){
                        $value['Recibo'] = Arr::add($value['Recibo'],'empresa',$empresa->name);
                        $value['Recibo'] = Arr::add($value['Recibo'],'cuit',$empresa->CUIT);
                        $value['Recibo'] = Arr::add($value['Recibo'],'adress',$empresa->adress);
                        if($empresa->logo_file_path != NULL){
                            $logoUrl = public_path() . '/storage/' . $empresa->logo_file_path;
                            $value['Recibo'] = Arr::add($value['Recibo'],'logoUrl',$logoUrl);
                        }else{
                            $logoUrl = false;
                            $value['Recibo'] = Arr::add($value['Recibo'],'logoUrl',$logoUrl);
                        }
                        $resultado[$key] = $value;

                        // Checkeo que no se encuentre guardado
                        if(!(isset($guardado) && $guardado[$key] == 1)){
                            // Si estoy aca quiere decir que o bien el dato fijo pasado nunca fue generado o el recibo que estoy por generar fue eliminado por lo tanto lo vuelvo a crear

                            // Mando el trabajo de generar el pdf del recibo de sueldo y la liquidacion de impuesto a las ganancias, guardarlos en la carpeta storage y guardar en la base de datos toda la info
                            $paycheckFileName = '/' . $empresa->name . '/' . $value['Recibo']['DESCRIPCION_DEL_PAGO'] . '/Recibo_de_sueldo_' . $value['Recibo']['LEGAJO'] . '.pdf';
                            $incomeTaxFileName = '/' . $empresa->name . '/' . $value['Recibo']['DESCRIPCION_DEL_PAGO'] . '/Liquidacion_Impuesto_a_las_Ganancias' . $value['Recibo']['LEGAJO'] . '.pdf';

                            GeneratePaycheck::dispatch($value , $paycheckFileName , $incomeTaxFileName , $data['dato_fijo'] , $empresa);
                            $contadorRecibos++;
                            // Mando el trabajo de generar el pdf de la liquidacion de impuesto a las ganancias, guardarla en la carpeta storage y guardar en la base de datos toda la info
                            // Valido si el legajo tiene liquidacion de impuesto a las ganancias

                        }
                    }
                }
            }
        } */

        // Si se llego al final sin errores devuelvo al usuario al index de recibos con un mensaje de exito.
      /*   $mensaje = "Se generaron " . $contadorRecibos . " recibo/s exitosamente!"; */
        $mensaje = "Se generaron recibo/s exitosamente!";
        $request->session()->flash('exito',$mensaje);
       
       /*  return redirect()->route('index_recibos',$empresa->id); */
    }

}
