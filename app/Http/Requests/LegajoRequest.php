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
                'nombre' => 'required|string|min:6',
                'numero_legajo' => 'required|integer',
                'cuil' => ['required' , 'size:13' , 'unique:legajos,cuil' , new CustomCuit],
                'fecha_alta' => 'nullable|date',
                'empresa_id' => 'nullable|integer',
                'generar_usuario' => 'boolean',
                'email' => 'email:rfc,dns|unique:legajos'
            ];
        }elseif($this->getMethod() === 'PATCH'){
            $rules = [
                'nombre' => 'required|string',
                'numero_legajo' => 'required|integer',
                'cuil' => ['required' , 'size:13' , Rule::unique('legajos' , 'cuil')->ignore($this->legajo->id), new CustomCuit],
                'email' => 'email:rfc,dns',Rule::unique('legajos')->ignore($this->legajo->id),
                'fecha_alta' => 'nullable|date',
                'empresa_id' => 'nullable|integer',
            ];
        }
        return $rules;
    }
}
