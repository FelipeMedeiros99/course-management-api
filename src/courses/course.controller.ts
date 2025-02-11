import { Controller, Get, HttpCode, Post, Body, Put } from "@nestjs/common";
import { CursoService } from "./course.service";
import { CursoDto } from "src/dto/curso.dto";
import { AlterarCursoDto } from "src/dto/alterar-curso.dto";

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

    @Put("cursos")
    @HttpCode(202)
    async alterarCurso(@Body() dadosCurso: AlterarCursoDto){
        try{
            return await this.cursoService.alterarCurso(dadosCurso)
        }catch(error){
            throw new Error("Erro ao alterar curso: " + error.message)
        }
    }


}