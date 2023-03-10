import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { router } from "@inertiajs/core";
import Panel from '@/Layouts/Panel';
import Select from "react-select";
import ErrorForm from '@/Components/ErrorForm';
import FlashMessages from '@/Components/FlashMessages';
import Breadcrumb from '@/Components/Breadcrumb';
import TabsShowEmpresa from '@/Components/Tabs/TabsShowEmpresa';

function Configuracion() {
    let {errors,empresa}=usePage().props
    const crumbs = [
        {
            crumb: "Administrador",
            href: "",
        },
        {
            crumb: "Empresas",
            href: route('index_empresas'),
        },
        {
            crumb: empresa.razon_social,
            href: "",
        },
    ];

    const { data, setData } = useForm({
        url_api: empresa.url_api ||"",
        db_api: empresa.db_api ||"",
        usuario_api: empresa.usuario_api ||"",
        password_api: empresa.password_api ||"",
    })

    function submit(e) {
        e.preventDefault();
        router.post(route("editar_empresa",empresa), {
            _method: 'patch',
            data: data
        },{
            forceFormData: true
        })
    }

    return (
    <>
        <FlashMessages/>
        <Breadcrumb crumbs={crumbs}/>
        <TabsShowEmpresa tab={`Configuración`} empresa={empresa}/>
        <div className="botonera justify-end">
            <button className="btn-verde ml-8" onClick={submit}>Aceptar</button>
            <Link href={route("index_empresas") }>
                <button className="btn-rojo ml-2">Volver</button>
            </Link >
        </div>

        <form className="px-4"> 
            <div className="form-padre">
                <div className="form-uno">
                    <label className="font-bold">URL<span className="rojo">*</span></label>
                    <input
                        name="url_api"
                        type="text"
                        className="input"
                        onChange={(e) => setData("url_api", e.target.value)}
                        value={data.url_api}
                    />
                    {errors.url_api && <ErrorForm content={errors.url_api}/>}
                </div>
                <div className="form-dos">
                    <label className="font-bold">Base de Datos<span className="rojo">*</span></label>
                    <input
                        name="db_api"
                        type="text"
                        className="input"
                        onChange={(e) => setData("db_api", e.target.value)}
                        value={data.db_api}
                    />
                    {errors.db_api && <ErrorForm content={errors.db_api}/>}
                </div>
            </div>
            <div className="form-padre mb-2">
                <div className="form-uno">
                    <label className="font-bold">Usuario<span className="rojo">*</span></label>
                    <input
                        name="usuario_api"
                        type="text"
                        className="input"
                        onChange={(e) => setData("usuario_api", e.target.value)}
                        value={data.usuario_api}
                    />
                    {errors.usuario_api && <ErrorForm content={errors.usuario_api}/>}
                </div>
                <div className="form-dos">
                    <label className="font-bold">Contraseña<span className="rojo">*</span></label>
                    <input
                        name="password_api"
                        type="text"
                        className="input"
                        onChange={(e) => setData("password_api", e.target.value)}
                        value={data.password_api}
                    />
                    {errors.password_api && <ErrorForm content={errors.password_api}/>}
                </div>
            </div>
        </form>
    </>
    );
}

export default Configuracion;

Configuracion.layout = (page) => <Panel title="Empresa" children={page}/>;