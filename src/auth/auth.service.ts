import { HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from "bcrypt";

import { PrismaService } from 'src/config/prisma.service';
import { SignInUserDto, SignUpUserDto } from 'src/dto/auth.dto';


@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async findUser(email: string): Promise<User> {
    const userData = await this.prisma.user.findFirst({
      where: {
        email: email.toLocaleLowerCase()
      }
    });

    return userData;
  };

  async saveUser(userData: Omit<User, "id">): Promise<void> {
    await this.prisma.user.create({
      data: userData
    })
  }

  async encryptPassword(password: string): Promise<string> {
    const SALTS = Number(process.env.SALTS_ROUNDS) || 10;
    const encryptedPassword = await bcrypt.hash(password, SALTS);
    return encryptedPassword;
  }

  async validEncryptedPassword(password: string, encryptedPassword: string): Promise<Boolean> {
    const isCorrectPassword = await bcrypt.compare(password, encryptedPassword);
    return isCorrectPassword;
  }

  async generateToken(userData: Omit<User, "password">): Promise<string> {
    const token = this.jwtService.signAsync(userData)
    return token
  }

  async signUpUser(userData: SignUpUserDto): Promise<void> {
    try {
      const { email, name, password, confirmPassword } = userData;
      const userAlreadyExist = await this.findUser(email);

      if (userAlreadyExist) throw new HttpException("Email already exists", 409);
      if (password !== confirmPassword) throw new HttpException("Passwords don't match", 400);

      const encryptedPassword = await this.encryptPassword(password);

      await this.saveUser({
        email: email.toLocaleLowerCase(),
        name: name.toLocaleUpperCase(),
        password: encryptedPassword
      });
    } catch (e: any) {
      if (e instanceof HttpException) throw e;

      this.logger.error("signup Error: ", e)
      throw new HttpException("An error occurred while registering the user", 500)
    }
  }

  async signinUser(userData: SignInUserDto): Promise<string> {
    try {
      const { email, password } = userData;

      const userDatabase = await this.findUser(userData.email);
      if (!userDatabase) throw new HttpException("Email not registered", 401);

      const isCorrectPassword = await this.validEncryptedPassword(password, userDatabase.password);
      if (!isCorrectPassword) throw new HttpException("Incorrect password", 401);

      const token = await this.generateToken({ id: userDatabase.id, email, name: userDatabase.email });
      return token;

    } catch (e: any) {
      if (e instanceof HttpException) throw e;
      this.logger.error("Login error: ", e);
      throw new HttpException("An error occurred while logging in", 500);
    }
  }
}