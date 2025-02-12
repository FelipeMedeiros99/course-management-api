import { Module } from "@nestjs/common";
import { UserController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/config/prisma.service";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [AuthService, PrismaService],
})

export class AuthModule { }