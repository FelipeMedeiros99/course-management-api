import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto, SignUpUserDto } from 'src/dto/auth.dto';
// import { SalvarUsuarioDto } from 'src/dto/salvar-usuario.dto';


@Controller()
export class UserController {
    constructor(private readonly authService: AuthService) { }

    @Post("sign-in")
    @HttpCode(200)
    async signIn(@Body() userDataSignin: SignInUserDto) {
      return await this.authService.signinUser(userDataSignin);
    }

    @Post("sign-up")
    @HttpCode(201)
    async signUp(@Body() userDataSignup: SignUpUserDto){
      return await this.authService.signUpUser(userDataSignup)
    }
}



