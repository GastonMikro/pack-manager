import React from "react";
import Panel from "@/Layouts/Panel";
import { Link, useForm, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/core";
import ErrorForm from "@/Components/ErrorForm";
import FlashMessages from "@/Components/FlashMessages";
import Breadcrumb from '@/Components/Breadcrumb';

export default function Importar() {
    const{empresa_id, errors,empresa_razon_social}= usePage().props

    const crumbs = [
        {
            crumb: empresa_razon_social,
            href: "",
        },
        {
            crumb: "Recibos",
            href: route('index_recibos',empresa_id),
        },
        {
            crumb: "Generación",
            href: "",
        },
    ];
    
    const { data, setData } = useForm({
        dato_fijo: ""
    })

    function handleImportar(e) {
        e.preventDefault();
       /*  router.post(route("recibo.importar", empresa_id), data) */
    }

    return (
        <>
        <FlashMessages/>
        <Breadcrumb crumbs={crumbs}/>   
            {/* <div className="m-4 items-center font-bold">
                <h1 className="text-2xl">Recibos</h1>
                <h2 className="text-xl mt-2">Generación</h2>
            </div> */}
            <div className="titulo mt-4"><h3>Para generar los recibos de sueldo ingrese el dato fijo correspondiente al periodo que quiera generar.</h3></div>
            <div className="form-tres">
                <div className="w-1/2 mb-2">
                    <button className="btn-verde" onClick={handleImportar}>Importar</button>
                    <Link href={route("dashboard", empresa_id)}>
                        <button className="btn-rojo ml-2">Cancelar</button>
                    </Link>
                </div>
                <label className="w-1/2 mb-2">Dato Fijo</label>
                <input
                    value={data.dato_fijo}
                    name="dato_fijo"
                    onChange={(e)=>setData("dato_fijo", e.target.value)}
                    type="number"
                    className="input-fijo w-1/2 mb-2"
                />
                <div className="w-1/2">{errors.dato_fijo && <ErrorForm content={errors.dato_fijo}/>}</div>
            </div>
        </>
    );
}

Importar.layout = (page) => <Panel title="Importar" children={page}/>;
