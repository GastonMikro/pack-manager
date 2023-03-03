import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

function FlashMessages() {
    const { exito, error } = usePage().props.flash;

    useEffect(() => {
        if (exito) {
            Swal.fire({
                icon: "success",
                title: exito ,
                showConfirmButton: true,
                confirmButtonColor: "#b03407",
                confirmButtonText: "Aceptar",
            });
        };
        if (error) {
            Swal.fire({
                icon: "error",
                title: error,
                showConfirmButton: true,
                confirmButtonColor: "#b03407",
                confirmButtonText: "Aceptar"
            });
        }
    }, [exito, error]);

    return (
        <></>
    );
}

export default FlashMessages;
