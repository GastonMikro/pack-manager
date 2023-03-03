import { Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { router } from "@inertiajs/core";
import Panel from "@/Layouts/Panel";
import FlashMessages from "@/Components/FlashMessages";
import { usePrevious } from "react-use";
import pickBy from "lodash/pickBy";
import Search from "@/Components/Search";
import Select from "react-select";

function Index() {

    const {legajos, filters,empresas,empresa_id} = usePage().props

    empresas.map((empresa) => {
        empresa.label = empresa.razon_social
        empresa.value = empresa.id
        return empresa
    })

    //Búsqueda
    const [values, setValues] = useState({search: filters.search || "",});
    useEffect(() => {
        if (prevValues) {
            const query = Object.keys(pickBy(values)).length
                ? pickBy(values)
                : { remember: "forget" };
            router.get(route(route().current(),empresa_id), query, {
                replace: true,
                preserveState: true,
            });
        }
    }, [values]);
    const prevValues = usePrevious(values);
    function handleSearch(key, value) {
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }
    //

    //Filtros
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState("");
    const [legajosShow, setlegajosShow] = useState(legajos);

    useEffect(() => {
       empresaSeleccionada !== "" && setlegajosShow(legajos.filter(l=>l.empresa_id===empresaSeleccionada))
       empresaSeleccionada == "" && setlegajosShow(legajos)
    }, [empresaSeleccionada]);

    useEffect(() => {
        setlegajosShow(legajos)
    }, [legajos]);
    //


    const [legajoSeleccionado, setLegajoSeleccionado] = useState("");

    function handleLegajo(id) {
        const legajoClick = legajos.find((legajo) =>legajo.id == id)
        if (legajoClick === legajoSeleccionado) {setLegajoSeleccionado("")
        } else {setLegajoSeleccionado(legajoClick)}
    }

    function handleDeshabilitar(){
        router.post(route("estado_legajo",{ empresa:empresa_id, legajo:legajoSeleccionado?.id }),[],
        {onSuccess: () => setLegajoSeleccionado("")})}

    function handleEditar(){router.get(route("ver_legajo", { empresa:empresa_id, legajo:legajoSeleccionado?.id }));}

    return (
        <>
        <FlashMessages/>
            <div className="contenedor">
                <div className="m-4 font-bold">
                    <h1 className="text-2xl">Procesos Generales</h1>
                    <h2 className="text-xl mt-2">Legajos</h2>
                </div>

                <div className="botonera-dos flex justify-between items-center">
                    <div>
                        <Link href={route("nuevo_legajo",empresa_id)}>
                            <button className="btn-nuevo ml-4">Nuevo</button>
                        </Link>

                        {legajoSeleccionado !== "" && (
                                <button className="btn-claro ml-2" onClick={handleEditar}>Editar</button>)}
                        {legajoSeleccionado !== "" && legajoSeleccionado.activo==1 &&(
                            <button className="btn-rojo ml-2" onClick={handleDeshabilitar}>Deshabilitar</button>)}
                         {legajoSeleccionado !== "" && legajoSeleccionado.activo==0 &&(
                            <button className="btn-verde ml-2" onClick={handleDeshabilitar}>Habilitar</button>)}
                    </div>
                    <div className='flex w-3/5 justify-end'>
                        <div className="w-1/3">
                            <Select
                                name="empresas"
                                onChange={(option) => setEmpresaSeleccionada(option.value)}
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
                                placeholder="Empresa"
                                value={empresaSeleccionada!=="" ? empresas.find(e=>e.value === empresaSeleccionada) : ""}
                            />
                        </div>
                        
                        <div className="w-1/3 mx-4">
                            <Search
                                placeholder="Buscar por nombre , N° o CUIL"
                                parentValues={values}
                                handleSearch={handleSearch}
                            />
                        </div>
                        <button
                            onClick={()=>{setEmpresaSeleccionada("") ;setValues({search:""})}}
                            type="button"
                            className="pr-4 underline"
                            title="Sacar Filtros"
                        >
                            <img src="/img/sacarfiltros.svg" className={empresaSeleccionada===""?"filter-grey":"filter-blue"}/>
                        </button>
                    </div>
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>N°</th>
                                <th>Nombre</th>
                                <th>CUIL</th>
                                <th>Fecha de Alta</th>
                                <th>Empresa</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {legajosShow?.map((legajo) => (
                                <tr
                                    className={legajo?.id==legajoSeleccionado.id?"table-row-seleccionada":"table-row"}
                                    onClick={()=>handleLegajo(legajo.id)}
                                    key={legajo.id}
                                >
                                    <td>{legajo.numero_legajo}</td>
                                    <td>{legajo.nombre}</td>
                                    <td>{legajo.cuil? legajo.cuil:"-"}</td>
                                    <td>{legajo.fecha_alta? legajo.fecha_alta.split(" ")[0].split("-").reverse().join("/"):"-"}</td>
                                    <td>{legajo.empresa.razon_social}</td>
                                    <td>
                                        {legajo.activo == 1 ? 
                                            <img src="/img/Tick.svg" alt="Tick"/>:
                                            <img src="/img/Cruz.svg" alt="Cruz"/>}
                                    </td>
                                </tr>
                            ))}
                             {legajos?.length == 0 &&
                            <tr className="text-center">
                            <td colSpan="5">No se cargaron datos</td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Index;
Index.layout = (page) => <Panel title="Usuarios" children={page}/>;