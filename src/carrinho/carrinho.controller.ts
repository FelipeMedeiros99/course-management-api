import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CarrinhoService } from "./carrinho.service";
import { CarrinhoDto } from "src/dto/carrinho.dto";

@Controller()
export class CarrinhoController{
    constructor(private readonly carrinhoService:CarrinhoService){};
    
    @Post("carrinho")
    @HttpCode(202)
    async adicionarAoCarrinho(@Body() dadosCarrinho: CarrinhoDto){
        try{
            return this.carrinhoService.adicionarAoCarrinho(dadosCarrinho)
        }catch(error){
            throw new Error("Erro ao adicionar ao carrinho: " + error.message);
        }
    }

}