import { Body, Get, Controller, Delete, HttpCode, Post, Param, Query, Put, UseGuards, HttpException } from "@nestjs/common";
import { ShoppingCartService } from "./shoppingCart.service";
import { ShoppingCartDataDto } from "src/dto/shoppingCart.dto";
import { IdCarrinhoDto } from "src/dto/remover-do-carrinho.dto";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("cart")
export class shoppingCartController {
  constructor(
    private readonly shoppingCartService: ShoppingCartService
  ) { };

  @HttpCode(202)
  @Post()
  async addToCart(@Body() shoppingCartDataDto: ShoppingCartDataDto) {
    try{
      await this.shoppingCartService.addToCart(shoppingCartDataDto)
    }catch(e){
      throw new HttpException("Error when trying to add course to cart", 500)
    }
  }


  // @Post("carrinho")
  // @HttpCode(202)
  // async adicionarAoCarrinho(@Body() dadosCarrinho: CarrinhoDto){
  //     try{
  //         return this.carrinhoService.adicionarAoCarrinho(dadosCarrinho)
  //     }catch(error){
  //         throw new Error("Erro ao adicionar ao carrinho: " + error.message);
  //     }
  // }


  // @Get("carrinho/:id")
  // @HttpCode(202)
  // async buscarCarrinhos(@Param('id') id: number){
  //     console.log(id)
  //     try{
  //         return this.carrinhoService.verCarrinho(id)
  //     }catch(error){
  //         throw new Error("Erro ao adicionar ao carrinho: " + error.message);
  //     }
  // }


  // @Delete("carrinho")
  // @HttpCode(202)
  // async removerDoCarrinho(@Query() dados: IdCarrinhoDto){
  //     try{
  //         return this.carrinhoService.removerDoCarrinho(dados)
  //     }catch(error){
  //         throw new Error("Erro ao adicionar ao carrinho: " + error.message);
  //     }
  // }

  // @Put("carrinho")
  // @HttpCode(214)
  // async alterarComoPago(@Query() dados: IdCarrinhoDto){
  //     try{
  //         return this.carrinhoService.alterarStatusDeCompra(dados)
  //     }catch(e){
  //         throw new Error("Erro ao tentar retornar status de compra: "+ e)
  //     }
  // }

}