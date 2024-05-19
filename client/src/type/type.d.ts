export interface Event{
    id:number;
    title:string;
    description:string;
    eventDate:string;
    organizer:string;
}

export interface Participant{
    id:number;
    fullName:string;
    email:string;
    dateOfBirth:string;
    heardAbout:string;
    eventId:number;
    createdAt:string;
}
export interface EventWithParticipants extends Event {
    participants: Participants;
}
export type Participants = Participant[];
export type Events = Event[];

export interface EventDto{
    events: Events;
    total: number;
}