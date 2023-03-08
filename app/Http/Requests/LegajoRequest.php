<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class LegajoRequest extends FormRequest
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
                'nombre' => 'required|string|min:6',
                'numero_legajo' => 'required|integer', 
                /* 'email' => 'required|email|unique:users', */
                'email_corporativo' => 'nullable|email:rfc',          
                'fecha_alta' => 'nullable|date',
                'generar_usuario' => 'boolean',
                'empresa_id' => 'nullable|integer',            
            ];
        }elseif($this->getMethod() === 'PATCH'){
            $rules = [
                'nombre' => 'required|string',
                'numero_legajo' => 'required|integer',
                'email' => 'required|email',Rule::unique('users')->ignore($this->legajo->usuario_id),
                'email_corporativo' => 'nullable|email:rfc',
                'fecha_alta' => 'nullable|date',
                'empresa_id' => 'nullable|integer',
            ];
        }
        return $rules;
    }
}
