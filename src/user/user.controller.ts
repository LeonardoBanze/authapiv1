import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  @Inject()
  private UserService: UserService;

  @Post('signup')
  async sigupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.UserService.createUser(userData);
  }
}
