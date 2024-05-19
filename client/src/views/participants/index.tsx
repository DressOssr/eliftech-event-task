import {useEffect, useMemo, useState} from "react";
import {api} from "../../api/instance.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import {EventWithParticipants} from "../../type/type";
import Loader from "../../components/Loader/Loader.tsx";
import BackButton from "../../components/BackButton/BackButton.tsx";
import Participant from "./participant";

const Participants = () => {
    const navigate = useNavigate();
    const {eventId} = useParams();
    const [searchQuery, setSearchQuery] = useState<string>("");
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
    const filteredParticipants = useMemo(() => {
        const searcher = searchQuery.toLowerCase();
        return data?.participants.filter(({ fullName, email }) => {
            return fullName.toLowerCase().includes(searcher) || email.toLowerCase().includes(searcher);
        });

    }, [data?.participants, searchQuery]);
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
                <BackButton className="absolute" onClick={() => navigate(-1)}/>
                <h1 className="text-3xl font-bold text-center flex-grow ">{data?.title}</h1>
            </div>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search by email ar Full Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-80"
                />
            </div>
            {filteredParticipants?.length === 0 ? (
                <div className="flex justify-center flex-col">
                    <p className="text-center text-gray-700">No participants available.</p>
                    <Link className="hover:underline text-center" to={`/registration/${eventId}`}>Register</Link>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center">
                    {filteredParticipants?.map(participant => (
                        <Participant key={participant.id} {...participant} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Participants;