import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UserModule } from './auth/auth.module';
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
    
  controllers: [],
  providers: [],
})
export class AppModule { }
