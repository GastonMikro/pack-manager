import React from "react";
import Panel from "@/Layouts/Panel";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import FlashMessages from "@/Components/FlashMessages";
import Breadcrumb from "@/Components/Breadcrumb";

export default function Autenticacion() {
    const { QR_Image, secret,empresa_razon_social } = usePage().props;

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
            crumb: "Autenticación de dos factores",
            href: "",
        },
    ]

    function continuar(){
        Swal.fire({
            title: 'ADVERTENCIA:',
            text: `Antes de continuar asegúrese de haber escaneado el codigo QR con la aplicación de Google Authenticator o bien haber linkeado mediante el código, sino no podrá obtener su código temporal para firmar recibos. ¿Desea continuar?`,
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
                e.preventDefault();
               /*  Inertia.post(route("", company_id)); */
            }})}

 /*    var svg = QR_Image.slice(38);
    var mysvg = new Image();
    mysvg.src = "data:image/svg+xml," + encodeURIComponent(svg); */

    return (
        <>  <FlashMessages/>
            <Breadcrumb crumbs={crumbs}/>
            <div className="m-4 items-center">
            {/* <div>
                    <p>Usted ya dio de alta la autenticación de doble factor.</p>
                    <p><strong>IMPORTANTE:</strong> Si perdió su celular o el acceso a GooglemAuthenticator, contacte al proveedor del servicio para poder realizar el proceso nuevamente.</p>
                </div> */}
                <div className="bg-white border-2 border-solid h-8 shadow shadow-gray-500 flex items-center p-2">
                    <h2>Para poder firmar recibos de sueldo será necesario dar de alta la autenticación de doble factor. Siga los pasos a continuación:</h2>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <h3>Deberá contar con un dispositivo con la aplicación Google Authenticator.</h3>
                <h3 className=" my-4">Ingrese a la aplicación y escanee el codigo QR.</h3>
                {/*    <img src={mysvg.src}/> */}
                <h3 className="my-4">Si no puede asociar su cuenta mediante el codigo QR, ingrese manualmente el siguiente código:{/* {secret} */}</h3>
                <h3>Al finalizar podrá ver en la aplicación su cuenta asociada a la página web. Para confirmar los cambios presione Continuar.</h3>
            </div>

            <div className="form-tres my-4"><button className="btn-nuevo" onClick={continuar}>Continuar</button></div>
        </>
    );
}

Autenticacion.layout = (page) => (<Panel title="Autenticación" children={page}/>);
