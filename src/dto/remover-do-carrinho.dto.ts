import { IsInt, IsNotEmpty } from 'class-validator';

export class IdCarrinhoDto {
    @IsNotEmpty({ message: 'O ID do carrinho não pode estar vazio.' })
    id: number;
    @IsNotEmpty({ message: 'O ID do usuario não pode estar vazio.' })
    usuario_id: number
}
