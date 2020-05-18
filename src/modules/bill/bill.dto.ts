/**
 * @author: YouJie
 * @date: 2020-04-30 16:33:14
 */

import { ApiProperty } from '@nestjs/swagger';

export class BillDto {
  @ApiProperty({ description: '账单分类ID' })
  billCategoryId: number;

  @ApiProperty()
  paymentSourceId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  money: number;

  @ApiProperty()
  images: string;

  @ApiProperty()
  remark: string;
}
