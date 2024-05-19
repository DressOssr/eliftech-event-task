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

    async getAllEvents(offset: number, limit: number) {
        const {count: total, rows: events} = await this.eventsModel.findAndCountAll({offset, limit});
        return {total, events};
    }

    findById(eventId: number) {
        return this.eventsModel.findByPk(eventId, {include: {all: true}});
    }
}
