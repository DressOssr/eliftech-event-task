import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Events} from "./events.model";
import {EventDto} from "./dto/event.dto";

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Events)
        private eventsModel: typeof Events,
    ) {
    }

    async createEvents(dto: EventDto[]) {
        return await this.eventsModel.bulkCreate(dto);
    }

    async getAllEvents() {
        return await this.eventsModel.findAll();
    }

    findById(eventId: number) {
        return this.eventsModel.findByPk(eventId, {include: {all: true}});
    }
}
