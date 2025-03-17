/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  googleLoginCallback(@Req() request) {
    const jwtTokens = this.authService.login(request.user);
    console.log(`JWT TOKEN: ${jwtTokens.access_token}`);
  }
}
