
import React from "react";

interface BackButtonProps {
    onClick: () => void;
}
const BackButton:React.FC<BackButtonProps> = ({onClick}) => {
    return (
        <button onClick={onClick}
                className="text-blue-500 hover:text-blue-700 focus:outline-none inline"
        >
            &larr; Back
        </button>
    );
};

export default BackButton;