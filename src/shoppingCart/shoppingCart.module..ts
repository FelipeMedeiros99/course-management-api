import { Module } from "@nestjs/common";
import { shoppingCartController } from "./shoppingCart.controller";
import { ShoppingCartService } from "./shoppingCart.service";
import { PrismaService } from "src/config/prisma.service";

@Module({
  controllers: [shoppingCartController],
  providers: [ShoppingCartService, PrismaService]
})

export class ShoppingCartModule { }