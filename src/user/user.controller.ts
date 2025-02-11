import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
// import { SalvarUsuarioDto } from 'src/dto/salvar-usuario.dto';


@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("sign-in")
    @HttpCode(200)
    async signIn(@Body() userDataLogin: User) {
      return await this.userService.signinUser(userDataLogin);
    }

    @Post("sign-up")
    @HttpCode(201)
    async signUp(){
      
    }
}



