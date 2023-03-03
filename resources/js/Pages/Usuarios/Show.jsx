import React, { useEffect, useState } from "react";
import Panel from "@/Layouts/Panel";
import { Link, useForm, usePage } from "@inertiajs/react";
import Select from "react-select";
import FlashMessages from "@/Components/FlashMessages";
import ErrorForm from "@/Components/ErrorForm";
import Swal from "sweetalert2";
import { router } from "@inertiajs/core";


export default function Show() {
    const { errors, empresas, roles, usuario,empresa_id} = usePage().props
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
        nombre: usuario?.nombre|| "",
        email:usuario?.email|| "",
        password: usuario?.password||"",
        roles:usuario?.roles.map(e=>e.id)||[],
        empresas:usuario?.empresas.map(e=>e.id)||[]
    })

    const rolesusuario=usuario.roles.map(rol=> {return {value: rol.id,label: rol.nombre}})

    const empresas_usuario=usuario.empresas.map(empresa=> {return {value: empresa.id,label: empresa.razon_social}})

    function cambiarPassword(e) {
        e.preventDefault();
        /* Inertia.get(route("usuario.cambioPassword",{company_id: company_id,id: usuario.id})) */
    }

    function restablecerPassword(e) {
        /* Swal.fire({
            title: 'ADVERTENCIA:',
            text: `Esta por blanquear la contraseña de un usuario y generar una nueva aleatoria que llegará a su mail. ¿Desea continuar?`,
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
                e.preventDefault();
                Inertia.post(route("usuario.restablecerPassword",{company_id: company_id,id: usuario.id}))}}) */
            }

    function submit(e) {
        e.preventDefault();
        router.patch(route("editar_usuario", {empresa: empresa_id, usuario:usuario}),data)
    }

    return (
        <>
        <FlashMessages/>
            <div className="contenedor">
                <div className="m-4 font-bold">
                    <h1 className="text-2xl">Procesos Generales</h1>
                    <h2 className="text-xl mt-2">Usuarios</h2>
                </div>

                <h3 className="titulo">Editar</h3>
                <div className="botonera">
                    <button className="btn-verde ml-8" onClick={submit}>Aceptar</button>
                    <Link href={route("index_usuarios",empresa_id)}>
                        <button className="btn-rojo ml-2">Cancelar</button>
                    </Link>
                </div>
                <form className="px-8"> 
                    <div className="form-padre">
                        <div className="form-uno">
                            <label className='font-bold'>Nombre de Usuario<span className="rojo">*</span></label>
                            <input
                                name="nombre"
                                type="text"
                                className="input"
                                onChange={(e)=>setData("nombre", e.target.value)}
                                value={data.nombre||""}
                            />
                            {errors.nombre && <ErrorForm content={errors.nombre}/>}
                        </div>
                        <div className="form-dos">
                            <label className='font-bold'>Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                className="input"
                                onChange={(e)=>setData("email", e.target.value)}
                                value={data.email||""}
                            />
                            {errors.email && <ErrorForm content={errors.email}/>}
                        </div>
                    </div>
                    <div className="form-padre">
                        <div className="form-uno">
                        <label className='font-bold'>Contraseña</label>
                            <input
                                name="password"
                                type="password"
                                className="input-disabled cursor-not-allowed my-2"
                                disabled={true}
                                onChange={(e)=>setData("password", e.target.value)}
                                value={data.password||""}
                            />
                        </div>
                        <div className="form-dos">
                            <label className='font-bold'>Rol<span className="rojo">*</span></label>
                            <Select
                                defaultValue={rolesusuario}
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
                    <div className="form-uno pr-16">
                        <label className='font-bold'>Empresa<span className="rojo">*</span></label>
                        <Select
                            defaultValue={empresas_usuario}
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
                        {errors.empresas &&<ErrorForm content={errors.empresas}/>}
                    </div>
                </form>
            </div>
        </>
    );
}

Show.layout = (page) => <Panel title="Usuario" children={page}/>;
