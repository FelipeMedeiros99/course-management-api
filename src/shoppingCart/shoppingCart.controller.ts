import { Body, Get, Controller, Delete, HttpCode, Post, Param, Put, UseGuards, HttpStatus } from "@nestjs/common";
import { ShoppingCartService, UserCartInterface } from "./shoppingCart.service";
import { UserCartDto, ShoppingCartDataDto } from "src/dto/shoppingCart.dto";
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
    await this.shoppingCartService.finalizePurchase(userCart);
    return "Purchase completed"
  }
}