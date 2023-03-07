import { Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { router } from "@inertiajs/core";
import Panel from "@/Layouts/Panel";
import FlashMessages from "@/Components/FlashMessages";
import { usePrevious } from "react-use";
import pickBy from "lodash/pickBy";
import Search from "@/Components/Search";
import Swal from 'sweetalert2';

function Index() {
    const {usuarios, filters, empresa_id} = usePage().props

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

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

    function handleUsuario(id) {
        const usuarioClick = usuarios.find((usuario) =>usuario.id == id)
        if (usuarioClick === usuarioSeleccionado) {setUsuarioSeleccionado("")
        } else {setUsuarioSeleccionado(usuarioClick)}
    }

    function handleHabilitacion(){
        if(usuarioSeleccionado.activo =="1"){
            Swal.fire({
                title: 'ADVERTENCIA:',
                text: `Está por deshabilitar al usuario ${usuarioSeleccionado.nombre}. ¿Desea continuar?`,
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                    router.post(route("estado_usuario",{ empresa:empresa_id, usuario:usuarioSeleccionado?.id }),[],
        {onSuccess: () => setUsuarioSeleccionado("")})
                    }})
        }else{
            router.post(route("estado_usuario",{ empresa:empresa_id, usuario:usuarioSeleccionado?.id }),[],
        {onSuccess: () => setUsuarioSeleccionado("")})
        }
    }

    function handleEditar(){router.get(route("ver_usuario", { empresa:empresa_id, usuario:usuarioSeleccionado?.id }))}

    return (
        <>
        <FlashMessages/>
            <div className="contenedor">    
                <div className="m-4">
                    <h1 className="text-2xl font-bold">Procesos Generales</h1>
                    <h2 className="text-xl mt-2 font-bold">Usuarios</h2>
                </div>
                <div className="botonera-dos items-center">
                    <div>
                        <Link href={route("nuevo_usuario",empresa_id)}>
                            <button className="btn-nuevo ml-4">Nuevo</button>
                        </Link>

                        {usuarioSeleccionado !== "" && (
                                <button className="btn-claro ml-2" onClick={handleEditar}>Editar</button>)}
                        {usuarioSeleccionado !== "" && usuarioSeleccionado.activo==1 &&(
                            <button className="btn-rojo ml-2" onClick={handleHabilitacion}>Deshabilitar</button>)}
                         {usuarioSeleccionado !== "" && usuarioSeleccionado.activo==0 &&(
                            <button className="btn-verde ml-2" onClick={handleHabilitacion}>Habilitar</button>)}
                    </div>
                    <div className="w-1/3 mr-4">
                        <Search
                            placeholder="Buscar por nombre"
                            parentValues={values}
                            handleSearch={handleSearch}
                        />
                    </div>
                </div>

                <div className="table-container">
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>Nombre de Usuario</th>
                                <th>Email</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios?.map((usuario) => (
                                <tr
                                    className={usuario?.id==usuarioSeleccionado.id?"table-row-seleccionada":"table-row"}
                                    onClick={()=>handleUsuario(usuario.id)}
                                    key={usuario.id}
                                >
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        {usuario.activo == 1 ? 
                                            <img src="/img/Tick.svg" alt="Tick"/>:
                                            <img src="/img/Cruz.svg" alt="Cruz"/>}
                                    </td>
                                </tr>
                            ))}
                             {usuarios?.length == 0 &&
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
Index.layout = (page) => <Panel title="Usuarios" children={page}/>;