import React from "react";
export function Input ({
    label,
    type ='text',
    name,
    email,
    value,
    onchange,
    placeholder,
    required = false,
}) {
    return (
        <div className="mb-4">
            {label && (
                <label className="block mb-1 font-medium">
                    {label}
                </label>
            )}
            <input 
            type={type}
            name={name}
            value={email}
            onChange={onchange}
            placeholder={placeholder}
            required={required}
            className="w-full border rounded px-3 py-2"
            />
        </div>
    );
};
export default Input;