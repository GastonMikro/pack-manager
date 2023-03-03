import { Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { router } from "@inertiajs/core";
import Panel from "@/Layouts/Panel";
import FlashMessages from "@/Components/FlashMessages";
import { usePrevious } from "react-use";
import pickBy from "lodash/pickBy";
import Search from "@/Components/Search";

function Index() {

    const {empresas, filters} = usePage().props

     //Búsqueda
     const [values, setValues] = useState({search: filters.search || "",});
     useEffect(() => {
         if (prevValues) {
             const query = Object.keys(pickBy(values)).length
                 ? pickBy(values)
                 : { remember: "forget" };
             router.get(route(route().current()), query, {
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

    const [empresaSeleccionada, setEmpresaSeleccionada] = useState("");

    function handleEmpresa(id) {
        const empresaClick = empresas.find((empresa) =>empresa.id == id)
        if (empresaClick === empresaSeleccionada) {setEmpresaSeleccionada("")
        } else {setEmpresaSeleccionada(empresaClick)}
    }

    function handleDeshabilitar(){
        router.post(route("estado_empresa",empresaSeleccionada?.id),[],
        {onSuccess: () => setEmpresaSeleccionada("")})
    }

    function handleEditar(){router.get(route("ver_empresa", {id:empresaSeleccionada?.id}));}

    return (
        <>
        <FlashMessages/>
            <div className="contenedor">
                <div className="m-4 font-bold">
                    <h1 className="text-2xl">Procesos Generales</h1>
                    <h2 className="text-xl mt-2">Empresas</h2>
                </div>

                <div className="botonera-dos">
                    <div>
                        <Link href={route("nueva_empresa")}>
                            <button className="btn-nuevo ml-4">Nuevo</button>
                        </Link>

                        {empresaSeleccionada !== "" && (
                                <button className="btn-claro ml-2" onClick={handleEditar}>Editar</button>)}
                        {empresaSeleccionada !== "" && empresaSeleccionada.activo==1 &&(
                            <button className="btn-rojo ml-2" onClick={handleDeshabilitar}>Deshabilitar</button>)}
                         {empresaSeleccionada !== "" && empresaSeleccionada.activo==0 &&(
                            <button className="btn-verde ml-2" onClick={handleDeshabilitar}>Habilitar</button>)}
                    </div>
                    <div className="w-1/3 mr-4">
                        <Search
                            placeholder="Buscar por razón social o CUIT"
                            parentValues={values}
                            handleSearch={handleSearch}
                        />
                    </div>
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>Razón Social</th>
                                <th>CUIT</th>
                                <th>Domicilio</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empresas?.map((empresa) => (
                                <tr
                                    className={empresa?.id==empresaSeleccionada.id?"table-row-seleccionada":"table-row"}
                                    onClick={()=>handleEmpresa(empresa.id)}
                                    key={empresa.id}
                                >
                                    <td>{empresa.razon_social}</td>
                                    <td>{empresa.cuit}</td>
                                    <td>{empresa.domicilio?.domicilio}</td>
                                    <td>
                                        {empresa.activo == 1 ? 
                                            <img src="/img/Tick.svg" alt="Tick"/>:
                                            <img src="/img/Cruz.svg" alt="Cruz"/>}
                                    </td>
                                </tr>
                            ))}
                             {empresas?.length == 0 &&
                            <tr className="text-center">
                            <td colSpan="4">No se cargaron datos</td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
               
            </div>
        </>
    );
}

export default Index;
Index.layout = (page) => <Panel title="Empresas" children={page}/>;