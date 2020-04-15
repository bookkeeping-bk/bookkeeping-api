import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.entity';

@Controller('auth')
@ApiTags('用户授权')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({ type: LoginDto })
  async login(@Body(ValidationPipe) user: LoginDto) {
    return await this.authService.login(user);
  }

  //TODO: 微信授权登录
  @Post('wechat-login')
  @ApiOperation({ summary: '微信授权登录' })
  wechatLogin(@Body() dto) {
    return dto;
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiBody({ type: RegisterDto })
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.authService.register(user);
  }

  @Get('test-jwt')
  @ApiOperation({ summary: '测试JWT', deprecated: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getUserInfo() {
    return await this.authService.testJwt();
  }
}
