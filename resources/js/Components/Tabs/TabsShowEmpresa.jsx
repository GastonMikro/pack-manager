import React from "react";
import { router } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";

const Tabs = ({tab, empresa}) => {
   /*  const {empresa} = usePage().props */

    function handleGeneral(){
        router.get(route("ver-datos-empresa", empresa))
    }

    function handleUsuarios(){
        router.get(route("ver-usuarios-empresa", empresa))
    }

    function handleConfiguracion(){
        router.get(route("ver-configuracion-empresa", empresa))
    }

    return (
        <>
            <div className="flex flex-wrap w-full px-4">
                <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row w-full">
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <div
                            className={
                                "pestania " +
                                (tab === `Datos`
                                    ? "border-b-4 border-orange-700 cursor-pointer h-9"
                                    : "text-" + "-600 bg-white cursor-pointer h-9")}
                            onClick={(e) => {e.preventDefault();handleGeneral();}} >
                            Datos
                        </div>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <div
                            className={
                                "pestania " +
                                (tab === `Usuarios`
                                    ? "border-b-4 border-orange-700 cursor-pointer h-9"
                                    : "text-" + "-600 bg-white cursor-pointer h-9")}
                            onClick={(e) => {e.preventDefault();handleUsuarios();}}>
                            Usuarios
                        </div>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <div
                            className={
                                "pestania " +
                                (tab === `Configuración`
                                    ? "border-b-4 border-orange-700 cursor-pointer h-9"
                                    : "text-" + "-600 bg-white cursor-pointer h-9")}
                            onClick={(e) => {e.preventDefault();handleConfiguracion();}}>
                            Configuración
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default function TabsShowEmpresa({tab, empresa}) {return (<> <Tabs tab={tab} empresa={empresa}/></>)}
