import { Controller, Post, Body, ValidationPipe, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.entity';
import { User } from '@/models/user.entity';

@Controller('auth')
@ApiTags('授权')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: User, status: 200 })
  async login(@Body(ValidationPipe) user: LoginDto) {
    return await this.authService.login(user);
  }

  @Post('wechat-login')
  @ApiOperation({ summary: 'todo 微信登录' })
  async wechatLogin(@Body() dto) {
    return await this.authService.wechatLogin(dto);
  }

  @Delete('logout')
  @ApiOperation({ summary: 'todo 注销登录' })
  async logout() {}
}
