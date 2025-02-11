import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"

dotenv.config()

const {PORT} = process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true,
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  // }));
  app.enableCors();
  await app.listen(PORT||5000, ()=>{console.log("server running")});
}
bootstrap();
