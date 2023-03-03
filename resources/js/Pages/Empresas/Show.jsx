import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { router } from "@inertiajs/core";
import Panel from '@/Layouts/Panel';
import Select from "react-select";
import ErrorForm from '@/Components/ErrorForm';
import FlashMessages from '@/Components/FlashMessages';

function Show() {

    let {errors, provincias, localidades, departamentos, empresa}=usePage().props

    const { data, setData } = useForm({
        razon_social: empresa.razon_social ||"",
        cuit: empresa.cuit ||"",
        domicilio: empresa?.domicilio||{},
        logo: empresa.logo_file_path||null,
    })

    function handleCuit(e) {
        if (
            e.target.value?.length === 11 &&
            data.cuit.length < e.target.value.length
        ) {
            e.target.value = [e.target.value.slice(0, 11), "-"].join("");
        } else if (
            e.target.value.length >= 2 &&
            !e.target.value.includes("-") &&
            data.cuit.length < e.target.value.length
        ) {
            if (!e.target.value.includes("-")) {
                e.target.value = [
                    e.target.value.slice(0, 2),
                    "-",
                    e.target.value.slice(2),
                ].join("");
            }
        }
        setData("cuit", e.target.value);
    }

    const [domicilio, setDomicilio] = useState( empresa.domicilio[0] );

    useEffect(() => {
        if (Object.keys(domicilio).length > 0) {
            setData((prevState) => ({
                ...prevState,
                domicilio: domicilio,
            }));
        }
    }, [domicilio]);

    provincias?.map((provincia) => {
        provincia.label = provincia.nombre
        provincia.value = provincia.id
        return provincia
    })
    departamentos?.map((departamento) => {
        departamento.label = departamento.nombre
        departamento.value = departamento.id
        return departamento
    })
    localidades?.map((localidad) => {
        localidad.label = localidad.nombre
        localidad.value = localidad.id
        return localidad
    })
    const [provinciasFiltradas , setProvinciasFiltradas] = useState(provincias)
    const [departamentosFiltrados , setDepartamentosFiltrados] = useState([])
    const [localidadesFiltradas , setLocalidadesFiltradas] = useState([])

    function handleDepartamentos(option){
        let filtrados=departamentos.filter(d => d.provincia_id === option.id)
        setDepartamentosFiltrados(filtrados)
    }

    function handleLocalidades(option){
        let filtradas=localidades.filter(l => l.departamento_id === option.id)
        setLocalidadesFiltradas(filtradas)
    }

    let localidad = localidades.filter(localidad => localidad.id === domicilio.localidad_id)
    let depto = departamentos.filter(departamento => departamento.id === localidad[0]?.departamento_id)
    let provincia = provincias.find(provincia => provincia.id === depto[0]?.provincia_id)

    function submit(e) {
        e.preventDefault();
        router.post(route('alta_empresa'), data)
    }

    return (
        <>
    <FlashMessages/>
    <div className="contenedor">
        <div className="m-4 font-bold">
            <h1 className="text-2xl">Procesos Generales</h1>
            <h2 className="text-xl mt-2">Empresa</h2>
        </div>
       <h3 className="titulo">Editar</h3>

        <div className="botonera">
            <button className="btn-verde ml-8" onClick={submit}>Aceptar</button>
            <Link href={route("index_empresas") }>
                <button className="btn-rojo ml-2">Cancelar</button>
            </Link >
        </div>
        <form className="px-8"> 
            <div className="form-padre">
                <div className="form-uno">
                    <label className="font-bold">Razón Social<span className="rojo">*</span></label>
                    <input
                        name="razon_social"
                        type="text"
                        className="input"
                        onChange={(e) => setData("razon_social", e.target.value)}
                        value={data.razon_social}
                    />
                     {errors.razon_social && <ErrorForm content={errors.razon_social}/>}
                </div>
                <div className="form-dos">
                    <label className="font-bold">Cuit<span className="rojo">*</span></label>
                    <input
                        name="cuit"
                        type="text"
                        className="input"
                        onChange={(e) => handleCuit(e)}
                        value={data.cuit}
                    />
                    {errors.cuit && <ErrorForm content={errors.cuit}/>}
                </div>
            </div>
            <div className="form-uno pr-16">
                <label className="font-bold">Logo</label>
                <input
                    className="h-9 rounded shadow-gray-400 my-2 block w-full text-lg text-gray-900 bg-white border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-100 dark:placeholder-gray-100"
                    type="file"
                    name="logo_file_path"
                    accept="image/*"
                    value=""
                    onChange={(e)=>setData("logo_file_path", e.target.files[0].name)}       
                />
                {errors.logo_file_path && <ErrorForm content={errors.logo_file_path}/>}
            </div>
            <div className="form-padre px-8 my-4 border-t-2">
                <div className="w-full pt-4">
                    <div className="flex">
                        <div className="w-1/3">
                            <label className="font-bold">
                                Provincia
                            </label>
                            <Select
                                placeholder="Seleccionar"
                                name="provincia"
                                options={provinciasFiltradas}
                                onChange={(option) => handleDepartamentos(option)}
                                className="my-2"
                                defaultValue={provincia|| ""}
                            />
                        </div>
                        <div className="w-1/3 mx-8">
                            <label className="font-bold">
                                Departamento
                            </label>
                            <Select
                                placeholder="Seleccionar"
                                name="departamento"
                                options={departamentosFiltrados}
                                onChange={(option) => handleLocalidades(option)}
                                className="my-2"
                                defaultValue={depto||""}
                            />
                        </div>
                        <div className="w-1/3">
                            <label className="font-bold">
                                Localidad
                                <span className="text-red-500"> *</span>
                            </label>
                            <Select
                                placeholder="Seleccionar"
                                name="localidad"
                                options={localidadesFiltradas}
                                onChange={(option) =>
                                    {setDomicilio((prev) => ({
                                        ...prev,
                                        localidad: option.value,
                                    }))
                                    errors["domicilio.localidad"]=""
                                }}
                                className=" my-2"
                                defaultValue={localidad[0] || ""}
                                
                            />
                            {errors["domicilio.localidad"] && <ErrorForm content={errors["domicilio.localidad"]}/>}
                        </div>
                    </div>
                    <div className="w-1/3 pr-6">
                        <label className="font-bold">Dirección<span className="text-red-500"> *</span></label>
                        <input
                            type="text"
                            name="domicilio"
                            className="input"
                            onChange={(e) =>
                                {setDomicilio((prev) => ({
                                    ...prev,
                                    domicilio: e.target.value,
                                }))
                                errors["domicilio.domicilio"]=""
                            }
                            }
                            value={data?.domicilio.domicilio|| ""}
                        />
                            {errors["domicilio.domicilio"] && <ErrorForm content={errors["domicilio.domicilio"]}/>}
                    </div>
                </div>
            </div>
        </form>
    </div>
    </>
    );
}

export default Show;

Show.layout = (page) => <Panel title="Empresa" children={page}/>;