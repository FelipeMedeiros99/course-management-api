import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth/auth.middleware';
import { CourseModule } from './courses/course.module';


@Module({
  imports: [
    AuthModule,
    CourseModule,
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

  controllers: [],
  providers: [],
})
export class AppModule { }
