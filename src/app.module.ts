import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PrismaService } from './config/prisma.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_PASSWORD!,
      signOptions: {
        expiresIn: "1min"
      }
    })
  
  ],
    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
