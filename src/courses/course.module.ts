import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { PrismaService } from "src/config/prisma.service";
import { AuthMiddleware } from "src/auth/auth.middleware";

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [PrismaService],
})

export class CourseModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('course')
  }
 }