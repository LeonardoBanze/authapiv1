import {
  Inject,
  Injectable,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

import * as bycrypt from 'bcrypt';
import { Omit } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;

  async signIn(
    params: Prisma.UserCreateInput,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.user({ email: params.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMacth = await bycrypt.compare(params.password, user.password);
    if (!passwordMacth) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user;

    return result;
  }
}
