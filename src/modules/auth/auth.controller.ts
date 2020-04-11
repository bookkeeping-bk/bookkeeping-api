import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { User } from '@/models/user.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() dto) {
    return dto;
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() user: User) {
    this.authService.register(user);
    return { msg: 'ok', data: user };
  }
}
