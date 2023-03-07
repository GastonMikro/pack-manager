<?php

namespace App\Http\Requests;

use App\Rules\CustomCuit;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class UsuarioRequest extends FormRequest
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
                'email' => 'required|email|unique:users',
                'password' => 'required|string',
                'password_autenticacion' => 'nullable|string',
                'roles' => 'required|array',
                'empresas' => 'required|array'
            ];
            
        }elseif($this->getMethod() === 'PATCH'){
            $rules = [
                'nombre' => 'required|string',
                'email' => 'required|email',Rule::unique('users')->ignore($this->usuario->id),
                'roles' => 'required|array',
                'empresas' => 'required|array'
            ];
        }
        return $rules;
    }
}
