
import React from "react";

const Modal = ({
    isOpen,
    title,
    children,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">
                        {title}
                    </h2>

                    <button onClick={onClose}>
                        X
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Modal;