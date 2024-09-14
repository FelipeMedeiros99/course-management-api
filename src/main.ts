import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"

dotenv.config()
const {PORT} = process.env

console.log(PORT)
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.enableCors();
  await app.listen(PORT||3000, ()=>{console.log("servidor funcionando na porta ", process.env.PORT)});
}
bootstrap();
