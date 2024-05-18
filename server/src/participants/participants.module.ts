import { Module } from '@nestjs/common';
import { ParticipantsController } from './participants.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Events} from "../events/events.model";
import {Participants} from "./participants.model";
import {ParticipantsService} from "./participants.service";
import {EventsModule} from "../events/events.module";

@Module({
  imports:[
    SequelizeModule.forFeature([Participants,Events]),
      EventsModule
  ],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
})
export class ParticipantsModule {}
