/**
 * @author: YouJie
 * @date: 2020-04-12 20:47:46
 * 登录注册的数据对象，用于 swagger 注释
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '@/models/user.entity';

export class LoginDto {
  @ApiProperty({ description: '手机号' })
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsString()
  mobile: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  password: string;
}

export class RegisterDto extends User {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  username: string;

  @ApiProperty({ description: '手机号' })
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsString()
  mobile: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  password: string;
}
