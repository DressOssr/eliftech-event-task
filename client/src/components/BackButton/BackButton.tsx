import React from "react";

interface BackButtonProps {
    onClick: () => void;
    className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({onClick, className}) => {
    return (
        <button onClick={onClick}
                className={`text-blue-500 hover:text-blue-700 focus:outline-none inline ${className}`}
        >
            &larr; Back
        </button>
    );
};

export default BackButton;