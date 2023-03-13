<?php

namespace App\Http\Requests;

use App\Rules\CustomCuit;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Http\UploadedFile;

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
                'cuit' => ['required' , 'size:13' , 'unique:empresas,cuit' , new CustomCuit],
                'domicilio' => 'required|array',
                'domicilio.domicilio' => 'required|string',
                'domicilio.localidad_id' => 'required|integer|exists:localidades,id',
                'url_api' => 'nullable|string',
                'db_api' => 'nullable|string',
                'usuario_api' => 'nullable|string',
                'password_api' => 'nullable|string',
                'logo_file_path' => 'nullable|file',
                'usuarios' => 'array', 
                'prefijo' => 'required|string',
            ];
        
        }elseif($this->getMethod() === 'PATCH'){
            if($this->routeIs('actualizar-datos-empresa'))
            {$rules = [
                'data.razon_social' => 'required|string', Rule::unique('empresas','razon_social')->ignore($this->empresa->id),
                'data.cuit' => ['required' , 'size:13' , Rule::unique('empresas' , 'cuit')->ignore($this->empresa->id), new CustomCuit],
                'data.domicilio' => 'required|array',
                'data.domicilio.domicilio' => 'required|string',
                'data.domicilio.localidad_id' => 'required|integer|exists:localidades,id',
                'data.logo_file_path' => [
                'sometimes',
                 function ($attribute, $value, $fail) {
                    if (is_string($value)) {
                        return validator([$attribute => $value], [$attribute => 'string'])->passes();
                    } elseif ($value instanceof UploadedFile) {                         
                        return validator([$attribute => $value], [$attribute => 'file'])->passes();
                    }
                    $fail($attribute.' must be a file or a string.');
                },
                ],

            ];}

            if($this->routeIs('actualizar-usuarios-empresa'))
            {$rules = [
                'usuarios' => 'array', 
            ];}

            if($this->routeIs('actualizar-configuracion-empresa'))
            {$rules = [
                'url_api' => 'nullable|string',
                'db_api' => 'nullable|string',
                'usuario_api' => 'nullable|string',
                'password_api' => 'nullable|string',
                'prefijo' => 'required|string',
            ];}
           /*  $rules = [
                'data.razon_social' => 'required|string', Rule::unique('empresas','razon_social')->ignore($this->empresa->id),
                'data.cuit' => ['required' , 'size:13' , Rule::unique('empresas' , 'cuit')->ignore($this->empresa->id), new CustomCuit],
                'data.domicilio' => 'required|array',
                'data.domicilio.domicilio' => 'required|string',
                'data.domicilio.localidad_id' => 'required|integer|exists:localidades,id',
                'data.url_api' => 'nullable|string',
                'data.db_api' => 'nullable|string',
                'data.usuario_api' => 'nullable|string',
                'data.password_api' => 'nullable|string',
                'data.logo_file_path' => [
                'sometimes',
                 function ($attribute, $value, $fail) {
                    if (is_string($value)) {
                        return validator([$attribute => $value], [$attribute => 'string'])->passes();
                    } elseif ($value instanceof UploadedFile) {                         
                        return validator([$attribute => $value], [$attribute => 'file'])->passes();
                    }
                    $fail($attribute.' must be a file or a string.');
                },
                ],
                'data.usuarios' => 'array', 
                'data.prefijo' => 'required|string',
            ]; */
        }
        return $rules;
    }
}
