import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.entity';
import { User } from '@/models/user.entity';

@Controller('auth')
@ApiTags('用户授权')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: User, status: 200 })
  async login(@Body(ValidationPipe) user: LoginDto) {
    return await this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiBody({ type: RegisterDto })
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.authService.register(user);
  }

  @Post('wechat-login')
  @ApiOperation({ summary: '微信授权登录' })
  async wechatLogin(@Body() dto) {
    return await this.authService.wechatLogin(dto);
  }
}
