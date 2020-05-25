/**
 * @author: YouJie
 * @date: 2020-04-30 16:33:14
 */

import { ApiProperty } from '@nestjs/swagger';

export class BillDto {
  @ApiProperty({ description: '账单分类ID' })
  billCategoryId: number;

  @ApiProperty({ description: '支付来源ID' })
  paymentSourceId: number;

  @ApiProperty({ description: '记录用户ID' })
  userId: number;

  @ApiProperty({ description: '记录时间' })
  recordAt: Date;

  @ApiProperty({ description: '金额' })
  money: number;

  @ApiProperty({ description: '图片' })
  images: string;

  @ApiProperty({ description: '备注' })
  remark: string;
}
