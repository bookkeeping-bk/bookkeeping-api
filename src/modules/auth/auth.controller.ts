import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.entity';

@Controller('auth')
@ApiTags('用户授权')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({ type: LoginDto })
  async login(@Body() dto) {
    return dto;
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiBody({ type: RegisterDto })
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return this.authService.register(user);
  }
}
