import { Controller, Get, HttpCode, Post, Body, Put, UseGuards, HttpException, Logger } from "@nestjs/common";
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
      try{
        return await this.courseService.getCourse()
      }catch(e){
        this.logger.error(e)
        throw new HttpException("Error searching for courses", 500)
      }
    }

    @HttpCode(201)
    @Post()
    async addCourse(@Body() courseData: CourseDataDto){
      try{
        await this.courseService.addCourse(courseData)
        return "Created"
      }catch(e){
        this.logger.error(e)
        throw new HttpException("Error trying to create course", 500)
      }
    }

    @HttpCode(202)
    @Put()
    async editCourse(@Body() courseData: EditCourseDto){
      try{
        await this.courseService.editCourse(courseData)
        return "Altered"
      }catch(e){
        this.logger.error(e)
        throw new HttpException("error editing course", 500)
      }
    }
}