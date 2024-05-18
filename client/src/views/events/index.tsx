import {useEffect, useState} from 'react';
import {api} from "../../api/instance.ts";
import {Events as EventsType} from "../../type/type";
import Event from './event/index'
import Loader from "../../components/Loader/Loader.tsx";

const Events = () => {

    const [events, setEvents] = useState<EventsType>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        setIsLoading(true)
        api.get<EventsType>('/events').then((res) => {
            setEvents(res.data)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])
    return (
        <div className="container mx-auto ">
            {isLoading
                ? <div className="flex justify-center p-6m m-6">
                    <Loader/>
                </div>
                : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                    {events.map((event) => (
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            description={event.description}
                            event_date={event.eventDate}
                            organizer={event.organizer}
                        />
                    ))}
                </div>
            }
        </div>
    );
};

export default Events;