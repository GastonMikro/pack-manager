import React, {useEffect, useState} from "react";
import { router } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";
import { usePrevious } from "react-use";
import pickBy from "lodash/pickBy";
import Search from "@/Components/Search";
import ShadeScreen from "./ShadeScreen";

function BuscarUsuario({setUsuarioSeleccionado,handleClick}) {
    const {filters,usuarios,empresa_id} = usePage().props

    //Búsqueda
    const [values, setValues] = useState({search: filters.search || "",});

    useEffect(() => {
        if (prevValues) {
            const query = Object.keys(pickBy(values)).length
                ? pickBy(values)
                : { remember: "forget" };
            router.get(route(route().current(),empresa_id), query, {
                replace: true,
                preserveState: true,
            });
        }
    }, [values]);

    const prevValues = usePrevious(values);
    function handleSearch(key, value) {
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }
    //

    return (
        <>
        <ShadeScreen handleClick={handleClick}/>
            <div className="modalbusqueda w-full px-8">
                <div className="flex flex-col items-start p-8 w-full">
                    <h3 className="font-bold">Búsqueda</h3>
                    <div className="w-1/3 mr-4">
                        <Search
                            placeholder="Buscar por nombre o C.U.I.L"
                            parentValues={values}
                            handleSearch={handleSearch}
                        />
                    </div>
                    <div className="table-container px-0">
                        <table className="table text-center">
                            <thead className="table-header">
                                <tr>
                                    <th>Nombre</th>
                                    <th>C.U.I.L</th>
                                </tr>
                            </thead>
                            <tbody>
                            {usuarios?.map(usuario =>
                                <tr
                                    onDoubleClick={(e)=>{setUsuarioSeleccionado(usuario), handleClick(e)}}
                                    className="table-row"
                                    key={usuario.id}
                                >
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.cuil}</td>
                                </tr>
                            )}
                            {usuarios?.length === 0 &&
                                <tr>
                                    <td colSpan="4" className="text-center font-bold">No se encontraron resultados</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex justify-end">
                        <button className="btn-rojo" onClick={handleClick}>Cancelar</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default BuscarUsuario;
