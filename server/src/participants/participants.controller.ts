import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ParticipantsDto} from "./dto/participants.dto";
import {EventsService} from "../events/events.service";
import {ParticipantsService} from "./participants.service";

@Controller('participants')
export class ParticipantsController {
    constructor(
        private participantsService: ParticipantsService
    ) {
    }

    @Post()
    async create(@Body() dto: ParticipantsDto) {
        return await this.participantsService.create(dto);
    }

    @Get('/:id')
    async getParticipantsByEventId(@Param('id') id: number){
        return await this.participantsService.getParticipantsByEventId(id);
    }
}
