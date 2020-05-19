/**
 * @author: YouJie
 * @date: 2020-05-18 16:33:36
 */

import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto, ChangePasswordDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '获取当前登录用户信息' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async userInfo(@Req() req) {
    return await this.userService.userInfo(req.headers.authorization);
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiBody({ type: RegisterDto })
  async register(@Body(ValidationPipe) registerDto: RegisterDto) {
    return await this.userService.register(registerDto);
  }

  @Post('change-password')
  @ApiOperation({ summary: '修改当前登录用户密码' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async changePassword(
    @Req() req,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ) {
    return await this.userService.changePassword(
      req.headers.authorization,
      changePasswordDto,
    );
  }
}
