import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {EventDto} from "./dto/event.dto";
import {EventsService} from "./events.service";

@Controller('events')
export class EventsController {
    constructor(
        private eventsService: EventsService
    ) {
    }

    @Post()
    async createEvents(@Body() dto: EventDto[]) {
        return await this.eventsService.createEvents(dto);
    }

    @Get()
    async getAllEvents() {
        return this.eventsService.getAllEvents();
    }

    @Get("/:id")
    async getEventById(@Param("id") id: number) {
        return this.eventsService.findById(id);
    }
}