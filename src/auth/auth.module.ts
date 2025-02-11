import { Module } from "@nestjs/common";
import { UserController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/config/prisma.service";
import { AuthGuard } from "./auth.guard";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [AuthService, PrismaService, AuthGuard],
  exports: []
})

export class AuthModule { }