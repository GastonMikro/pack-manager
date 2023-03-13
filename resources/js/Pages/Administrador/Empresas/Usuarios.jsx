import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { router } from "@inertiajs/core";
import Panel from '@/Layouts/Panel';
import FlashMessages from '@/Components/FlashMessages';
import Breadcrumb from '@/Components/Breadcrumb';
import TabsShowEmpresa from '@/Components/Tabs/TabsShowEmpresa';
import { usePrevious } from 'react-use';
import { pickBy } from 'lodash';

function Usuarios() {
    let {empresa, usuarios}=usePage().props

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
            crumb: empresa.razon_social,
            href: "",
        },
    ];

    const { data, setData } = useForm({
        usuarios: empresa.usuarios||[],
    })

    const [usuariosSeleccionados,setUsuariosSeleccionados] = useState(empresa.usuarios)
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
    const [render, setRender] = useState(false);
    const [values, setValues] = useState({});
    const prevValues = usePrevious(values);

    useEffect(() => {
        if (prevValues) {
            const query = Object.keys(pickBy(values)).length
                ? pickBy(values)
                : { remember: "forget" };
            router.get(route(route().current(), empresa), query, {
                replace: true,
                preserveState: true,
            });
        }
    }, [values]);

    function handleIncluir(usuario) {
        usuariosSeleccionados.push(usuario)
        setUsuarioSeleccionado("")
        setRender(!render);
    }

    function handleSacar(id) {
        let filtrado=usuariosSeleccionados.filter(i=>i.id !==id)
        setUsuariosSeleccionados(filtrado)
        setRender(!render);
    }

    useEffect(() => {
        setData((prevState) => ({
            ...prevState,
            usuarios: usuariosSeleccionados,
        }));

    }, [usuariosSeleccionados, render]);

    const [agregar, setAgregar] = useState(false);

    const [buscarUsuario, setBuscarUsuario] = useState("");
    function handleSearch() {
        if(buscarUsuario !== undefined) {
            setValues((values) => ({
                ...values,
                search: buscarUsuario
            }))
        }else{
            setValues((values) => ({
                ...values,
                search: ""
            }))
        }
    }

    let filtrados= usuarios.filter(usuario =>!data.usuarios?.map(e=>e.id).includes(usuario.id))

    const [editar, setEditar] = useState(false)

    function recargarDatos(){
        router.get(route("ver-usuarios-empresa",empresa))
    }

    function submit(e) {
        let data2=data
        data2.usuarios = data2.usuarios.map(usuario =>usuario.id)
        e.preventDefault();
        router.patch(route("actualizar-usuarios-empresa",empresa),data2)
    }
    return (
    <>
        <FlashMessages/>
        <Breadcrumb crumbs={crumbs}/>
        <TabsShowEmpresa tab={`Usuarios`} empresa={empresa}/>

        

        {!editar &&
        <div className="botonera justify-end mt-0">
            <button className="btn-verde ml-8" onClick={()=>setEditar(true)}>Editar</button>
        </div>}

        {editar &&
        <div className="botonera mt-0 justify-end">
            <button className="btn-verde ml-8" onClick={submit}>Guardar</button>
            <button className="btn-rojo ml-2" onClick={recargarDatos}>Cancelar</button>
        </div>}

        <div className="items-center w-full pt-2 px-4">
            <div className="table-container table-seleccionados mb-4">
                <table className="table text-center leading-6">
                    <thead className="table-header leading-6">
                        <tr>
                            <th className='p-0'>Nombre</th>
                            <th className='p-0'>C.U.I.L.</th>
                            <th className='p-0'>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.usuarios?.map(({id,nombre, cuil, activo}) => {
                        return (
                            <tr
                                key={id}
                                className={editar?"table-row":"cursor-not-allowed"}
                                data-id={id}
                                onClick={editar?()=>handleSacar(id):()=>{}}
                            >
                                <td>{nombre}</td>
                                <td>{cuil}</td>
                                <td>{activo ? "Activo" : "Inactivo"}</td>
                            </tr>
                        )
                            })}
                    {data.usuarios?.length === 0 && <tr><td colSpan="3">No se seleccionó ningún usuario.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>

        {!agregar && <button className={editar?"btn-verde w-1/5 ml-8":"btn-verde w-1/5 ml-8 opacity-50 cursor-not-allowed"} onClick={()=>{setAgregar(true)}} disabled={!editar}>
            Añadir usuarios
        </button>}

        {agregar &&
        <>
            <div className="flex items-center w-full px-8">
                <div className="flex items-center w-1/2">
                    <input
                        type="search"
                        placeholder="Buscar usuario"
                        className="input w-1/2"
                        onChange={(e)=>{setBuscarUsuario(e.target.value)}}
                        onKeyUp={e => {if (e.key === 'Enter') {handleSearch()}}}
                        value={buscarUsuario}
                    />
                    <button className="btn-verde ml-2 h-8" onClick={handleSearch}>Buscar</button>
                </div>

                <div className="flex justify-center items-center w-1/2">
                    {usuarioSeleccionado &&
                    <div className="font-bold p-1 bg-white border border-black rounded flex">
                        <p className="font-bold p-1">{usuarioSeleccionado.nombre}</p>
                        <button className="btn-verde ml-4 h-8" onClick={()=>handleIncluir(usuarioSeleccionado)}>Incluir</button>
                    </div>
                    }
                </div>
            </div>

            <div className="table-container mb-4 table-seleccionados px-8">
                <table className="table text-center leading-6">
                    <thead className="table-header leading-6">
                        <tr>
                            <th className='p-0'>Nombre</th>
                            <th className='p-0'>C.U.I.L.</th>
                            <th className='p-0'>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrados?.map(usuario => {
                            return (
                                <tr
                                    key={usuario.id}
                                    className="table-row"
                                    data-id={usuario.id}
                                    onClick={()=>setUsuarioSeleccionado(usuario)}
                                    onDoubleClick={()=>handleIncluir(usuario)}
                                >
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.cuil}</td>
                                    <td>{usuario.activo ? "Activo" : "Inactivo"}</td>
                                </tr>
                            )
                        })}
                        {filtrados?.length === 0 && (<tr><td colSpan="3">No se encontraron resultados.</td></tr>)}
                    </tbody>
                </table>
            </div>
        </>}
    </>
    );
}

export default Usuarios;

Usuarios.layout = (page) => <Panel title="Empresa" children={page}/>;