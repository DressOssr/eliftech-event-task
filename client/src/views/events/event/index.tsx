import React from "react";
import {Link} from "react-router-dom";

interface EventProps {
    id:number
    title: string;
    description: string;
    event_date: string;
    organizer: string;
}

const Event: React.FC<EventProps> = ({id,title, description, event_date, organizer}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-2">{description}</p>
            <p className="text-gray-500 mb-2">{event_date}</p>
            <p className="text-gray-500 mb-2">{organizer}</p>
            <div className="flex justify-between">
                <Link className="hover:underline" to={`/registration/${id}`}>Register</Link>
                <Link className="hover:underline" to={`/participants/${id}`}>View</Link>
            </div>
        </div>
    );
};

export default Event;