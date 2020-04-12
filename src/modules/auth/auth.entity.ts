/**
 * @author: YouJie
 * @date: 2020-04-12 20:47:46
 * 登录注册的数据对象，用于 swagger 注释
 */

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '手机号' })
  mobile: string;

  @ApiProperty({ description: '密码' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '手机号' })
  mobile: string;

  @ApiProperty({ description: '密码' })
  password: string;
}
