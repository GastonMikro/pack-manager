import { Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { router } from "@inertiajs/core";
import Panel from "@/Layouts/Panel";
import FlashMessages from "@/Components/FlashMessages";
import { usePrevious } from "react-use";
import pickBy from "lodash/pickBy";
import Search from "@/Components/Search";
import Swal from 'sweetalert2';
import Breadcrumb from '@/Components/Breadcrumb';

function Index() {
    const {empresas, filters} = usePage().props

    const crumbs = [
        {
            crumb: "Administrador",
            href: "",
        },
        {
            crumb: "Empresas",
            href: "",
        },
    ];

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

    function handleHabilitacion(){
        if(empresaSeleccionada.activo =="1"){
            Swal.fire({
                title: 'ADVERTENCIA:',
                text: `Está por deshabilitar la empresa ${empresaSeleccionada.razon_social}. ¿Desea continuar?`,
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                    router.post(route("estado_empresa",empresaSeleccionada?.id),[],
                    {onSuccess: () => setEmpresaSeleccionada("")})
            }})
                }else{
                    router.post(route("estado_empresa",empresaSeleccionada?.id),[],
        {onSuccess: () => setEmpresaSeleccionada("")})
                }
    }

    function handleEditar(){router.get(route("ver-datos-empresa", empresaSeleccionada));}


    return (
        <>
        <FlashMessages/>

            <Breadcrumb crumbs={crumbs}/>
                <div className="botonera-dos">
                    <div className="w-1/3 ml-4">
                        <Search
                            placeholder="Buscar por razón social o C.U.I.T."
                            parentValues={values}
                            handleSearch={handleSearch}
                        />
                    </div>
                    <div>
                        {empresaSeleccionada !== "" && (
                                <button className="btn-claro ml-2" onClick={handleEditar}>Editar</button>)}
                        {empresaSeleccionada !== "" && empresaSeleccionada.activo==1 &&(
                            <button className="btn-rojo mx-2" onClick={handleHabilitacion}>Deshabilitar</button>)}
                            {empresaSeleccionada !== "" && empresaSeleccionada.activo==0 &&(
                            <button className="btn-verde mx-2" onClick={handleHabilitacion}>Habilitar</button>)}

                            <Link href={route("nueva_empresa")}>
                            <button className="btn-nuevo mr-4">Nuevo</button>
                        </Link>
                    </div>
                    
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th></th>
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
                                    <td className='w-32 pl-16'> 
                                        <img src={empresa.logo_file_path !== "/storage/" ? empresa.logo_file_path :'/img/LogoPackManager.png' } alt="logo" className=""/>
                                    </td>
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
                            <td colSpan="5">No se cargaron datos</td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
        </>
    );
}

export default Index;
Index.layout = (page) => <Panel title="Empresas" children={page}/>;