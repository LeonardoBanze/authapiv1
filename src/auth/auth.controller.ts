import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signin')
  signIn(@Body() params: Prisma.UserCreateInput) {
    return this.authService.signIn(params);
  }
}
