import { Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { router } from "@inertiajs/core";
import Panel from '@/Layouts/Panel';
import ErrorForm from '@/Components/ErrorForm';
import FlashMessages from '@/Components/FlashMessages';
import Select from "react-select";

function Create() {

    const {errors, empresas,empresa_id}=usePage().props

    empresas.map((empresa) => {
        empresa.label = empresa.razon_social
        empresa.value = empresa.id
        return empresa
    })

    const { data, setData } = useForm({
        nombre: "",
        numero_legajo: "",
        cuil: "",
        email: "",
        fecha_alta:"",
        empresa_id:"",
        generar_usuario: false,
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

    function generar(e) {
        if (e.target.checked) {setData("generar_usuario", true)} 
        else {setData("generar_usuario", false)}}

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
                    <label className='font-bold'>N°<span className="rojo">*</span></label>
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
                    <label className='font-bold'>Empresa<span className="rojo">*</span></label>
                    <Select
                        defaultValue={empresas.find((co) => co.value === data.empresas)}
                        name="empresas"
                        onChange={(option) => setData('empresa_id',option.value)}
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
                    {errors.empresa && <ErrorForm content={errors.empresa}/>}
                </div>
                <div className="form-dos">
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
            </div>

            <div className="flex items-center mt-4 ml-8 w-full">
                <div className="flex flex-row w-1/2">
                    <label htmlFor="default-toggle"className="inline-flex relative items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            id="default-toggle"
                            className="sr-only peer"
                            onChange={generar}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">¿Generar Usuario?</span>
                    </label>

                    <p className="mx-4" data-title='Si selecciona la opción "Generar Usuario" el legajo se creará junto con un usuario con el email provisto y una contraseña que se enviará via mail. Si no selecciona la opción el sistema intentará asociar el legajo a un usuario. Para eso en el campo "Email" ingrese el email del usuario correspondiente al legajo.'>
                        <button className="btn ayuda-formulario" type="button">
                        <img src="/img/Ayuda.svg"alt="Ayuda"/>
                        </button>
                    </p>
                </div>
            </div>
        </form>
    </div>
    </>
    );
}

export default Create;

Create.layout = (page) => <Panel title="Nuevo Legajo" children={page}/>;