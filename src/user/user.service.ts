import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from 'src/config/prisma.service';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async signinUser(userData: Omit <User, "id">){
    const doUserExists = await this.prisma.user.findFirst({
      where: {
        name: userData.name
      }
    })
    
    if(!doUserExists){
      throw new HttpException("Usuário não cadastrado", 401)
    }
  }
  // async loginUser(dados: User): Promise<any> {
  //   const client = await this.db.connect();
  //   const verificarSeUsuarioExiste = `
  //       SELECT * 
  //       FROM usuario 
  //       WHERE nome=$1`

  //   const inserirUsuarioNoBanco = `
  //       INSERT INTO usuario (nome) 
  //       VALUES ($1) 
  //       RETURNING *`    

  //   try {

  //     const usuarioExiste= await client.query(verificarSeUsuarioExiste, [dados.nome])
      
  //     if(!usuarioExiste.rows.length){
  //       // salvando usuario
  //       const resposta = await client.query(inserirUsuarioNoBanco, [dados.nome])
  //       return resposta.rows[0]
  //     }
  //     return usuarioExiste.rows[0]
      

  //   } catch (error) {
  //       throw new Error('Erro ao criar usuário: ' + error);

  //   } finally {
  //     client.release();
  //   }
  // }
}
