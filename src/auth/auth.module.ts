import { Module } from "@nestjs/common";
import { UserController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/config/prisma.service";
import { AuthMiddleware } from "./auth.middleware";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [AuthService, PrismaService, AuthMiddleware],
})

export class AuthModule { }