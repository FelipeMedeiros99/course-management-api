import { IsString, MinLength } from "class-validator";

export class LoginUserDto{
  @IsString()
  @MinLength(3, {message: "O nome precisa ter pelo menos 3 caracteres"})
  name: string;
  password: string
}