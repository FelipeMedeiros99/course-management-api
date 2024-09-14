import { Get, HttpCode, Post, Injectable, Inject } from "@nestjs/common";
import { CarrinhoDto } from "src/dto/carrinho.dto";
import { Pool } from "pg"
import { query } from "express";

@Injectable()
export class CarrinhoService{
    
    constructor(@Inject("PG_CONNECTION") private readonly db:Pool){}

    async adicionarAoCarrinho(dadosCarrinho: CarrinhoDto){
        const db = await this.db.connect()
        const {usuario_id, curso_id} = dadosCarrinho;
        const adicionarAoCarrinhoQuery = `
            INSERT INTO carrinho(usuario_id, curso_id)
            VALUES ($1, $2)
        `
        const valores = [usuario_id, curso_id];

        try{
            await db.query(adicionarAoCarrinhoQuery,valores)
        }catch(error){
            throw new Error("Erro ao adicionar ao carrinho: " + error.message)
        }finally{
            db.release()
        }
    }
        
}