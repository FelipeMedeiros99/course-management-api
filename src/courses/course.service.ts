import { Inject, Injectable, Body } from "@nestjs/common";
import { Course } from "@prisma/client";
import { PrismaService } from "src/config/prisma.service";
import { CourseDataDto, EditCourseDto } from "src/dto/course.dto";
// import { Pool } from "pg";
// import { CursoDto } from "src/dto/curso.dto";
// import { AlterarCursoDto } from "src/dto/alterar-curso.dto";

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) { }

  async getCourse(): Promise<Course[]>{
    const courses = await this.prisma.course.findMany();
    return courses;
  }

  async addCourse(courseData: CourseDataDto){
    await this.prisma.course.create({
      data: courseData
    })
  }

  async editCourse(courseData: EditCourseDto){
    const {id, ...data} = courseData;
    await this.prisma.course.update({
      where: {
        id
      },
      data
    })
  }
}