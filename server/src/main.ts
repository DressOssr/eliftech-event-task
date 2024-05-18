import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from "process";

async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    await app.listen(PORT, () => console.log(`Server Start on ${PORT}`));
}

bootstrap();
