
import Panel from '@/Layouts/Panel';
import { Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
 const {empresa}=usePage().props

    return (
        <div className="py-12 w-full flex flex-col items-center">  
            <div className='flex justify-center mb-16 w-full px-4'>
                {empresa.logo_file_path?
                <img src={empresa.logo_file_path} alt="Logo Empresa" className="w-32 h-auto"/>:
                <h1 className='font-bold capitalize text-4xl'>{empresa.razon_social}</h1>  
                }
            </div>

            <div className='flex w-full'>
                <div className="dashboard-card w-1/3">
                    <h3 className="text-start mb-4 text-xl font-bold">Usuarios ({(empresa.usuarios.length)})</h3>
                    <div className="w-full max-h-40 overflow-y-auto">
                        {empresa.usuarios.map(usuario=>
                    <div className="listadash" key={usuario.id}>
                        <p>{usuario.nombre}</p>
                            <Link href={route("ver_usuario",{empresa:empresa, usuario:usuario.id})}>
                        <p className="font-bold hover:underline underline-offset-4 mr-2">Ver</p>
                            </Link>
                    </div>)}
                    </div>
                </div>
                <div className="dashboard-card w-1/3">
                    <h3 className="text-start mb-4 text-xl font-bold">Legajos ({(empresa.legajos.length)})</h3>
                    <div className="w-full max-h-40 overflow-y-auto">
                        {empresa.legajos.map(legajo=>
                    <div className="listadash" key={legajo.id}>
                        <p>{legajo.nombre}</p>
                            <Link href={route("ver_legajo",{empresa:empresa, legajo:legajo.id})}>
                        <p className="font-bold hover:underline underline-offset-4 mr-2">Ver</p>
                            </Link>
                    </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <Panel title="Inicio" children={page}/>;
