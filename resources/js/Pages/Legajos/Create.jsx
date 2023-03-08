import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { router } from "@inertiajs/core";
import Panel from '@/Layouts/Panel';
import ErrorForm from '@/Components/ErrorForm';
import FlashMessages from '@/Components/FlashMessages';
import Select from "react-select";
import BuscarUsuario from '@/Components/BuscarUsuario';

function Create() {

    const {errors, empresas,empresa_id}=usePage().props

    empresas.map((empresa) => {
        empresa.label = empresa.razon_social
        empresa.value = empresa.id
        return empresa
    })

    const [asociar, setAsociar] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

    useEffect(() => {
     if(usuarioSeleccionado !=="")
     setData((prev) => ({
        ...prev,
        nombre: usuarioSeleccionado.nombre,
        email: usuarioSeleccionado.email,
        cuil:usuarioSeleccionado.cuil
    }))
    else{
        setData((prev) => ({
            ...prev,
            nombre: "",
            email: "",
            cuil:""
        }))
    }

    }, [usuarioSeleccionado]);

    const { data, setData } = useForm({
        nombre: "",
        numero_legajo: "",
        cuil: "",
        email_corporativo: "",
        email: "",
        fecha_alta:"",
        generar_usuario: true,
    })

    console.log(data)

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

    function generar(e) {
        if (e.target.checked) 
        {setData("generar_usuario", true); setAsociar(false); setUsuarioSeleccionado("")} 
        else {
            setData("generar_usuario", false)
        }}

    function handleAsociar(e) {
        if (e.target.checked) 
        {setData("generar_usuario", false); setAsociar(true)} 
        else {setAsociar(false)}
    }

    function submit(e) {
        e.preventDefault();
        router.post(route('alta_legajo',empresa_id), data)
    }

    return (
    <>
    <FlashMessages/>
    <div className="contenedor">
        <div className="m-4 font-bold">
            <h1 className="text-2xl">Procesos Generales</h1>
            <h2 className="text-xl mt-2">Legajo</h2>
        </div>
        <h3 className="titulo">Nuevo</h3>

        <div className='pl-16 mb-8'>
            <div className='flex justify-between w-1/4'>
                <label className="switch">
                    <input 
                        type="checkbox"
                        checked={data.generar_usuario}
                        onChange={generar}
                        />
                    <span className="slider"></span>
                </label>
                <span className="ml-3 font-bold text-gray-900">Generar Usuario </span>
                <p className="mx-4" 
                    data-title='Si selecciona la opción "Generar Usuario" el legajo se creará junto con un usuario con el email y el CUIL provistos y una contraseña que se enviará via mail.'
                >
                    <img src="/img/Ayuda.svg"alt="Ayuda"/>
                </p>
            </div>

            <div className='flex justify-between w-1/4 mt-4'>
                <label className="switch">
                    <input 
                        type="checkbox"
                        checked={asociar || usuarioSeleccionado !==""}
                        onChange={handleAsociar}
                        />
                    <span className="slider"></span>
                </label>
                <span className="ml-3 font-bold text-gray-900">Asociar a un Usuario</span>
                    <p 
                        className="mx-4" 
                        data-title='Si selecciona la opción "Asociar a un Usuario" el legajo se creará a partir de un usuario ya existente con sus respectivos email y CUIL.'
                    >
                        <img src="/img/Ayuda.svg"alt="Ayuda"/>
                    </p>
            </div>
        </div>

        {asociar && 
        <BuscarUsuario 
            setUsuarioSeleccionado={setUsuarioSeleccionado} 
            handleClick={handleAsociar} 
            empresa_id={empresa_id}
            setAsociar={setAsociar}
        />}

            <div className="botonera">
                <button className="btn-verde ml-8" onClick={submit}>Aceptar</button>
                <Link href={route("index_legajos",empresa_id) }>
                    <button className="btn-rojo ml-2">Cancelar</button>
                </Link>
            </div>

            <form className="px-8"> 
                <div className="form-padre">
                    <div className="form-uno">
                        <label className='font-bold'>Nombre<span className="rojo">*</span></label>
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
                        <label className='font-bold'>N° de Legajo<span className="rojo">*</span></label>
                        <input
                            name="numero_legajo"
                            type="text"
                            className="input"
                            onChange={(e) => setData("numero_legajo", e.target.value)}
                            value={data.numero_legajo}
                        />
                        {errors.numero_legajo && <ErrorForm content={errors.numero_legajo}/>}
                    </div>
                </div>
                <div className="form-padre">
                    <div className="form-uno">
                        <label className='font-bold'>
                            C.U.I.L<span className="rojo">*</span>
                        </label>
                        <input
                            name="cuil"
                            type="text"
                            className={usuarioSeleccionado!==""?"input bg-gray-200 cursor-not-allowed":"input"}
                            value={data.cuil}
                            onChange={(e) => handleCuil(e)}
                            disabled={usuarioSeleccionado!==""}
                        />
                        {errors.cuil && <ErrorForm content={errors.cuil}/>}
                    </div>
                    <div className="form-dos">
                        <label className='font-bold'>Email<span className="rojo">*</span></label>
                        <input
                            name="email"
                            type="email"
                            className={usuarioSeleccionado!==""?"input bg-gray-200 cursor-not-allowed":"input"}
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            disabled={usuarioSeleccionado!==""}
                        />
                        {errors.email && <ErrorForm content={errors.email}/>}
                    </div>
                </div>
                <div className="form-padre">
                    <div className="form-uno">
                        <label className='font-bold'>
                            Fecha de Alta
                        </label>
                        <input
                            name="fecha_alta"
                            type="date"
                            className="input"
                            value={data.fecha_alta}
                            onChange={(e) =>setData("fecha_alta", e.target.value)}
                        />
                        {errors.fecha_alta && <ErrorForm content={errors.fecha_alta}/>}
                    </div>
                    <div className="form-dos">
                        <label className='font-bold'>Email Corporativo</label>
                        <input
                            name="email_corporativo"
                            type="email"
                            className="input"
                            onChange={(e) => setData("email_corporativo", e.target.value)}
                            value={data.email_corporativo}
                        />
                        {errors.email_corporativo && <ErrorForm content={errors.email_corporativo}/>}
                    </div>
                </div>
            </form>
    </div>
    </>
    );
}

export default Create;

Create.layout = (page) => <Panel title="Nuevo Legajo" children={page}/>;