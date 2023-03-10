import { router } from "@inertiajs/core";
import { Head, Link, usePage } from "@inertiajs/react";
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

    function handleEmpresa(option){
        setEmpresa_id(option)
        router.get(route("dashboard", option))
    }

    const [procesos, setProcesos] = useState(false);
    const [recibos, setRecibos] = useState(false);
    const [admin, setAdmin] = useState(false);

    function handleEditarUsuario() {router.get(route("ver_usuario", {empresa: empresa_id, usuario:ID}))}

    function logout() {router.post(route("logout"))}

    return (
        <>
            <Head title={title}/>
                <nav className="z-50 fixed w-screen bg-pack-100 px-2 sm:flex justify-between items-center border-b-1 border-gray-600 font-bold" style={{height: "7vh"}}>
                    
                <div className="flex px-4 items-center justify-between sm:py-0 pb-1">
                        <Select
                            defaultValue={empresas_input.find(empresa=>empresa.value==empresa_id)}
                            placeholder="Seleccionar Empresa"
                            name="empresa"
                            onChange={(option) => handleEmpresa(option.value)}
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
                            className="w-48"
                        />
                    </div>
                    
                    <div className="flex cursor-pointer pr-4">
                        <p className=" py-4 text-white hover:underline underline-offset-2 font-semibold mr-4" onClick={handleEditarUsuario}>
                            {usePage().props.auth.user.email}
                        </p>
                        <button className="cerrar-sesion my-4 " onClick={logout}>Cerrar Sesi??n</button>
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
                            onMouseEnter={() => setAdmin(true)}
                            onMouseLeave={() => setAdmin(false)}
                        >
                            <p>Administrador</p>
                            {admin && (
                                <ul className="text-end">
                                    <li className="li-menu">
                                        <Link href={route("admin_index_usuarios")}>
                                            <h1>Usuarios</h1>
                                        </Link>
                                    </li>
                                    <li className="li-menu">
                                        <Link href={route("index_empresas")}>
                                            <h1>Empresas</h1>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <div
                            onMouseEnter={() => setProcesos(true)}
                            onMouseLeave={() => setProcesos(false)}
                        >
                            <p>Procesos Generales</p>
                                {procesos &&
                                <ul className="text-end">
                                    <li className="li-menu">
                                        <Link href={route("index_usuarios",{empresa:empresa_id})}>
                                            <h1>Usuarios</h1>
                                        </Link>
                                    </li>
                                    <li className="li-menu">
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
                                    <li className="li-menu">
                                        <Link href={route("index_recibos",{empresa:empresa_id})}>
                                            <h1>Todos</h1>
                                        </Link>
                                    </li>
                                    <li className="li-menu">
                                        <Link href={route("importar_recibos",{empresa:empresa_id})}>
                                            <h1>Generaci??n</h1>
                                        </Link>
                                    </li>
                                    <li className="li-menu">
                                        <Link href={route("firma_empleador_recibos",{empresa:empresa_id})}>
                                            <h1>Autorizar Recibos</h1>
                                        </Link>
                                    </li>
                                    <li className="li-menu">
                                        <Link href={route("register2FA_recibos",{empresa:empresa_id})}>
                                            <h1>Autenticaci??n de dos factores</h1>
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
