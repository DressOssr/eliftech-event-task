import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import {SequelizeModule} from "@nestjs/sequelize";
import { EventsModule } from './events/events.module';
import {Events} from "./events/events.model";
import { ParticipantsModule } from './participants/participants.module';
import {Participants} from "./participants/participants.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Events,Participants],
      autoLoadModels: true,
      // synchronize: true,
      // sync: { force: true, alter: true }
    }),
    EventsModule,
    ParticipantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
