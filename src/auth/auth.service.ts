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
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  async signIn(
    params: Prisma.UserCreateInput,
  ): Promise<{ acess_token: string }> {
    const user = await this.userService.user({ email: params.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMacth = await bycrypt.compare(params.password, user.password);
    if (!passwordMacth) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id };

    return { acess_token: await this.jwtService.signAsync(payload) };
  }
}
