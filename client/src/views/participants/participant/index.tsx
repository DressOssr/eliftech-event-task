import React from "react";

export interface ParticipantProps {
    fullName: string;
    email: string;
    dateOfBirth: string;
}
const Participant:React.FC<ParticipantProps> = ({fullName,email,dateOfBirth}) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 p-4 bg-white">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{fullName}</div>
                <p className="text-gray-700 text-base"><strong>Email:</strong> {email}</p>
                <p className="text-gray-700 text-base"><strong>Date of Birth:</strong> {dateOfBirth}</p>
            </div>
        </div>
    );
};

export default Participant;