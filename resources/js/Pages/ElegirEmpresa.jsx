import React, { useState } from "react";
import { router } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";
import Select from "react-select";

export default function ElegirEmpresa() {
    const {empresas}=usePage().props
    const [empresa, setEmpresa] = useState("");

    empresas.map((empresa) => {
        empresa.label = empresa.razon_social
        empresa.value = empresa.id
        return empresa
    })
    function entrar() {router.get(route("dashboard",empresa))}

    return (
        <>
            <div className="flex flex-col justify-around items-center min-h-pack w-screen">
                <div className="ContenedorLogin">
                    <div>
                        <h1 className="mb-4 font-bold">Elegir Empresa:</h1>
                        <Select
                            defaultValue={empresas.find((empresa) => empresa.value === empresa)}
                            placeholder="Seleccionar"
                            name="empresa"
                            onChange={(option) =>setEmpresa(option.value)}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    '&:hover': { borderColor: '#b03407' },
                                    border: '1px solid lightgray', 
                                    boxShadow: "0px 4px 5px rgb(0 0 0 / 14%), 0px 1px 10px rgb(0 0 0 / 12%), 0px 2px 4px rgb(0 0 0 / 20%)"
                                }),
                            }}
                            className="my-2"
                            options={empresas}
                        />

                        <button
                            disabled={empresa == ""} 
                            className={empresa !==""?"btn-nuevo w-full mt-4":"btn-nuevo-disabled w-full mt-4"}
                            onClick={entrar}>
                            ENTRAR
                        </button>
                    </div>
                </div>

                <img src="/img/LogoPackManager.png" alt="" width="162px" height="54px" className="absolute bottom-0 pb-8"/>
            </div>
        </>
    );
}

