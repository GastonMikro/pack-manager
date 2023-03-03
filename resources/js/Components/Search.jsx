import React from 'react';

export default function Search({placeholder,parentValues,handleSearch,disabled}) {
    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;

        handleSearch(key,value)
    }

    return (
        <input
            className="input"
            autoComplete="off"
            type="search"
            name="search"
            value={parentValues.search || ""}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            style={{
                height: "42.1px"
            }}
        />
    )
}
