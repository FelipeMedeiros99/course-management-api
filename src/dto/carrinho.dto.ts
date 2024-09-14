import { IsInt, IsNotEmpty } from 'class-validator';

export class CarrinhoDto {
    @IsInt({ message: 'O ID do usuário deve ser um número inteiro.' })
    @IsNotEmpty({ message: 'O ID do usuário não pode estar vazio.' })
    usuario_id: number;

    @IsInt({ message: 'O ID do produto deve ser um número inteiro.' })
    @IsNotEmpty({ message: 'O ID do produto não pode estar vazio.' })
    curso_id: number;
}
