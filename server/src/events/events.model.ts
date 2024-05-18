import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Participants} from "../participants/participants.model";

interface EventsCreationAttrs {
    title: string;
    description: string;
    eventDate: string;
    organizer: string;
}

@Table({tableName: "events"})
export class Events extends Model<Events, EventsCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    description: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    eventDate: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    organizer: string;

    @HasMany(()=>Participants)
    participants:Participants[]
}