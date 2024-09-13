import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service'; 
import { UserController } from './user/user.controller'; 
import { DatabaseModule } from './database/database.module'; 
import { CursoController } from './curso/curso.controller';
import { CursoService } from './curso/curso.service';


@Module({
  imports: [DatabaseModule], 
  controllers: [AppController, UserController, CursoController], 
  providers: [AppService, UserService, CursoService],
})
export class AppModule {}
