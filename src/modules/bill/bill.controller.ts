/**
 * @author: YouJie
 * @date: 2020-04-30 16:32:29
 */

import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { BillService } from './bill.service';
import { Bill } from '@/models/bill.entity';

@Controller('bills')
@ApiTags('账单')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  @ApiOperation({ summary: '获取账单列表' })
  @ApiQuery({ name: 'currentPage', type: 'number', example: 1 })
  @ApiQuery({ name: 'pageSize', type: 'number', example: 10 })
  @ApiResponse({ type: Bill, status: 200 })
  async findAll(@Query() query: object) {
    return await this.billService.findAll(query);
  }
}
