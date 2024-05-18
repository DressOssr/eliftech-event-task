import {Module} from '@nestjs/common';
import {EventsService} from './events.service';
import {EventsController} from './events.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Events} from "./events.model";
import {Participants} from "../participants/participants.model";

@Module({
    imports: [
        SequelizeModule.forFeature([Events,Participants]),
    ],
    providers: [EventsService],
    controllers: [EventsController],
    exports: [EventsService]
})
export class EventsModule {
}
