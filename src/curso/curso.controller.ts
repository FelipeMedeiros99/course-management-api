import { Controller, Get, HttpCode } from "@nestjs/common";
import { CursoService } from "./curso.service";

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
}