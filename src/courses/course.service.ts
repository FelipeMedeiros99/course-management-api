import { HttpException, Injectable, Logger } from "@nestjs/common";
import { Course } from "@prisma/client";
import { PrismaService } from "src/config/prisma.service";
import { CourseDataDto, EditCourseDto } from "src/dto/course.dto";

@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);
  constructor(private prisma: PrismaService) { }

  async getCourse(): Promise<Course[]>{
    try{
      const courses = await this.prisma.course.findMany();
      return courses;
    }catch(e: any){
      this.logger.error("Failed to get courses: ", e);
      throw new HttpException("An error occurred while retrieving the courses", 500)
    }
  }

  async addCourse(courseData: CourseDataDto): Promise<void>{
    try{
      await this.prisma.course.create({
        data: courseData
      })
    }catch(e: any){
      this.logger.error("Failed to create new course: ", e)
      throw new HttpException("An error occurred while creating the course", 500);
    }
  }

  async editCourse(courseData: EditCourseDto): Promise<void>{
    try{

      const {id, ...data} = courseData;
      await this.prisma.course.update({
        where: {
          id
        },
        data
      })
    }catch(e: any){
      this.logger.error("Failed to edit course: ", e)
      throw new HttpException("An error occurred while updating the course", 500)
    }
  }
}