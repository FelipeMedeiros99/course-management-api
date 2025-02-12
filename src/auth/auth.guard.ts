import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private jwtService: JwtService) { }


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFronHeader(req);
    if(!token) throw new UnauthorizedException("Token inválido");

    try{
      const payload = await this.jwtService.verifyAsync(token)

      req["user"] = payload;
    }catch(e){ 
      console.log(e)
      throw new UnauthorizedException("Token expirado")
    }

    return true
  } 

    private extractTokenFronHeader(req: Request) {
    const [type, token] = req.headers.authorization?.split(" ") ?? []

    return type === "Bearer" ? token : undefined
  }
}



// import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { NextFunction, Request, Response } from "express";

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {

//   constructor(private jwtService: JwtService) { }

//   async use(req: Request, res: Response, next: NextFunction) {
//     const token = this.validToken(req);
//     if (!token) throw new HttpException("Token inválido", 401);

//     try {
//       await this.jwtService.verifyAsync(token, {
//         secret: process.env.JWT_PASSWORD
//       })

//       next()
//     } catch (e) {
//       throw new HttpException("Token expirado, faça login novamente", 401)
//     }

//   }

//   private validToken(req: Request) {
//     const [type, token] = req.headers.authorization?.split(" ") ?? []

//     return type === "Bearer" ? token : undefined
//   }

// }