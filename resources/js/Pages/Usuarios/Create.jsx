import { Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { router } from "@inertiajs/core";
import Panel from '@/Layouts/Panel';
import Select from "react-select";
import ErrorForm from '@/Components/ErrorForm';
import FlashMessages from '@/Components/FlashMessages';

function Create() {

    const {errors, roles, empresas, empresa_id}=usePage().props

    empresas.map((empresa) => {
        empresa.label = empresa.razon_social
        empresa.value = empresa.id
        return empresa
    })
    roles.map((rol) => {
        rol.label = rol.nombre
        rol.value = rol.id
        return rol
    })

    const { data, setData } = useForm({
        nombre: "",
        email: "",
        password: "",
        password_autenticacion:"",
        roles:[],
        empresas: []
    })

    function submit(e) {
        e.preventDefault();
        router.post(route('alta_usuario',empresa_id), data)
    }

    return (
    <>
    <FlashMessages/>
    <div className="contenedor">
        <div className="m-4">
            <h1 className="text-2xl font-bold">Procesos Generales</h1>
            <h2 className="text-xl mt-2 font-bold">Usuario</h2>
        </div>
        <h3 className="titulo">Nuevo</h3>

        <div className="botonera">
            <button className="btn-verde ml-8" onClick={submit}>Aceptar</button>
            <Link href={route("index_usuarios",empresa_id) }>
                <button className="btn-rojo ml-2">Cancelar</button>
            </Link >
        </div>
        <form className="px-8"> 
            <div className="form-padre">
                <div className="form-uno">
                    <label className='font-bold'>Nombre de Usuario<span className="rojo">*</span></label>
                    <input
                        name="nombre"
                        type="text"
                        className="input"
                        onChange={(e) => setData("nombre", e.target.value)}
                        value={data.nombre}
                    />
                     {errors.nombre && <ErrorForm content={errors.nombre}/>}
                </div>
                <div className="form-dos">
                    <label className='font-bold'>Email<span className="rojo">*</span></label>
                    <input
                        name="email"
                        type="text"
                        className="input"
                        onChange={(e) => setData("email", e.target.value)}
                        value={data.email}
                    />
                    {errors.email && <ErrorForm content={errors.email}/>}
                </div>
            </div>
            <div className="form-padre">
                <div className="form-uno">
                    <label className='font-bold'>
                        Contraseña<span className="rojo">*</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        className="input"
                        value={data.password}
                        onChange={(e) =>setData("password", e.target.value)}
                    />
                    {errors.password && <ErrorForm content={errors.password}/>}
                </div>
                <div className="form-dos">
                    <label className='font-bold'>
                        Contraseña Autenticación
                    </label>
                    <input
                        name="password_autenticacion"
                        type="password"
                        className="input"
                        value={data.password_autenticacion}
                        onChange={(e) =>setData("password_autenticacion", e.target.value)}
                    />
                    {errors.password_autenticacion && <ErrorForm content={errors.password_autenticacion}/>}
                </div>
            </div>
            <div className="form-padre">
                <div className="form-uno">
                <label className='font-bold'>Empresa<span className="rojo">*</span></label>
                    <Select
                        defaultValue={empresas.find((empresa) => empresa.value === data.empresas)}
                        name="empresas"
                        onChange={(option) => setData('empresas',option.map(o=>o.value))}
                        isMulti
                        className="py-2"
                        styles={{
                            control: (base) => ({
                                ...base,
                                '&:hover': { borderColor: '#b03407' },
                                border: '1px solid lightgray', 
                                boxShadow: "0px 4px 5px rgb(0 0 0 / 14%), 0px 1px 10px rgb(0 0 0 / 12%), 0px 2px 4px rgb(0 0 0 / 20%)"
                            }),
                        }}
                     options={empresas}
                    />
                    {errors.empresas && <ErrorForm content={errors.empresas}/>}
                </div>
                <div className="form-dos">
                    <label className='font-bold'>Rol<span className="rojo">*</span></label>
                        <Select
                         defaultValue={roles.find((roles) => roles.value === data.roles)}
                        name="roles"
                        onChange={(option) => setData('roles',option.map(o=>o.value))}
                        isMulti
                        className="py-2"
                        styles={{
                            control: (base) => ({
                                ...base,
                                '&:hover': { borderColor: '#b03407' },
                                border: '1px solid lightgray', 
                                boxShadow: "0px 4px 5px rgb(0 0 0 / 14%), 0px 1px 10px rgb(0 0 0 / 12%), 0px 2px 4px rgb(0 0 0 / 20%)"
                            }),
                        }}
                        options={roles}
                    />
                    {errors.roles && <ErrorForm content={errors.roles}/>}
                </div>
            </div>
        </form>
    </div>
    </>
    );
}

export default Create;

Create.layout = (page) => <Panel title="Nuevo Usuario" children={page}/>;