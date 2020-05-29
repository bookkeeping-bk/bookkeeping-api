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
}
