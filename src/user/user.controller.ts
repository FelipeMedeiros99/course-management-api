import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { SalvarUsuarioDto } from 'src/dto/salvar-usuario.dto';


@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("login")
    @HttpCode(HttpStatus.ACCEPTED)
    async loginUser(@Body() dadosRecebidos: SalvarUsuarioDto) {
        try {
            return await this.userService.loginUser(dadosRecebidos);
        }catch (error) {
            
            throw new Error('Erro ao criar usuário: ' + error.message);
        }
    }
}



