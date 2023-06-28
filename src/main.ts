import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
like express
how to generate module 
nest g module name
controller xu ly request
service phuc vu cho controler
prisma module
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
