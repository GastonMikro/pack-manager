import { Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { router } from "@inertiajs/core";
import Panel from "@/Layouts/Panel";
import FlashMessages from "@/Components/FlashMessages";
import { usePrevious } from "react-use";
import pickBy from "lodash/pickBy";
import Search from "@/Components/Search";
import Select from "react-select";
import Swal from 'sweetalert2';
import Breadcrumb from '@/Components/Breadcrumb';

function Index() {
    const {legajos, filters,empresas,empresa_id} = usePage().props
    const empresa=empresas.find(empresa=>empresa.id === empresa_id).razon_social

    const crumbs = [
        {
            crumb: empresa,
            href: "",
        },
        {
            crumb: "Legajos",
            href: "",
        },
    ];
    
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
       (empresaSeleccionada == "" || empresaSeleccionada == "Todas")  && setlegajosShow(legajos)
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

    function handleHabilitacion(){
        if(legajoSeleccionado.activo =="1"){
            Swal.fire({
                title: 'ADVERTENCIA:',
                text: `Está por deshabilitar el legajo ${legajoSeleccionado.nombre}. ¿Desea continuar?`,
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                    router.post(route("estado_legajo",{empresa:empresa_id, legajo:legajoSeleccionado?.id }),[],
                {onSuccess: () => setLegajoSeleccionado("")})}})
                }else{
                    router.post(route("estado_legajo",{empresa:empresa_id, legajo:legajoSeleccionado?.id }),[],
                {onSuccess: () => setLegajoSeleccionado("")})
                }
    }
    
    function handleEditar(){router.get(route("ver_legajo", {empresa:empresa_id, legajo:legajoSeleccionado?.id}))}

    return (
        <>
        <FlashMessages/>
            <div className="contenedor">
            <Breadcrumb crumbs={crumbs}/>
                <div className="botonera-dos flex justify-between items-center">
                    <div className="w-1/3 mx-4">
                            <Search
                                placeholder="Buscar por nombre o N°"
                                parentValues={values}
                                handleSearch={handleSearch}
                            />
                        </div>
                        <div className='flex'>
                            {legajoSeleccionado !== "" && (
                                    <button className="btn-claro ml-2" onClick={handleEditar}>Editar</button>)}
                            {legajoSeleccionado !== "" && legajoSeleccionado.activo==1 &&(
                                <button className="btn-rojo mx-2" onClick={handleHabilitacion}>Deshabilitar</button>)}
                            {legajoSeleccionado !== "" && legajoSeleccionado.activo==0 &&(
                                <button className="btn-verde mx-2" onClick={handleHabilitacion}>Habilitar</button>)}

                            <Link href={route("nuevo_legajo",empresa_id)}>
                                <button className="btn-nuevo mr-4">Nuevo</button>
                            </Link>
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
Index.layout = (page) => <Panel title="Legajos" children={page}/>;