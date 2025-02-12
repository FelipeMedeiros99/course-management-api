import { IsString, IsNumber, IsUrl, MinLength, MaxLength, IsNotEmpty, IsInt } from 'class-validator';

export class CourseDataDto {
    @IsString({ message: 'O campo name deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo name é obrigatório.' })
    @MinLength(2, { message: 'O name deve ter pelo menos 2 caracteres.' })
    @MaxLength(200, { message: 'O name não pode ter mais de 200 caracteres.' })
    name: string;

    @IsNotEmpty({ message: 'O campo url não pode estar vazia.' })
    @IsString({ message: 'A url da foto deve ser uma string.' })
    @IsUrl({}, { message: 'A url da foto deve ser válida.' })
    url: string;

    @IsNumber({}, { message: 'O price deve ser um número.' })
    @IsNotEmpty({ message: 'O campo price é obrigatório.' })
    price: number;

    @IsNumber({}, { message: 'O descountedPrice com desconto deve ser um número.' })
    @IsNotEmpty({ message: 'O campo descountedPrice com desconto é obrigatório.' })
    descountedPrice: number;

    @IsNumber({} ,{ message: 'A workload (carga horária) deve ser em horas. Ex: 1.5' })
    @IsNotEmpty({ message: 'O campo workload (carga horária) não pode estar vazia.' })
    workload: number;

    @IsString({ message: 'O content deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo content é obrigatório.' })
    content: string;
}



export class EditCourseDto {
    @IsInt({message: "O id deve ser um inteiro"})
    @IsNotEmpty({message: "O campo id é obrigatório"})
    id: number;
    
    @IsString({ message: 'O name deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo name não pode estar vazio.' })
    @MinLength(2, { message: 'O name deve ter pelo menos 2 caracteres.' })
    @MaxLength(200, { message: 'O name não pode ter mais de 200 caracteres.' })
    name: string;

    @IsNotEmpty({ message: 'A campo url da foto não pode estar vazia.' })
    @IsString({ message: 'A url da foto deve ser uma string.' })
    @IsUrl({}, { message: 'A url da foto deve ser válida.' })
    url: string;

    @IsNumber({}, { message: 'O price deve ser um número.' })
    @IsNotEmpty({ message: 'O campo price não pode estar vazio.' })
    price: number;

    @IsNumber({}, { message: 'O descountedPrice deve ser um número.' })
    @IsNotEmpty({ message: 'O campo descountedPrice não pode estar vazio.' })
    descountedPrice: number;

    @IsNumber({} ,{ message: 'O workload (carga horária) deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo workload (carga horária) não pode estar vazia.' })
    workload: number;

    @IsString({ message: 'O content deve ser uma string.' })
    @IsNotEmpty({ message: 'O campo content não pode estar vazio.' })
    content: string;
}
