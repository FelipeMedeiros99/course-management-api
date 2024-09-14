import { Controller, Get, HttpCode, Post, Body } from "@nestjs/common";
import { CursoService } from "./curso.service";
import { CursoDto } from "src/dto/curso.dto";

@Controller()
export class CursoController{
    constructor(private readonly cursoService: CursoService){ }

    @Get("cursos")
    @HttpCode(200)
    async enviarCursos(){
        try{
            return await this.cursoService.enviarCursos()
        }catch(error){
            throw new Error ("Erro ao buscar cursos: " + error.message)
        }
    }

    @Post("cursos")
    @HttpCode(201)
    async salvarCurso(@Body() dadosCurso: CursoDto){
        try{
            return await this.cursoService.salvarCurso(dadosCurso)
        }catch(error){
            throw new Error("Erro ao salvar curso: " + error.message)
        }
    }
}