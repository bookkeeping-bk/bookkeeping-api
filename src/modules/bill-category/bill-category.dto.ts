/**
 * @author: YouJie
 * @date: 2020-04-25 20:55:20
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString, IsNumber } from 'class-validator';

export class BillCategoryDto {
  @ApiProperty({ description: '账单分类名称' })
  @IsEmpty({ message: '账单分类名称不能为空' })
  @IsString()
  name: string;

  // @ApiProperty({ description: '账单分类类型（1:收入 2:支出）' })
  // @IsEmpty({ message: '账单分类类型不能为空' })
  // @IsNumber()
  // type: number;
}
