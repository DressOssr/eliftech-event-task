import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Events} from "../events/events.model";

interface ParticipantsCreationAttrs {
    name: string;
    email: string;
    birthday: string;
    eventId: number;
}

@Table({tableName: "participants"})
export class Participants extends Model<Participants, ParticipantsCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    fullName: string

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    dateOfBirth: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    heardAbout: string;

    @ForeignKey(() => Events)
    @Column
    eventId: number;

    @BelongsTo(() => Events)
    event: Events;
}