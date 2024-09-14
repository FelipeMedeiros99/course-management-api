import { IsString, IsNumber, IsUrl, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CursoDto {
    @IsString({ message: 'O nome deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
    @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres.' })
    @MaxLength(50, { message: 'O nome não pode ter mais de 50 caracteres.' })
    nome: string;

    @IsNotEmpty({ message: 'A URL da foto não pode estar vazia.' })
    @IsString({ message: 'A URL da foto deve ser uma string.' })
    @IsUrl({}, { message: 'A URL da foto deve ser válida.' })
    url_foto: string;

    @IsNumber({}, { message: 'O preço deve ser um número.' })
    @IsNotEmpty({ message: 'O preço não pode estar vazio.' })
    preco: number;

    @IsNumber({}, { message: 'O preço com desconto deve ser um número.' })
    @IsNotEmpty({ message: 'O preço com desconto não pode estar vazio.' })
    preco_com_desconto: number;

    @IsString({ message: 'A carga horária deve ser uma string.' })
    @IsNotEmpty({ message: 'A carga horária não pode estar vazia.' })
    carga_horaria: string;

    @IsString({ message: 'O conteúdo deve ser uma string.' })
    @IsNotEmpty({ message: 'O conteúdo não pode estar vazio.' })
    conteudo: string;
}
