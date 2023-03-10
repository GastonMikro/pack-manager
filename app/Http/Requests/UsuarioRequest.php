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
            if($this->routeIs('admin_alta_usuario'))
            {$rules = [
                'nombre' => 'required|string',
                'email' => 'required|email|unique:users',
                'cuil' => ['required' , 'size:13', 'unique:users,cuil' , new CustomCuit],
                'password_autenticacion' => 'nullable|string',
                'roles' => 'required|array',
                'empresas' => 'array', 
            ];}
            else{$rules = [
                'nombre' => 'required|string',
                'email' => 'required|email|unique:users',
                'cuil' => ['required' , 'size:13', 'unique:users,cuil' , new CustomCuit],
                'password' => 'required|string',
                'password_autenticacion' => 'nullable|string',
                'roles' => 'required|array',
            ];}
            
        }elseif($this->getMethod() === 'PATCH'){
            $rules = [
                'nombre' => 'required|string',
                'email' => 'required|email',Rule::unique('users')->ignore($this->usuario->id),
                'cuil' => ['required' , 'size:13' , Rule::unique('users' , 'cuil')->ignore($this->usuario->id), new CustomCuit],
                'roles' => 'required|array',
                'empresas' => 'required|array',
            ];
        }
        return $rules;
    }
}
