import { Equals, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, minLength, MinLength, validate, ValidateIf } from "class-validator";

export class SignInUserDto{
  @IsString({message: "O email deve ser uma string"})
  @IsNotEmpty({message: "O campo email é obrigatório"})
  @IsEmail({}, {message: "Insira um email válido"})
  email: string;
  
  @IsString({message: "A senha deve ser uma string"})
  @IsNotEmpty({message: "O campo password é obrigatório"})
  @MinLength(6, {message: "A senha deve possuir pelo menos 6 caracteres"})
  @MaxLength(20, {message: "A senha deve possuir, no máximo, 20 caracteres"})
  password: string
}

export class SignUpUserDto{
  @IsString({message: "O email deve ser uma string"})
  @IsNotEmpty({message: "O campo email é obrigatório"})
  @IsEmail({}, {message: "Insira um email válido"})
  email: string;

  @IsString({message: "O nome deve ser uma string"})
  @IsNotEmpty({message: "O campo name é obrigatório"})
  name: string
  
  @IsString({message: "A senha deve ser uma string"})
  @IsNotEmpty({message: "Campo password é obrigatório"})
  @MinLength(6, {message: "A senha deve possuir pelo menos 6 caracteres"})
  @MaxLength(20, {message: "A senha deve possuir, no máximo, 20 caracteres"})
  password: string

  @IsNotEmpty({message: "Campo confirmPassword é obrigatório"})
  @MinLength(6, {message: "A confirmação de senha deve possuir pelo menos 6 caracteres"})
  @MaxLength(20, {message: "A confirmação de senha deve possuir, no máximo, 20 caracteres"})
  confirmPassword: string
}

