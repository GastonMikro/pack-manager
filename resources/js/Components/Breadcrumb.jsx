import React from "react";
import { Link } from '@inertiajs/react';

function Breadcrumb(props){

    function isLast(index){
        return index === props.crumbs.length - 1
    }

    return(
        <nav className="flex bg-gris-100 p-2" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1">
                <li className="inline-flex items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-bold hover:underline"
                    >
                        <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                        </svg>
                        Inicio
                    </Link>
                </li>
                {props.crumbs.map(({crumb,href}, ci) => {
                        const disabled = isLast(ci) ? 'disabled' : '';
                        return (
                            <li
                                key={ ci }
                                className="inline-flex items-center mx-0"
                            >
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"/>
                                </svg>
                                <Link href={href} className="inline-flex items-center text-sm font-bold hover:underline">
                                    { crumb }
                                </Link>
                            </li>
                        );
                    })
                }
            </ol>
        </nav>
    )
}

export default Breadcrumb
