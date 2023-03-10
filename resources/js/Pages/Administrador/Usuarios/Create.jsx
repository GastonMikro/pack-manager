import { Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { router } from "@inertiajs/core";
import Panel from '@/Layouts/Panel';
import Select from "react-select";
import ErrorForm from '@/Components/ErrorForm';
import FlashMessages from '@/Components/FlashMessages';
import Breadcrumb from '@/Components/Breadcrumb';

function Create() {

    const {errors, roles, empresas}=usePage().props

    const crumbs = [
        {
            crumb: "Administrador",
            href: "",
        },
        {
            crumb: "Usuarios",
            href: route('admin_index_usuarios'),
        },
        {
            crumb: "Alta",
            href: "",
        },
    ];

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
        cuil:"",
        roles:[],
        empresas: []
    })

    function handleCuil(e) {
        if (
            e.target.value?.length === 11 &&
            data.cuil.length < e.target.value.length
        ) {
            e.target.value = [e.target.value.slice(0, 11), "-"].join("");
        } else if (
            e.target.value.length >= 2 &&
            !e.target.value.includes("-") &&
            data.cuil.length < e.target.value.length
        ) {
            if (!e.target.value.includes("-")) {
                e.target.value = [
                    e.target.value.slice(0, 2),
                    "-",
                    e.target.value.slice(2),
                ].join("");
            }
        }
        setData("cuil", e.target.value);
    }

    function submit(e) {
        e.preventDefault();
        router.post(route('admin_alta_usuario'), data)
    }

    return (
    <>
    <FlashMessages/>
    <Breadcrumb crumbs={crumbs}/>
        <div className="botonera justify-end">
            <button className="btn-verde" onClick={submit}>Aceptar</button>
            <Link href={route("admin_index_usuarios") }>
                <button className="btn-rojo ml-2 mr-4">Cancelar</button>
            </Link >
        </div>
        <form className="px-4"> 
            <div className="form-padre">
                <div className="form-uno">
                    <label className='font-bold'>Nombre de Usuario<span className="rojo">*</span></label>
                    <input
                        name="nombre"
                        type="text"
                        className="input"
                        onChange={(e) => setData("nombre", e.target.value)}
                        value={data.nombre}
                        autoComplete={false}
                    />
                     {errors.nombre && <ErrorForm content={errors.nombre}/>}
                </div>
                <div className="form-dos">
                    <label className='font-bold'>Email<span className="rojo">*</span></label>
                    <input
                        name="email"
                        type="email"
                        className="input"
                        onChange={(e) => setData("email", e.target.value)}
                        value={data.email}
                    />
                    {errors.email && <ErrorForm content={errors.email}/>}
                </div>
            </div>
            <div className="form-padre">
                <div className="form-uno">
                   {/*  <label className='font-bold'>
                        Contraseña<span className="rojo">*</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        className="input"
                        value={data.password}
                        onChange={(e) =>setData("password", e.target.value)}
                    />
                    {errors.password && <ErrorForm content={errors.password}/>} */}
                </div>
                <div className="form-dos">
                    <label className='font-bold'>
                        CUIL<span className="rojo">*</span>
                    </label>
                    <input
                        name="cuil"
                        type="cuil"
                        className="input"
                        value={data.cuil}
                        onChange={(e) => handleCuil(e)}
                    />
                    {errors.cuil && <ErrorForm content={errors.cuil}/>}
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
    </>
    );
}

export default Create;

Create.layout = (page) => <Panel title="Nuevo Usuario" children={page}/>;