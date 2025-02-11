import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"

import { PrismaService } from 'src/config/prisma.service';
import { SignInUserDto, SignUpUserDto } from 'src/dto/user.dto';


@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async findUser(email: string) {
    const userData = await this.prisma.user.findFirst({
      where: {
        email
      }
    });

    return userData;
  };

  async saveUser(userData: Omit<User, "id">) {
    await this.prisma.user.create({
      data: userData
    })
  }

  async encryptPassword(password: string) {
    // const BC_PASSWORD = process.env.BC_PASSWORD;
    const SALTS = Number(process.env.SALTS_ROUNDS)||10;
    const encryptedPassword = await bcrypt.hash(password, SALTS);
    return encryptedPassword;
  }

  async validEncryptedPassword(password: string, encryptedPassword: string){
    const isCorrectPassword = await bcrypt.compare(password, encryptedPassword);
    return isCorrectPassword;
  }

  async signUpUser(userData: SignUpUserDto) {
    const { email, name, password, confirmPassword } = userData;
    const userAlredyExist = await this.findUser(email);

    if (userAlredyExist) throw new HttpException("Esse email já está cadastrado", 409)
    if (password !== confirmPassword) throw new HttpException("Senhas não coincidem", 400)
    
    const encryptedPassword = await this.encryptPassword(password)

    await this.saveUser({
      email,
      name,
      password: encryptedPassword
    })
  }

  async generateToken(userData: Omit <User, "password">){
    const token = this.jwtService.signAsync(userData)
    return token
  }

  //TODO
  async signinUser(userData: SignInUserDto) {
    const {email, password} = userData
    
    const userDatabase = await this.findUser(userData.email)
    if (!userDatabase) throw new HttpException("Email não cadastrado", 401)

    const isCorrectPassword = await this.validEncryptedPassword(password, userDatabase.password)
    if(!isCorrectPassword) throw new HttpException("Senha incorreta", 401)
    
    const token = await this.generateToken({id: userDatabase.id, email, name: userDatabase.email})
    return token
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
