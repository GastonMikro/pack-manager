import React, { useState } from "react";
import Panel from "@/Layouts/Panel";
import { Link, useForm, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/core";
import Select from "react-select";
import Swal from "sweetalert2";
import FlashMessages from "@/Components/FlashMessages";
import Breadcrumb from '@/Components/Breadcrumb';

export default function Autorizar() {
    const { empresa_id, datosFijos,empresa_razon_social } = usePage().props;

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
            crumb: "Autorizar",
            href: "",
        },
    ]

    const { data, setData } = useForm({
        dato_fijo: "",
    })

    const [continuar, setContinuar] = useState(false)

    function handleFirmar() {
        Swal.fire({
            title: "ADVERTENCIA:",
            text: `Está por firmar todos los recibos correspondientes al dato fijo. Por favor controle bien los mismos, una vez firmados no podrán ser eliminados. ¿Desea continuar?`,
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                e.preventDefault();
                /*  router.post(route("firmar_recibo", empresa_id));*/
            }})}

    function handleContinuar() {
        /* router.post(route("recibo.firmaEmpleador",{empresa: empresa_id,dato_fijo: data.dato_fijo})) */
        setContinuar(true);}

   /*  const optionsdatosfijos = datosFijos.map((dato) => {return { value: dato.id, label: dato.id }}) */

    return (
        <>
        <FlashMessages/>
        <Breadcrumb crumbs={crumbs}/>
            {/* <div className="m-4 items-center font-bold">
                <h1 className="text-2xl">Recibos</h1>
                <h2 className="text-xl mt-2">Autorizar Recibos</h2>
            </div> */}

            {!continuar && (
                <>
                    <div className="titulo mt-4"><h3>Seleccione el dato fijo correspondiente a la liquidación que desea firmar.</h3></div>
                    <div className="form-tres">
                        <div className="w-1/2 mb-2">
                            <button className="btn-verde"onClick={handleContinuar}>Continuar</button>
                            <Link href={route("dashboard",empresa_id )}>
                                <button className="btn-rojo ml-4">Cancelar</button>
                            </Link>
                        </div>
                        <label className="w-1/2 my-2">Dato Fijo</label>
                        <div className="flex justify-around w-full">
                            <Select
                                value={data.dato_fijo}
                                placeholder="Seleccionar"
                                name="dato_fijo"
                                onChange={(option) =>setData("dato_fijo", option.value)}
                                className="w-1/2"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        "&:hover": {
                                            borderColor: "#b03407",
                                        },
                                        border: "1px solid lightgray",
                                        boxShadow:
                                            "0px 4px 5px rgb(0 0 0 / 14%), 0px 1px 10px rgb(0 0 0 / 12%), 0px 2px 4px rgb(0 0 0 / 20%)",
                                    }),
                                }}
                            /*     options={optionsdatosfijos} */
                            />
                        </div>
                    </div>
                </>
            )}
            {continuar && (
                <>
                    <div className="flex flex-col justify-between w-full">
                        <div><button className="btn-nuevo ml-4"onClick={handleFirmar}>Firmar</button></div>
                        <p className="ml-4 mt-2">
                            <strong>IMPORTANTE:</strong> Usted esta porfirmar el dato fijo:{" "}
                            <strong>2 - HABERES FEBRERO 2021.</strong> Por favor controle todos los recibos antes de firmar.
                        </p>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Legajo</th>
                                    <th>Nombre</th>
                                    <th>Dato Fijo</th>
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
                                <tr>
                                    <td>1</td>
                                    <td>Scott , Michael Gary</td>
                                    <td>2</td>
                                    <td>2/2021</td>
                                    <td>203.530,00 </td>
                                    <td>72.964,65</td>
                                    <td>0,65</td>
                                    <td>130.566,00</td>
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
                                <tr>
                                    <td>2</td>
                                    <td>Schrute , Dwigth Kurt</td>
                                    <td>2</td>
                                    <td>2/2021</td>
                                    <td>71.958,33 </td>
                                    <td>12.232,92</td>
                                    <td>0,59</td>
                                    <td>59.726,00</td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargar/2/12"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td></td>
                                    <td title="Pendiente Firma Empresa">
                                        <img
                                            src="/img/Pendiente-Firma.svg"
                                            alt="Pendiente Firma Empresa"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Halpert , James</td>
                                    <td>2</td>
                                    <td>2/2021</td>
                                    <td>82.345,00 </td>
                                    <td>13.998,65</td>
                                    <td>0,65</td>
                                    <td>68.347,00</td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargar/2/13"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td></td>
                                    <td title="Pendiente Firma Empresa">
                                        <img
                                            src="/img/Pendiente-Firma.svg"
                                            alt="Pendiente Firma Empresa"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Beesly , Pamela</td>
                                    <td>2</td>
                                    <td>2/2021</td>
                                    <td>68.063,33 </td>
                                    <td>11.570,77</td>
                                    <td>0,44</td>
                                    <td>56.493,00</td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargar/2/14"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td></td>
                                    <td title="Pendiente Firma Empresa">
                                        <img
                                            src="/img/Pendiente-Firma.svg"
                                            alt="Pendiente Firma Empresa"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Bratton , Creed</td>
                                    <td>2</td>
                                    <td>2/2021</td>
                                    <td>86.240,00 </td>
                                    <td>14.660,80</td>
                                    <td>0,80</td>
                                    <td>71.580,00</td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargar/2/15"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td></td>
                                    <td title="Pendiente Firma Empresa">
                                        <img
                                            src="/img/Pendiente-Firma.svg"
                                            alt="Pendiente Firma Empresa"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Martin , Angela</td>
                                    <td>2</td>
                                    <td>2/2021</td>
                                    <td>159.670,00 </td>
                                    <td>48.407,81</td>
                                    <td>0,81</td>
                                    <td>111.263,00</td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargar/2/16"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargarLiquidacionIG/2/16"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td title="Pendiente Firma Empresa">
                                        <img
                                            src="/img/Pendiente-Firma.svg"
                                            alt="Pendiente Firma Empresa"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>Malone , Kevin</td>
                                    <td>2</td>
                                    <td>2/2021</td>
                                    <td>159.670,00 </td>
                                    <td>62.829,15</td>
                                    <td>0,15</td>
                                    <td>96.841,00</td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargar/2/17"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargarLiquidacionIG/2/17"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td title="Pendiente Firma Empresa">
                                        <img
                                            src="/img/Pendiente-Firma.svg"
                                            alt="Pendiente Firma Empresa"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>Flenderson , Toby H.</td>
                                    <td>2</td>
                                    <td>2/2021</td>
                                    <td>107.650,00 </td>
                                    <td>30.764,57</td>
                                    <td>0,57</td>
                                    <td>76.886,00</td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargar/2/18"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargarLiquidacionIG/2/18"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td title="Pendiente Firma Empresa">
                                        <img
                                            src="/img/Pendiente-Firma.svg"
                                            alt="Pendiente Firma Empresa"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>Bernard , Andy</td>
                                    <td>2</td>
                                    <td>2/2021</td>
                                    <td>221.266,67 </td>
                                    <td>102.067,18</td>
                                    <td>0,51</td>
                                    <td>119.200,00</td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargar/2/19"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargarLiquidacionIG/2/19"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td title="Pendiente Firma Empresa">
                                        <img
                                            src="/img/Pendiente-Firma.svg"
                                            alt="Pendiente Firma Empresa"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>Hudson , Stanley</td>
                                    <td>2</td>
                                    <td>2/2021</td>
                                    <td>82.345,00 </td>
                                    <td>13.998,65</td>
                                    <td>0,65</td>
                                    <td>68.347,00</td>
                                    <td>
                                        <a
                                            href="https://www.franvillada.com/recibo/descargar/2/20"
                                            target="_blank"
                                        >
                                            <img
                                                src="/img/Descargar.svg"
                                                alt="Descargar"
                                            />
                                        </a>
                                    </td>
                                    <td></td>
                                    <td title="Pendiente Firma Empresa">
                                        <img
                                            src="/img/Pendiente-Firma.svg"
                                            alt="Pendiente Firma Empresa"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot className="border-t border-black">
                                <tr>
                                    <td colSpan="4">
                                        <strong>Totales</strong>
                                    </td>
                                    <td>1.242.738,33</td>
                                    <td>383.495,15</td>
                                    <td>5,82</td>
                                    <td>859.249,00</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </>
            )}
        </>
    );
}

Autorizar.layout = (page) => (<Panel title="Recibos Autorización" children={page}/>);
