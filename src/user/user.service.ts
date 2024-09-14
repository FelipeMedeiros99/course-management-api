import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { SalvarUsuarioDto } from 'src/dto/salvar-usuario.dto';


@Injectable()
export class UserService {
  constructor(@Inject('PG_CONNECTION') private readonly db: Pool) {}

  async loginUser(dados: SalvarUsuarioDto): Promise<any> {
    const client = await this.db.connect();
    const verificarSeUsuarioExiste = `
        SELECT * 
        FROM usuario 
        WHERE nome=$1`

    const inserirUsuarioNoBanco = `
        INSERT INTO usuario (nome) 
        VALUES ($1) 
        RETURNING *`    

    try {

      const usuarioExiste= await client.query(verificarSeUsuarioExiste, [dados.nome])
      
      if(!usuarioExiste.rows.length){
        // salvando usuario
        const resposta = await client.query(inserirUsuarioNoBanco, [dados.nome])
        return resposta.rows[0]
      }
      return usuarioExiste.rows[0]
      

    } catch (error) {
        throw new Error('Erro ao criar usuário: ' + error);

    } finally {
      client.release();
    }
  }
}
