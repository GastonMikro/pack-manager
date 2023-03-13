import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/core";
import ErrorForm from "../ErrorForm";
import ShadeScreen from "../ShadeScreen";

export default function ModalCambiarContrasenia({usuario, handleClick}) {
    const {errors}=usePage().props

    const { data, setData } = useForm({
        anterior: "",
        nueva: "",
        confirmar: "",
    });

    function handleEnviar() {
        /* Inertia.patch(route("cambiar-contrasenia",usuario.id), data,{
            onFinish: () => Promise.all[handleClick]
        }) */
    }

    return (
        <>
            <ShadeScreen handleClick={handleClick}/>
            <div className="modalpassword rounded">
                <p
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    onClick={handleClick}
                >
                   ✖
                </p>
                <div className="flex flex-col h-full justify-center">
                    <h3 className="font-bold">Contraseña anterior<span className="rojo">*</span></h3>
                    <input
                        name="anterior"
                        type="password"
                        value={data.anterior}
                        className="input"
                        onChange={(e) => setData("anterior", e.target.value)}
                        required
                    />
                    {errors.anterior && <ErrorForm content={errors.anterior}/>}
                    <h3 className="font-bold">Contraseña Nueva<span className="rojo">*</span></h3>
                    <input
                        name="nueva"
                        type="password"
                        value={data.nueva}
                        className="input"
                        onChange={(e) => setData("nueva", e.target.value)}
                        required
                    />
                    {errors.nueva && <ErrorForm content={errors.nueva}/>}
                        <h3 className="font-bold">Repetir Contraseña nueva<span className="rojo">*</span></h3>
                    <input
                        name="confirmar"
                        type="password"
                        value={data.confirmar}
                        className="input"
                        onChange={(e) => setData("confirmar", e.target.value)}
                        required
                    />
                    {errors.confirmar && <ErrorForm content={errors.confirmar}/>}
                    <button
                        className="btn-verde w-full mt-4"
                        onClick={handleEnviar}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </>
    );
}
