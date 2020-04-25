/**
 * @author: YouJie
 * @date: 2020-04-25 14:07:48
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({ description: '账本名称' })
  @IsNotEmpty({ message: '账本名称不能为空' })
  @IsString()
  name: string;
}
