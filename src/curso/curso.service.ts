import { Inject, Injectable, Body } from "@nestjs/common";
import { Pool } from "pg";
import { CursoDto } from "src/dto/curso.dto";


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

    async salvarCurso(dadosCurso: CursoDto): Promise<any>{
        const banco = await this.db.connect();
        const {nome, url_foto, preco, preco_com_desconto, carga_horaria, conteudo} = dadosCurso;

        const salvarCursoQuery = `
            INSERT INTO curso(nome, url_foto, preco, preco_com_desconto, carga_horaria, conteudo)
            VALUES 
                ($1, $2,$3,$4,$5,$6)
            RETURNING *
        `

        const valores =  [nome, url_foto, preco, preco_com_desconto, carga_horaria, conteudo]

        try{
            const consulta = await banco.query(salvarCursoQuery, valores)

            const cursos = consulta.rows

            return cursos
        
        }catch(error){
            throw new Error("Erro ao salvar curso: " + error.message)
        }finally{
            banco.release()
        }

        
    }
}