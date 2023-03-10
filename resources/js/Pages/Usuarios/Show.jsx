import React, { useEffect, useState } from "react";
import Panel from "@/Layouts/Panel";
import { Link, useForm, usePage } from "@inertiajs/react";
import Select from "react-select";
import FlashMessages from "@/Components/FlashMessages";
import ErrorForm from "@/Components/ErrorForm";
import Swal from "sweetalert2";
import { router } from "@inertiajs/core";
import Breadcrumb from "@/Components/Breadcrumb";
import ModalCambiarContrasenia from "@/Components/Modales/ModalCambiarContrasenia";


export default function Show() {
    const { errors, empresas, roles, usuario,empresa_id,empresa_razon_social} = usePage().props
    const crumbs = [
        {
            crumb: empresa_razon_social,
            href: "",
        },
        {
            crumb: "Usuarios",
            href: route('index_usuarios',empresa_id),
        },
        {
            crumb: usuario.nombre,
            href: "",
        },
    ];
    empresas.map((empresa) => {
        empresa.label = empresa.razon_social
        empresa.value = empresa.id
        return empresa
    })
    roles.map((rol) => {
        rol.label = rol.nombre
        rol.value = rol.id
        return rol
    })

    const rolesusuario=usuario.roles.map(rol=> {return {value: rol.id,label: rol.nombre}})
    const empresas_usuario=usuario.empresas.map(empresa=> {return {value: empresa.id,label: empresa.razon_social}})
    
    const { data, setData } = useForm({
        nombre: usuario?.nombre|| "",
        email:usuario?.email|| "",
        password: usuario?.password||"",
        cuil:usuario?.cuil||"",
        roles:usuario?.roles.map(e=>e.id)||[],
        empresas:usuario?.empresas.map(e=>e.id)||[]
    })

    function cambiarPassword(e) {
        e.preventDefault();
        /* Inertia.get(route("usuario.cambioPassword",{company_id: company_id,id: usuario.id})) */
    }
    
    const [password, setPassword] = useState(false);

    function handleCuil(e) {
        if (
            e.target.value?.length === 11 &&
            data.cuil.length < e.target.value.length
        ) {
            e.target.value = [e.target.value.slice(0, 11), "-"].join("");
        } else if (
            e.target.value.length >= 2 &&
            !e.target.value.includes("-") &&
            data.cuil.length < e.target.value.length
        ) {
            if (!e.target.value.includes("-")) {
                e.target.value = [
                    e.target.value.slice(0, 2),
                    "-",
                    e.target.value.slice(2),
                ].join("");
            }
        }
        setData("cuil", e.target.value);
    }

    function verLegajo(empresa, legajo){
        router.get(route("ver_legajo", {empresa:empresa, legajo:legajo}))
    }

    function submit(e) {
        e.preventDefault();
        router.patch(route("editar_usuario", {empresa: empresa_id, usuario:usuario}),data)
    }

    return (
        <>
     { password && <ModalCambiarContrasenia usuario={usuario} handleClick={()=>setPassword(false)}/>}
        <FlashMessages/>
        <Breadcrumb crumbs={crumbs}/>
            <div className="botonera justify-end">
                <button className="btn-verde" onClick={submit}>Aceptar</button>
                <Link href={route("index_usuarios",empresa_id)}>
                    <button className="btn-rojo ml-2 mr-4">Volver</button>
                </Link>
            </div>
            <div className="px-4"> 
                <div className="form-padre">
                    <div className="form-uno">
                        <label className='font-bold'>Nombre de Usuario<span className="rojo">*</span></label>
                        <input
                            name="nombre"
                            type="text"
                            className="input"
                            onChange={(e)=>setData("nombre", e.target.value)}
                            value={data.nombre||""}
                        />
                        {errors.nombre && <ErrorForm content={errors.nombre}/>}
                    </div>
                    <div className="form-dos">
                        <label className='font-bold'>Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            className="input"
                            onChange={(e)=>setData("email", e.target.value)}
                            value={data.email||""}
                        />
                        {errors.email && <ErrorForm content={errors.email}/>}
                    </div>
                </div>
                <div className="form-padre">
                    <div className="form-uno">
                    <label className='font-bold'>Contrase??a</label>
                        <input
                            name="password"
                            type="password"
                            className="input bg-gray-200 cursor-not-allowed my-2"
                            disabled
                            onChange={(e)=>setData("password", e.target.value)}
                            value={data.password||""}
                        />
                        <button className="btn-rojo h-6 w-full" onClick={()=>setPassword(true)}>Cambiar Contrase??a</button>
                    </div>
                    <div className="form-dos">
                        <label className='font-bold'>
                            CUIL<span className="rojo">*</span>
                        </label>
                        <input
                            name="cuil"
                            type="cuil"
                            className="input"
                            value={data.cuil}
                            onChange={(e) => handleCuil(e)}
                        />
                        {errors.cuil && <ErrorForm content={errors.cuil}/>}
                    </div>
                </div>
                
                <div className="form-padre">
                    <div className="form-uno">
                        <label className='font-bold'>Empresa<span className="rojo">*</span></label>
                        <Select
                            defaultValue={empresas_usuario}
                            name="empresas"
                            onChange={(option) => setData('empresas',option.map(o=>o.value))}
                            isMulti
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
                        />
                        {errors.empresas &&<ErrorForm content={errors.empresas}/>}
                    </div>
                    <div className="form-dos">
                            <label className='font-bold'>Rol<span className="rojo">*</span></label>
                            <Select
                                defaultValue={rolesusuario}
                                name="roles"
                                onChange={(option) => setData('roles',option.map(o=>o.value))}
                                isMulti
                                className="py-2"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        '&:hover': { borderColor: '#b03407' },
                                        border: '1px solid lightgray', 
                                        boxShadow: "0px 4px 5px rgb(0 0 0 / 14%), 0px 1px 10px rgb(0 0 0 / 12%), 0px 2px 4px rgb(0 0 0 / 20%)"
                                    }),
                                }}
                                options={roles}
                            />
                            {errors.roles && <ErrorForm content={errors.roles}/>}
                    </div>
                </div>
            </div>
           {usuario.legajos.length > 0 ?  
            <div className="px-12 mt-4 font-bold ">
                <label>Legajos Asociados</label>
                <div className="flex bg-white rounded mt-2 px-4">
                    <p className="p-2 w-1/4 text-center">Nombre</p>
                    <p className="p-2 w-1/4 text-center">Empresa</p>
                    <p className="p-2 w-1/4 text-center">Email Corporativo</p>
                    <p className="p-2 w-1/4 hover:underline text-center"></p>
                </div>
                {usuario.legajos.map(legajo=>
                <div className="flex bg-white rounded mt-2 px-4" key={legajo.id}>
                    <p className="p-2 w-1/4 text-center">{legajo.nombre}</p>
                    <p className="p-2 w-1/4 text-center">{empresas.find(empresa=>empresa.id===legajo.empresa_id).razon_social}</p>
                    <p className="p-2 w-1/4 text-center">{legajo.email_corporativo ? legajo.email_corporativo : "-" }</p>
                    <p className="p-2 w-1/4 hover:underline text-center" onClick={()=>verLegajo(legajo.empresa_id, legajo.id )}>Ver</p>
                </div>
                )}             
            </div> :""} 
        </>
    );
}

Show.layout = (page) => <Panel title="Usuario" children={page}/>;
