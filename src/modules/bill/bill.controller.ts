/**
 * @author: YouJie
 * @date: 2020-04-30 16:32:29
 */

import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { BillService } from './bill.service';
import { Bill } from '@/models/bill.entity';
import { BillDto } from './bill.dto';

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

  @Get(':id')
  @ApiOperation({ summary: '获取账单详情' })
  @ApiResponse({ type: Bill, status: 200 })
  async findById(@Param('id') id: number) {
    return await this.billService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建账单' })
  @ApiResponse({ type: Bill, status: 200 })
  async create(@Body() billDto: BillDto) {
    return await this.billService.create(billDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新账单' })
  @ApiResponse({ type: Bill, status: 200 })
  async updateById(@Param('id') id: number, @Body() billDto: BillDto) {
    return await this.billService.updateById(id, billDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除账单' })
  async deleteById(@Param('id') id: number) {
    return await this.billService.deleteById(id);
  }
}
