import { Module } from "@nestjs/common";
import { UserController } from "./auth.controller";
import { UserService } from "./auth.service";
import { PrismaService } from "src/config/prisma.service";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService]
})

export class UserModule { }