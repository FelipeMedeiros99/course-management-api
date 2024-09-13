import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";


@Injectable()
export class CursoService{
    constructor(@Inject("PG_CONNECTION") private readonly db:Pool){}
    
    async enviarCursos(): Promise<any>{
        const banco = await this.db.connect();
        const consultaCursos = `
        SELECT * FROM curso
        `;
        
        try{
            const resposta = await banco.query(consultaCursos);
            return resposta.rows
        }catch(erro){
            throw new Error("Erro ao buscar cursos: " + erro.message)

        }finally{
            banco.release()
        }


    }
}