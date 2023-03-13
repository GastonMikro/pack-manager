import React from 'react';
import { Link } from '@inertiajs/react';

const PageLink = ({ active, label, url }) => {
    if(label === '&laquo; Previous' || label === 'Next &raquo;'){
        return (
            <li>
                <Link className={(label === '&laquo; Previous') ? " border-slate-300 block bg-white py-2 px-3 ml-0 leading-tight border rounded-l-lg" : " border-slate-300 block py-2 px-3 ml-0 leading-tight border bg-white rounded-r-lg"} href={url} preserveState  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d={(label === '&laquo; Previous') ? "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" : "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"} clipRule="evenodd"/>
                    </svg>
                    <span className="sr-only" dangerouslySetInnerHTML={{__html: label}}/>
                </Link>
            </li>
        );
    }else{
        return (
            <li className={(active) ? "active-paginator" : ""}>
                <Link className=" py-2 px-3 leading-tight border border-slate-300 bg-white " href={url} preserveState  >
                    <span dangerouslySetInnerHTML={{__html: label}}/>
                </Link>
            </li>
        );
    }
};

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
    if(label === '&laquo; Previous' || label === 'Next &raquo;'){
        return (
            <li></li>
        );
    }else{
        return (
            <li>
                <div className="py-2 px-3 leading-tight border bg-white border-slate-300 font-bold"  >
                    <span dangerouslySetInnerHTML={{__html: label}}/>
                </div>
            </li>
        );
    }
};

export default ({ links = [] }) => {
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.length === 3) return null;

    return (
        <ul className="paginator inline-flex items-center bg-white -space-x-px border-slate-300 font-bold">
            {links.map(({ active, label, url }) => {
                return url === null ? (
                    <PageInactive key={label} label={label} />
                ) : (
                    <PageLink key={label} label={label} active={active} url={url} />
                );
            })}
        </ul>
    );
};
