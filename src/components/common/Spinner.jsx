import React from "react";

export function Spinner () {
    return (
        <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2"></div>
        </div>
    );
};

export default Spinner;
