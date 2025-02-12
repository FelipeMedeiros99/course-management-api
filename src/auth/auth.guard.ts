import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFronHeader(req);
    if(!token) throw new UnauthorizedException("Invalid token format");

    try{
      const payload = await this.jwtService.verifyAsync(token)

      req["user"] = payload;
    }catch(e){ 
      console.log(e)
      throw new UnauthorizedException("Expired token")
    }

    return true
  } 

    private extractTokenFronHeader(req: Request) {
    const [type, token] = req.headers.authorization?.split(" ") ?? []

    return type === "Bearer" ? token : undefined
  }
}