import { Link, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { router } from "@inertiajs/core";
import Panel from "@/Layouts/Panel";
import FlashMessages from "@/Components/FlashMessages";
import Swal from 'sweetalert2';
import Breadcrumb from '@/Components/Breadcrumb';

export default function Index(){
    const {recibos, empresa_id,empresa_razon_social} = usePage().props

    const crumbs = [
        {
            crumb: empresa_razon_social,
            href: "",
        },
        {
            crumb: "Recibos",
            href: "",
        },
    ];

    const [reciboSeleccionado, setReciboSeleccionado] = useState("");

    function handleRecibo(e) {
        /* const reciboClick = recibos.find((recibo) =>recibo.id == e.target.closest("tr").getAttribute("data-id"));

        if (reciboClick === reciboSeleccionado) {
            setReciboSeleccionado("");
        } else {
            setReciboSeleccionado(reciboClick);
        } */
        if (reciboSeleccionado !== "") {
            setReciboSeleccionado("");
        } else {
            setReciboSeleccionado("a");
        }
    }

    function handleEliminar() {
        Swal.fire({
            title: 'ADVERTENCIA:',
            text: `Está por eliminar un recibo de sueldo. ¿Desea continuar?`,
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
           /*  if (result.isConfirmed) {
                e.preventDefault();
                Inertia.post(route("recibo.eliminarIndividual", {company_id:company_id, id:reciboSeleccionado?.id,}))} */
            })
            
        }

    return (
        <>  
        <FlashMessages/>
        <Breadcrumb crumbs={crumbs}/>   
                {/* <div className="m-4 font-bold">
                    <h1 className="text-2xl">Recibos</h1>
                    <h2 className="text-xl mt-2">Todos</h2>
                </div> */}

                <div className="table-container">
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th>Legajo</th>
                                <th>Nombre</th>
                                <th>Periodo</th>
                                <th>Haberes</th>
                                <th>Retenciones</th>
                                <th>No Remunerativo</th>
                                <th>Neto</th>
                                <th>Recibo</th>
                                <th>Ganancias</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr className="table-row" onClick={handleRecibo}>
                                <td>1</td>
                                <td>Gastón Duba</td>
                                <td>3/2023</td>
                                <td>1.229,96</td>
                                <td>159,89</td>
                                <td>13,95</td>
                                <td>1.114,02</td>
                                <td>
                                    {/* <Link href={route("recibo.descargar", {company_id: company_id, id:recibo.id})}> */}
                                    <img
                                        src="/img/Descargar.svg"
                                        alt="Descargar"
                                    />
                                    {/* </Link> */}
                                </td>
                                <td>
                                    {/* <Link href={route("recibo.descargarLiquidacionIG", {company_id: company_id, id:recibo.id})}> */}
                                    <img
                                        src="/img/Descargar.svg"
                                        alt="Descargar"
                                    />
                                    {/* </Link> */}
                                </td>
                                <td title="Pendiente Firma Empresa">
                                    <img
                                        src="/img/Pendiente-Firma.svg"
                                        alt="Pendiente Firma Empresa"
                                    />
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
        </>
    );
}

Index.layout = (page) => <Panel title="Recibos" children={page}/>;