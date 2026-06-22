import React from "react";

export function Button ({
    Children,
    type = 'button',
    onClick,
    className = '',
    disabled = false,
}) {
    return (
        <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded font-medium transition ${className}`}>
            Enfant
        </button>
    );
};

export default Button;