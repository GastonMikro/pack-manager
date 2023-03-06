import React from "react";
import { Link } from "@inertiajs/react";

export default function PaginaNoEncontrada() {

    return (
        <>
            <div className="flex flex-col justify-around items-center h-screen w-screen">
                <div className="ContenedorLogin">
                    <h1 className="text-4xl font-bold mt-4">404 - Página no encontrada</h1>
                    {/* <Link href={route('dashboard')}>
                        <button className="btn-nuevo mt-8">VOLVER AL INICIO</button>
                    </Link> */}
                </div>

                <img className="absolute top-0 pt-8" src="/img/LogoPackManager.png" alt="" width="190px" height="63px"/>
            </div>
        </>
    );
}
