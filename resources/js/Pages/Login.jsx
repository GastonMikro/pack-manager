import React from "react";
import { router } from "@inertiajs/core";
import { useForm, usePage } from "@inertiajs/react";
import ErrorForm from "@/Components/ErrorForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
    
     const [parentRef] = useAutoAnimate()
    
    return (
        <>
            <div className="flex flex-col justify-around items-center h-screen w-screen">
                <div className="ContenedorLogin">
                    <form onSubmit={submit}>
                        <div ref={parentRef}>
                            <h3 className="font-bold text-start">Email</h3>
                            <input
                                name="email"
                                type="email"
                                className="input"
                                onChange={(e)=>setData("email", e.target.value)}
                                value={data.email}
                                required
                            />
                            <div className="w-full">{errors.email && <ErrorForm content={errors.email}/>}</div>
                        </div>
                        <div>
                            <h3 className="font-bold text-start pt-4">Contraseña</h3>
                            <input
                                name="password"
                                type="password"
                                className="input mb-4"
                                value={data.password}
                                onChange={(e) =>setData("password", e.target.value)}
                                required
                            />
                            <div className="w-full">{errors.password && <ErrorForm content={errors.password}/>}</div>
                        </div>
                        <button className="btn-nuevo w-full mt-4" type="submit" disabled={processing}>INGRESAR</button>
                    </form>
                </div>

                <img className="absolute bottom-0 pb-8" src="/img/LogoPackManager.png" alt="" width="162px" height="54px"/>
            </div>
        </>
    );
}
