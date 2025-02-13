import { Body, Get, Controller, Delete, HttpCode, Post, Param, Query, Put, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { ShoppingCartService, UserCartInterface } from "./shoppingCart.service";
import { UserCartDto, ShoppingCartDataDto } from "src/dto/shoppingCart.dto";
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
    await this.shoppingCartService.addToCart(shoppingCartDataDto)
    return "Added at cart"
  }

  @HttpCode(200)
  @Get("/:userId")
  async findUserCart(@Param("userId") userId: number): Promise<UserCartInterface[]>{
    console.log(userId)
    return this.shoppingCartService.findUserCart(userId)
  }


  @HttpCode(HttpStatus.OK)
  @Delete()
  async removeCart(@Body() deleteCarData: UserCartDto ){
    await this.shoppingCartService.deleteCart(deleteCarData);
    return "Removed"
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put()
  async finalizePurchase(@Body() userCart: UserCartDto){
    await this.finalizePurchase(userCart);
    return "Purchase completed"
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