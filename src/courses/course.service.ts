import { Inject, Injectable, Body } from "@nestjs/common";
import { Pool } from "pg";
import { CursoDto } from "src/dto/curso.dto";
import { AlterarCursoDto } from "src/dto/alterar-curso.dto";

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


    };

    async salvarCurso(dadosCurso: CursoDto): Promise<any>{
        const banco = await this.db.connect();
        const {nome, url_foto, preco, preco_com_desconto, carga_horaria, conteudo} = dadosCurso;

        const salvarCursoQuery = `
            INSERT 
            INTO curso
                (nome, url_foto, preco, preco_com_desconto, carga_horaria, conteudo)
            VALUES 
                ($1, $2,$3,$4,$5,$6)
            `;

        const buscarCursosQuery = `
            SELECT * FROM curso
        `;

        const valores =  [nome, url_foto, preco, preco_com_desconto, carga_horaria, conteudo];

        try{
            await banco.query(salvarCursoQuery, valores);
            
            const consultarCursos = await banco.query(buscarCursosQuery);
            const cursos = consultarCursos.rows;

            return cursos;
        
        }catch(error){
            throw new Error("Erro ao salvar curso: " + error.message)
        }finally{
            banco.release();
        };

        
    };

    async alterarCurso(dadosCurso: AlterarCursoDto): Promise<any>{
        const db = await this.db.connect();
        const {nome, url_foto, preco, preco_com_desconto, carga_horaria, conteudo, id} = dadosCurso;
        
        const alteracaoCursoQuery = `
            UPDATE curso
            SET 
                nome=$1,
                url_foto=$2,
                preco=$3,
                preco_com_desconto=$4,
                carga_horaria=$5,
                conteudo=$6
            WHERE id=$7
        `;

        const consultaCursosQuery = `SELECT * FROM curso`
        const valores =  [nome, url_foto, preco, preco_com_desconto, carga_horaria, conteudo, id];

        try{
            await db.query(alteracaoCursoQuery, valores);
            const consultaCurso = await db.query(consultaCursosQuery);

            return consultaCurso.rows;

        }catch(error){
            throw new Error("Erro ao alterar curso: " + error.message);
        }finally{
            db.release();
        }
    };

    
}