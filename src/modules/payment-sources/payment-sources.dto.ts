/**
 * @author: YouJie
 * @date: 2020-04-29 16:00:46
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentSourcesDto {
  @ApiProperty({ description: '账户名称' })
  @IsNotEmpty({ message: '账户名称不能为空' })
  @IsString()
  name: string;

  @ApiProperty({ description: '备注' })
  remark: string;
}
