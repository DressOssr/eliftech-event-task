import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
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
    async getAllEvents(@Query('offset') offset: number, @Query('limit') limit: number) {
        return this.eventsService.getAllEvents(offset, limit);
    }

    @Get("/:id")
    async getEventById(@Param("id") id: number) {
        return this.eventsService.findById(id);
    }
}