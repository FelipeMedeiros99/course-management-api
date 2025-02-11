import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { DatabaseModule } from './database/database.module';
import { CursoController } from './curso/curso.controller';
import { CursoService } from './curso/curso.service';
import { CarrinhoController } from './carrinho/carrinho.controller';
import { CarrinhoService } from './carrinho/carrinho.service';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService],
  // imports: [DatabaseModule, ConfigModule.forRoot({
  //   envFilePath: ['.env'],
  //   isGlobal: true
  // })],
  // controllers: [AppController, UserController, CursoController, CarrinhoController],
  // providers: [AppService, UserService, CursoService, CarrinhoService],
})
export class AppModule { }
