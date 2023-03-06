import { Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { router } from "@inertiajs/core";
import Panel from '@/Layouts/Panel';
import ErrorForm from '@/Components/ErrorForm';
import FlashMessages from '@/Components/FlashMessages';
import Select from "react-select";

function Show() {

    let {errors,legajo, empresas, empresa_id}=usePage().props
    empresas=empresas.map(empresa=> {return {value: empresa.id,label: empresa.razon_social}})

    const { data, setData } = useForm({
        nombre: legajo.nombre ||"",
        numero_legajo: legajo.numero_legajo||"",
        cuil: legajo.cuil ||"",
        fecha_alta:legajo.fecha_alta.split(" ")[0]||"",
        empresa_id: legajo.empresa_id||"",
        email: legajo.email||"",
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
        router.patch(route('editar_legajo', {empresa: empresa_id, legajo:legajo}), data)
    }

    return (
        <>
    <FlashMessages/>
    <div className="contenedor">
        <div className="m-4 font-bold">
            <h1 className="text-2xl">Procesos Generales</h1>
            <h2 className="text-xl mt-2">Legajo</h2>
        </div>
        <h3 className="titulo">Editar</h3>

        <div className="botonera">
            <button className="btn-verde ml-8" onClick={submit}>Aceptar</button>
            <Link href={route("index_legajos",empresa_id) }>
                <button className="btn-rojo ml-2">Cancelar</button>
            </Link >
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
                    <label className='font-bold'>Empresa<span className="rojo">*</span></label>
                    <Select
                        defaultValue={empresas.find((co) => co.value === data.empresa_id)}
                        name="empresas"
                        isDisabled
                        className="py-2"
                        styles={{
                            control: (base) => ({
                                ...base,
                                '&:hover': { borderColor: '#b03407' },
                                border: '1px solid lightgray',
                                boxShadow: "0px 4px 5px rgb(0 0 0 / 14%), 0px 1px 10px rgb(0 0 0 / 12%), 0px 2px 4px rgb(0 0 0 / 20%)"
                            }),
                            singleValue: (styles) => {return {...styles,color: 'black',}
                        }}}
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
        </form>
    </div>
    </>
    );
}

export default Show;

Show.layout = (page) => <Panel title="Nuevo Legajo" children={page}/>;