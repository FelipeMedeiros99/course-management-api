import { Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { PrismaService } from "src/config/prisma.service";
import { CourseService } from "./course.service";

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [PrismaService, CourseService],
})

export class CourseModule { }