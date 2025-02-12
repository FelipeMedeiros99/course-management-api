import { IsString, IsNumber, IsUrl, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CourseDataDto {
    @IsString({ message: 'O nome deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
    @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres.' })
    @MaxLength(200, { message: 'O nome não pode ter mais de 200 caracteres.' })
    name: string;

    @IsNotEmpty({ message: 'A URL da foto não pode estar vazia.' })
    @IsString({ message: 'A URL da foto deve ser uma string.' })
    @IsUrl({}, { message: 'A URL da foto deve ser válida.' })
    url: string;

    @IsNumber({}, { message: 'O preço deve ser um número.' })
    @IsNotEmpty({ message: 'O preço não pode estar vazio.' })
    price: number;

    @IsNumber({}, { message: 'O preço com desconto deve ser um número.' })
    @IsNotEmpty({ message: 'O preço com desconto não pode estar vazio.' })
    descontedPrice: number;

    @IsString({ message: 'A carga horária deve ser em horas. Ex: 1.5' })
    @IsNotEmpty({ message: 'A carga horária não pode estar vazia.' })
    workload: number;

    @IsString({ message: 'O conteúdo deve ser uma string.' })
    @IsNotEmpty({ message: 'O conteúdo não pode estar vazio.' })
    content: string;
}
