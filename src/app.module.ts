import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth/auth.guard';
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
        expiresIn: "20min"
      }
    })

  ],

  controllers: [],
  providers: [],
})

export class AppModule { }