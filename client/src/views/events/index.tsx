import {useEffect, useState} from 'react';
import {api} from "../../api/instance.ts";
import {EventDto, Events as EventsType} from "../../type/type";
import Event from './event/index'
import Loader from "../../components/Loader/Loader.tsx";


const sortOptions = [
    {value: "title", label: "Title"},
    {value: "eventDateNewer", label: "Event Date (Newer)"},
    {value: "eventDateLater", label: "Event Date (Later)"},
    {value: "organizer", label: "Organizer"}
];
const Events = () => {

    const [events, setEvents] = useState<EventsType>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [sortOption, setSortOption] = useState<string>('title');
    const [currentOffset, setCurrentOffset] = useState(0);
    useEffect(() => {
        setIsLoading(true)
        api.get<EventDto>(`/events`, {
            params: {
                limit: 12,
                offset: currentOffset
            }
        }).then((res) => {
            setEvents(prev => [...prev, ...res.data.events])
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [currentOffset])


    useEffect(() => {

        document.addEventListener('scroll', scrollHandler)
        return () => document.removeEventListener('scroll', scrollHandler)
    }, [currentOffset])

    const scrollHandler = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight) {
            setCurrentOffset(prev => prev + 12);
        }
    }

    const sortHandle = (option: string) => {
        setSortOption(option);
    };

    const getSortedEvents = () => {
        const sorted = [...events];
        switch (sortOption) {
            case 'title':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'eventDateNewer':
                return sorted.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
            case 'eventDateLater':
                return sorted.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
            case 'organizer':
                return sorted.sort((a, b) => a.organizer.localeCompare(b.organizer));
            default:
                return events;
        }
    }
    return (
        <div className="container mx-auto p-2">
            <div className="flex justify-center items-center flex-col">
                <h1 className="text-5xl font-bold mb-4 ">Events</h1>
                <div className="flex  items-center mb-4">
                    <label htmlFor="sort" className="mr-2 text-2xl">Sort by:</label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={(e) => sortHandle(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded"
                    >
                        {sortOptions.map((option) =>
                            <option key={option.value} value={option.value}>{option.label}</option>)
                        }
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {getSortedEvents().map((event) => (
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
            {isLoading &&
                <div className="flex justify-center p-6m m-6">
                    <Loader/>
                </div>
            }
        </div>
    );
};

export default Events;