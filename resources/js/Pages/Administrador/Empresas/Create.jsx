import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { router } from "@inertiajs/core";
import Panel from '@/Layouts/Panel';
import Select from "react-select";
import ErrorForm from '@/Components/ErrorForm';
import FlashMessages from '@/Components/FlashMessages';
import Breadcrumb from '@/Components/Breadcrumb';

function Create() {

    let {errors, provincias, localidades, departamentos}=usePage().props

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
            crumb: "Alta",
            href: "",
        },
    ];

    const { data, setData } = useForm({
        razon_social: "",
        cuit: "",
        domicilio: {},
        logo_file_path:null,
        url_api: "http://127.0.0.1:8004",
        db_api: "",
        usuario_api: "",
        password_api: "",
        prefijo: "",
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

    const [domicilio, setDomicilio] = useState({
        localidad_id: "",
        domicilio: "",
    });

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
    let localidad = localidades.filter(localidad => localidad.id === domicilio.localidad)
    let depto = departamentos.filter(departamento => departamento.id === localidad[0]?.departamento_id)
    let provincia = provincias.find(provincia => provincia.id === depto[0]?.provincia_id)

    const [avatar, setAvatar] = useState(!data.logo_file_path ? '/img/LogoPackManager.png' : data.logo_file_path)
    const [archivoElegido, setArchivoElegido] = useState()
    useEffect(() => {
        if (archivoElegido) {
            const objectUrl = URL.createObjectURL(archivoElegido)
            setAvatar(objectUrl)
            setData('logo_file_path',archivoElegido)
            return () => URL.revokeObjectURL(objectUrl)
        }
    },[archivoElegido])

    function submit(e) {
        e.preventDefault();
        router.post(route('alta_empresa'), data,{
            forceFormData: true
        })
    }

    return (
    <>
        <FlashMessages/>
        <Breadcrumb crumbs={crumbs}/>
        <div className="botonera justify-end">
            <button className="btn-verde" onClick={submit}>Aceptar</button>
            <Link href={route("index_empresas") }>
                <button className="btn-rojo ml-2 mr-4">Cancelar</button>
            </Link >
        </div>
        <form className="px-4"> 
            <h3 className="flex justify-start ml-8 font-bold mb-2">Logo</h3>
            <div className="w-10/12 mt-4 mx-auto flex flex-col justify-center items-center pr-4">
                <img src={avatar} alt="Logo Empresa" className="w-1/4 mb-4"/>
                <div>
                    <input
                        type="file"
                        onChange={(e) => {setArchivoElegido(e.target.files[0])}}
                        hidden
                        id="logo"
                        accept="image/*"
                    />
                        <label htmlFor="logo" className="cursor-pointer">
                            <img src="/img/Cambiar.png" alt="Cambiar Logo" className='h-8'/>
                        </label>
                    {errors.logo_file_path && <ErrorForm content={errors.logo_file_path}/>}
                </div>
            </div>
            <h3 className="flex justify-start ml-8 font-bold my-2 border-t-2 pt-4">Datos Principales</h3>
            <div className="form-padre">
                <div className="form-uno">
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
                <div className="form-dos">
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
            </div>
            <h3 className="flex justify-start ml-8 font-bold my-2 border-t-2 pt-4">Datos de Contacto</h3>
            <div className="form-padre px-8">
                <div className="w-full">
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
                                className="py-2"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        '&:hover': { borderColor: '#b03407' },
                                        border: '1px solid lightgray', 
                                        boxShadow: "0px 4px 5px rgb(0 0 0 / 14%), 0px 1px 10px rgb(0 0 0 / 12%), 0px 2px 4px rgb(0 0 0 / 20%)"
                                    }),
                                }}
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
                                className="py-2"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        '&:hover': { borderColor: '#b03407' },
                                        border: '1px solid lightgray', 
                                        boxShadow: "0px 4px 5px rgb(0 0 0 / 14%), 0px 1px 10px rgb(0 0 0 / 12%), 0px 2px 4px rgb(0 0 0 / 20%)"
                                    }),
                                }}
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
                                name="localidad_id"
                                options={localidadesFiltradas}
                                onChange={(option) =>
                                    {setDomicilio((prev) => ({
                                        ...prev,
                                        localidad_id: option.value,
                                    }))
                                }}
                                className="py-2"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        '&:hover': { borderColor: '#b03407' },
                                        border: '1px solid lightgray', 
                                        boxShadow: "0px 4px 5px rgb(0 0 0 / 14%), 0px 1px 10px rgb(0 0 0 / 12%), 0px 2px 4px rgb(0 0 0 / 20%)"
                                    }),
                                    }}
                                defaultValue={localidades.find(localidad => localidad.value === data?.domicilio.localidad_id || "")}
                            />
                            {errors["domicilio.localidad_id"] && <ErrorForm content={errors["domicilio.localidad_id"]}/>}
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
                            }
                            }
                            value={data?.domicilio.domicilio|| ""}
                        />
                            {errors["domicilio.domicilio"] && <ErrorForm content={errors["domicilio.domicilio"]}/>}
                    </div>
                </div>
            </div>

            <h3 className="flex justify-start ml-8 font-bold my-2 border-t-2 pt-4">Configuración API Tango</h3>
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
            <h3 className="flex justify-start ml-8 font-bold my-2 border-t-2 pt-4">Configuración</h3>
            <div className="form-padre mb-2">
                <div className="form-uno">
                    <label className="font-bold">Prefijo Tabla<span className="rojo">*</span></label>
                    <input
                        name="prefijo"
                        type="text"
                        className="input"
                        onChange={(e) => setData("prefijo", e.target.value)}
                        value={data.prefijo}
                    />
                    {errors.prefijo && <ErrorForm content={errors.prefijo}/>}
                </div>
                <div className="form-dos">
                </div>
            </div>
        </form>
    </>
    );
}

export default Create;

Create.layout = (page) => <Panel title="Nueva Empresa" children={page}/>;