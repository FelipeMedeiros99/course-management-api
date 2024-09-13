import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<any[]> {
    return this.userService.findAll();
  }
}
