
import Panel from '@/Layouts/Panel';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
 const {empresas, empresa_id}=usePage().props

 let empresa=empresas.find(e=>e.id==empresa_id).razon_social
    return (
        <div className="py-12 w-full flex flex-col justify-center items-center">  

        <h1 className='font-bold capitalize text-2xl'>{empresa}</h1>        
            <img
                src="/img/LogoPackManager.png"
                alt=""
                width="420px"
                height="138px"
                className='pt-32'
            />
        </div>
    );
}

Dashboard.layout = (page) => <Panel title="Inicio" children={page}/>;
