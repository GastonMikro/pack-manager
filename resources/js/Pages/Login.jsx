import React from "react";
import { router } from "@inertiajs/core";
import { useForm, usePage } from "@inertiajs/react";
import ErrorForm from "@/Components/ErrorForm";

export default function Login() {
    const {errors}=usePage().props
    
    const { data, setData, processing, reset } = useForm({
        email: "",
        password: ""
    });

    function submit(e) {
        e.preventDefault();
        router.post(route("login"), data, {
            onError: () => reset("password"),
        });}

    return (
        <>
            <div className="flex flex-col justify-around items-center h-screen w-screen">
                <div className="ContenedorLogin">
                    <form onSubmit={submit}>
                        <div className="flex flex-col items-start">
                            <h3 className="font-bold">Email</h3>
                            <input
                                name="email"
                                type="text"
                                className="input"
                                onChange={(e)=>setData("email", e.target.value)}
                                value={data.email}
                            />
                            <div className="w-full">{errors.email && <ErrorForm content={errors.email}/>}</div>
                        </div>
                        
                        <div className="flex flex-col items-start py-4">
                        <h3 className="font-bold">Contraseña</h3>
                        <input
                            name="password"
                            type="Password"
                            className="input"
                            value={data.password}
                            onChange={(e) =>setData("password", e.target.value)}
                        />
                        <div className="w-full">{errors.password && <ErrorForm content={errors.password}/>}</div>
                        </div>

                        <button className="btn-nuevo w-full" type="submit" disabled={processing}>INGRESAR</button>
                    </form>
                    
                </div>

                <img className="absolute bottom-0 pb-8" src="/img/LogoPackManager.png" alt="" width="162px" height="54px"/>
            </div>
        </>
    );
}
