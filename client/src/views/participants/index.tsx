import {useEffect, useState} from "react";
import {api} from "../../api/instance.ts";
import {useNavigate, useParams} from "react-router-dom";
import {EventWithParticipants} from "../../type/type";
import Participant from "./participant";
import Loader from "../../components/Loader/Loader.tsx";
import BackButton from "../../components/BackButton/BackButton.tsx";

const Participants = () => {
    const navigate = useNavigate();
    const {eventId} = useParams();
    const [data, setData] = useState<EventWithParticipants>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        setIsLoading(true)
        api.get<EventWithParticipants>(`/events/${eventId}`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader/>
            </div>
        )
    }
    return (
        <div className="container mx-auto my-8">
            <div className="flex items-center mb-8">
                <BackButton onClick={() => navigate(-1)}/>
                <h1 className="text-3xl font-bold text-center flex-grow">{data?.title}</h1>
            </div>
            {data?.participants.length === 0 ? (
                <p className="text-center text-gray-700">No participants available.</p>
            ) : (
                <div className="flex flex-wrap justify-center">
                    {data?.participants.map(participant => (
                        <Participant key={participant.id} {...participant} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Participants;