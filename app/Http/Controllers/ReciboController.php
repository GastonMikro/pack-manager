<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
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
            'empresa_id' => $empresa->id
        ]);
    }

    public function importar(Empresa $empresa): Response
    {
        return Inertia::render('Recibos/Importar',[
             'recibos' =>Recibo::all(),
             'empresa_id' => $empresa->id
        ]);
    }

    public function firmaEmpleador(Empresa $empresa): Response
    {
        return Inertia::render('Recibos/Autorizar',[
             'recibos' =>Recibo::all(),
             'empresa_id' => $empresa->id
        ]);
    }

    public function autenticacion(Empresa $empresa): Response
    {
        return Inertia::render('Recibos/Autenticacion',[
             'recibos' =>Recibo::all(),
             'empresa_id' => $empresa->id
        ]);
    }

}
