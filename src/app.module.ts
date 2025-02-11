import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PrismaService } from './config/prisma.service';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    })],
    
  controllers: [AppController, PrismaService],
  providers: [AppService],
})
export class AppModule { }
