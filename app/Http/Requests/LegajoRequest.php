<?php

namespace App\Http\Requests;

use App\Rules\CustomCuit;
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
                    'nombre' => 'required|string',
                    'numero_legajo' => 'required|integer',
                    'cuil' => 'required|string',
                    'fecha_alta' => 'nullable|date',
                    'empresa_id' => 'required|integer',
                    'generar_usuario' => 'boolean',
                    'email' => 'email|unique:legajos',
                ];
            
        }elseif($this->getMethod() === 'PATCH'){
            $rules = [
                'nombre' => 'required|string',
                'numero_legajo' => 'required|integer',
                'cuil' => 'required|string',Rule::unique('legajos')->ignore($this->legajo->id),
                'email' => 'email',Rule::unique('legajos')->ignore($this->legajo->id),
                'fecha_alta' => 'nullable|date',
                'empresa_id' => 'required|integer',
                 /* 'usuario_id' => 'required|integer' */
            ];
        }
        return $rules;
    }
}
