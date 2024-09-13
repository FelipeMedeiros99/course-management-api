import { IsString, IsInt, IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';


export class SalvarUsuarioDto {
    @IsString()
    @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres.' })
    @MaxLength(50, { message: 'O nome não pode ter mais de 50 caracteres.' })
    nome: string;
}
  