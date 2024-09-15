import { Body, Get, Controller, Delete, HttpCode, Post, Param, Query, Put } from "@nestjs/common";
import { CarrinhoService } from "./carrinho.service";
import { CarrinhoDto } from "src/dto/carrinho.dto";
import { IdCarrinhoDto } from "src/dto/remover-do-carrinho.dto";

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


    @Get("carrinho/:id")
    @HttpCode(202)
    async buscarCarrinhos(@Param('id') id: number){
        console.log(id)
        try{
            return this.carrinhoService.verCarrinho(id)
        }catch(error){
            throw new Error("Erro ao adicionar ao carrinho: " + error.message);
        }
    }


    @Delete("carrinho")
    @HttpCode(202)
    async removerDoCarrinho(@Query() dados: IdCarrinhoDto){
        try{
            return this.carrinhoService.removerDoCarrinho(dados)
        }catch(error){
            throw new Error("Erro ao adicionar ao carrinho: " + error.message);
        }
    }

    @Put("carrinho")
    @HttpCode(214)
    async alterarComoPago(@Query() dados: IdCarrinhoDto){
        try{
            return this.carrinhoService.alterarStatusDeCompra(dados)
        }catch(e){
            throw new Error("Erro ao tentar retornar status de compra: "+ e)
        }
    }

}