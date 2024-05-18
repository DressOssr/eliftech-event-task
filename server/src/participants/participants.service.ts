import {BadRequestException, Injectable} from '@nestjs/common';
import {ParticipantsDto} from "./dto/participants.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Participants} from "./participants.model";
import {EventsService} from "../events/events.service";

@Injectable()
export class ParticipantsService {
    constructor(
        @InjectModel(Participants)
        private participantsModel: typeof Participants,
        private eventsService: EventsService
    ) {
    }

    async create(dto: ParticipantsDto) {
        const event = await this.eventsService.findById(dto.eventId);
        event.participants.forEach(participant => {
            if (participant.email === dto.email) {
                throw new BadRequestException('Participant Email already exists');
            }
        })
        return await this.participantsModel.create(dto);
    }

    async getParticipantsByEventId(id: number) {
        return await this.participantsModel.findAll({where: {eventId: id}})
    }
}
