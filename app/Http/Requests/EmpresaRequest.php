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
                    'logo_file_path' => 'nullable|file',
                ];
            
        }elseif($this->getMethod() === 'PATCH'){
            $rules = [
                'data.razon_social' => 'required|string', Rule::unique('empresas','razon_social')->ignore($this->empresa->id),
                'data.cuit' => 'required|string', Rule::unique('empresas','cuit')->ignore($this->empresa->id),
                'data.domicilio' => 'required|array',
                'data.domicilio.domicilio' => 'required|string',
                'data.domicilio.localidad_id' => 'required|integer|exists:localidades,id',
                'data.logo_file_path' => 'nullable', 
            ];
        }
        return $rules;
    }
}
