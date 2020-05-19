/**
 * @author: YouJie
 * @date: 2020-05-18 16:53:01
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * 注册Dto
 */
export class RegisterDto {
  @ApiProperty({ description: '手机号' })
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsString()
  mobile: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  password: string;

  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  username: string;
}

/**
 * 修改密码
 */
export class ChangePasswordDto {
  @ApiProperty({ description: '原密码' })
  @IsNotEmpty({ message: '原密码不能为空' })
  oldPassword: string;

  @ApiProperty({ description: '新密码' })
  @IsNotEmpty({ message: '新密码不能为空' })
  newPassword: string;

  @ApiProperty({ description: '确认新密码' })
  @IsNotEmpty({ message: '再次输入新密码' })
  checkPassword: string;
}
