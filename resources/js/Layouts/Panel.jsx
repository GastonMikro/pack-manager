import { router } from "@inertiajs/core";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function Panel({title, children}) {

    let ID = usePage().props.auth.user.id;
    const {empresas_input}=usePage().props
    const [empresa_id, setEmpresa_id] = useState(children.props.empresa_id);

    empresas_input.map((empresa) => {
        empresa.label = empresa.razon_social
        empresa.value = empresa.id
        return empresa
    })

    const { data, setData } = useForm({empresa: ""})

    useEffect(() => {
        setEmpresa_id(data.empresa)
        router.get(route("dashboard", data.empresa))
    }, [data]);

    const [procesos, setProcesos] = useState(false);
    const [recibos, setRecibos] = useState(false);

    function handleEditarUsuario() {router.get(route("ver_usuario",  ID,))}

    function logout() {router.post(route("logout"))}

    return (
        <>
            <Head title={title}/>
                <nav className="z-50 fixed w-screen bg-pack-100 px-2 sm:flex justify-between items-center border-b-1 border-gray-600 font-bold" style={{height: "7vh"}}>
                    
                <div className="flex px-4 items-center justify-between sm:py-0 pb-1">
                    
                        <Select
                            /* defaultValue={optionscompanies.find((empresa) => empresa?.value === data.empresa)} */
                            placeholder="Seleccionar Empresa"
                            name="empresa"
                            onChange={(option) => setData("empresa", option.value) }
                            isSearchable={true}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    "&:hover": { borderColor: "#b03407" },
                                    border: "1px solid lightgray",
                                    boxShadow:
                                        "0px 4px 5px rgb(0 0 0 / 14%), 0px 1px 10px rgb(0 0 0 / 12%), 0px 2px 4px rgb(0 0 0 / 20%)",
                                }),
                            }}
                            options={empresas_input}
                        />{/* : <p className="text-white">{empresa_id}</p> */}
                    </div>
                    
                    <div className="flex cursor-pointer">
                        <p className=" py-4 text-white hover:underline underline-offset-2 font-semibold mr-4" onClick={handleEditarUsuario}>
                            {usePage().props.auth.user.email}
                        </p>
                        <button className="cerrar-sesion my-4 " onClick={logout}>Cerrar Sesión</button>
                    </div>

                    <div className="sidebar">
                        <img
                            src="/img/LogoPackManager.png"
                            alt=""
                            width="140px"
                            height="46px"
                            className="ml-10 mb-4"
                        />
                        <div
                            onMouseEnter={() => setProcesos(true)}
                            onMouseLeave={() => setProcesos(false)}
                        >
                            <p>Procesos Generales</p>
                                {procesos &&
                                <ul className="text-end">
                                    <li>
                                        <Link href={route("index_usuarios",{empresa:empresa_id})}>
                                            <h1>Usuarios</h1>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route("index_empresas")}>
                                            <h1>Empresas</h1>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route("index_legajos",{empresa:empresa_id})}>
                                            <h1>Legajos</h1>
                                        </Link>
                                    </li>
                                </ul>}
                        </div>

                        <div
                            onMouseEnter={() => setRecibos(true)}
                            onMouseLeave={() => setRecibos(false)}
                        >
                            <p>Recibos</p>
                            {recibos && (
                                <ul className="text-end">
                                    <li>
                                        <Link href={route("index_recibos",{empresa:empresa_id})}>
                                            <h1>Todos</h1>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route("importar_recibos",{empresa:empresa_id})}>
                                            <h1>Generación</h1>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route("firma_empleador_recibos",{empresa:empresa_id})}>
                                            <h1>Autorizar Recibos</h1>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route("register2FA_recibos",{empresa:empresa_id})}>
                                            <h1>Autenticación de dos factores</h1>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </nav>
            <div className="Content-Container">{children}</div>
        </>
    );
}
