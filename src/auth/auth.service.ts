/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: any) {
    const { userId, email } = user;
    const payload = { sub: userId, email: email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
