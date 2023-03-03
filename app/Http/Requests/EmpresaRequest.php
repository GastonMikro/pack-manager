<?php

namespace App\Http\Requests;

use App\Rules\CustomCuit;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class EmpresaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return  true;/*  Gate::allows('nuevo_usuario'); */
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $rules = [];
        if($this->getMethod() === 'POST'){
                $rules = [
                    'razon_social' => 'required|string',
                    'cuit' => 'required|string|unique:empresas',
                    'domicilio' => 'required|array',
                    'domicilio.domicilio' => 'required|string',
                    'domicilio.localidad_id' => 'required|integer|exists:localidades,id',
                   /* ,
                    'url_api' => 'nullable|string',
                    'db_api' => 'nullable|string',
                    'usuario_api' => 'nullable|string',
                    'password_api' => 'nullable|string', */
                    'logo_file_path' => 'nullable|file',
                ];
            
        }elseif($this->getMethod() === 'PATCH'){
            $rules = [
                'razon_social' => 'required|string',
                'cuit' => 'required|string|unique:empresas', Rule::unique('empresas','cuit')->ignore($this->empresa->id),
                'domicilio' => 'required|array',
                'domicilio.domicilio' => 'required|string',
                /*'domicilio.localidad' => 'required|integer|exists:localidades,id',
                'url_api' => 'nullable|string',
                'db_api' => 'nullable|string',
                'usuario_api' => 'nullable|string',
                'password_api' => 'nullable|string', */
                'logo_file_path' => 'nullable|string',
            ];
        }
        return $rules;
    }
}
