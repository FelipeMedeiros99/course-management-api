import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { PrismaService } from "src/config/prisma.service";
import { AuthMiddleware } from "src/auth/auth.guard";

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [PrismaService],
})

export class CourseModule { }