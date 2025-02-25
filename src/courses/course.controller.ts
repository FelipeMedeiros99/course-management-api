import { Controller, Get, HttpCode, Post, Body, Put, UseGuards, Logger, Query, Param } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CourseDataDto, EditCourseDto } from "src/dto/course.dto";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("courses")
export class CourseController{
    private readonly logger = new Logger(CourseController.name);
    constructor(private readonly courseService: CourseService){ };

    @Get()
    async getCourse(){
      return await this.courseService.getCourse()
    }

    @Get(":id")
    async getCouseById(@Param("id") id: string){
      return await this.courseService.getCourseById(+id)
    }

    @HttpCode(201)
    @Post()
    async addCourse(@Body() courseData: CourseDataDto){
        await this.courseService.addCourse(courseData)
        return "Created"
    }

    @HttpCode(202)
    @Put()
    async editCourse(@Body() courseData: EditCourseDto){
      await this.courseService.editCourse(courseData)
      return "Altered"
    }
}