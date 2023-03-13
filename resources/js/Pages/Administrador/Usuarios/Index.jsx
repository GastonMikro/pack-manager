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
import Paginator from '@/Components/Paginator';
import Select from "react-select";

function Index() {
    const {filters, empresas} = usePage().props

    empresas.map((empresa) => {
        empresa.label = empresa.razon_social
        empresa.value = empresa.id
        return empresa
    })

    const usuarios = usePage().props.usuarios.data
    const links = usePage().props.usuarios.links

    const crumbs = [
        {
            crumb: "Administrador",
            href: "",
        },
        {
            crumb: "Usuarios",
            href: "",
        },
    ];

    //Búsqueda
    const [values, setValues] = useState(
        {search: filters.search || "",
        empresa:filters.empresa || "",});


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
                    router.post(route("admin_estado_usuario", usuarioSeleccionado?.id ),[],
                    {onSuccess: () => setUsuarioSeleccionado("")}) }})
                    }else{
                         router.post(route("admin_estado_usuario",usuarioSeleccionado?.id),[],
                    {onSuccess: () => setUsuarioSeleccionado("")}
                    ) 
                    }
        }

    function handleEditar(){router.get(route("admin_ver_usuario", usuarioSeleccionado?.id ))}

    return (
        <>
        <FlashMessages/>
        <Breadcrumb crumbs={crumbs}/>   
            <div className="botonera-dos items-center">
                <div className='flex w-1/2 justify-around'>
                    <div className="w-1/2 mx-4">
                        <Search
                            placeholder="Buscar por nombre o C.U.I.L"
                            parentValues={values}
                            handleSearch={handleSearch}
                        />
                    </div>
                    <Select
                        placeholder="Seleccionar Empresa"
                        name="empresa"
                        options={empresas}
                        onChange={(option) => setValues(values => ({
                            ...values,
                            empresa: option.value
                        }))}
                        className="py-2 w-1/2"
                        styles={{
                            control: (base) => ({
                                ...base,
                                '&:hover': { borderColor: '#b03407' },
                                border: '1px solid lightgray', 
                                boxShadow: "0px 4px 5px rgb(0 0 0 / 14%), 0px 1px 10px rgb(0 0 0 / 12%), 0px 2px 4px rgb(0 0 0 / 20%)"
                            }),
                        }}
                    />
                </div>
            
                <div>
                    {usuarioSeleccionado !== "" && (
                            <button className="btn-claro mx-2" onClick={handleEditar}>Editar</button>)}
                    {usuarioSeleccionado !== "" && usuarioSeleccionado.activo==1 &&(
                        <button className="btn-rojo mr-2" onClick={handleHabilitacion}>Deshabilitar</button>)}
                        {usuarioSeleccionado !== "" && usuarioSeleccionado.activo==0 &&(
                        <button className="btn-verde mr-2" onClick={handleHabilitacion}>Habilitar</button>)}

                    <Link href={route("admin_nuevo_usuario")}>
                        <button className="btn-nuevo mr-4">Nuevo</button>
                    </Link>
                </div>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead className="table-header">
                        <tr>
                            <th>Nombre de Usuario</th>
                            <th>C.U.I.L</th>
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
                                <td>{usuario.cuil}</td>
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
            
            <div className='w-full flex justify-center'>
                <Paginator links={links}/>                  
            </div>
        </>
    );
}

export default Index;
Index.layout = (page) => <Panel title="Usuarios" children={page}/>;