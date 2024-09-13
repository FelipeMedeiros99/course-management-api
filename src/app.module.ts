import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service'; 
import { UserController } from './user/user.controller'; 
import { DatabaseModule } from './database/database.module'; 


@Module({
  imports: [DatabaseModule], 
  controllers: [AppController, UserController], 
  providers: [AppService, UserService],
})
export class AppModule {}
